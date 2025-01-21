import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { TaskprojectService } from '../../services/taskproject.service';
import { Taskproject } from '../../interfaces/taskproject.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { taskprojectFormComponents } from '../../formcomponents/taskproject.formcomponents';

@Component({
	templateUrl: './projects.component.html',
	styleUrls: ['./projects.component.scss'],
	standalone: false
})
export class ProjectsComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('taskproject', taskprojectFormComponents);

	config = {
		create: (): void => {
			this._form.modal<Taskproject>(this.form, {
				label: 'Create',
				click: (created: unknown, close: () => void) => {
					this._preCreate(created as Taskproject);

					this._taskprojectService.create(created as Taskproject);

					close();
				}
			});
		},
		update: (doc: Taskproject): void => {
			this._form.modal<Taskproject>(this.form, [], doc).then((updated: Taskproject) => {
				this._core.copy(updated, doc);

				this._taskprojectService.update(doc);
			});
		},
		delete: (doc: Taskproject): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this taskproject?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: (): void => {
							this._taskprojectService.delete(doc);
						}
					}
				]
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Taskproject): void => {
					this._form.modalUnique<Taskproject>('taskproject', 'url', doc);
				}
			}
		],
		headerButtons: [
			{
				icon: 'playlist_add',
				click: this._bulkManagement(),
				class: 'playlist',
			},
			{
				icon: 'edit_note',
				click: this._bulkManagement(false),
				class: 'edit',
			},
		]
	};

	get rows(): Taskproject[] {
		return this._taskprojectService.taskprojects;
	}

	constructor(
		private _translate: TranslateService,
		private _taskprojectService: TaskprojectService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService
	) {}

	private _bulkManagement(create = true): () => void {
		return (): void => {
			this._form
				.modalDocs<Taskproject>(create ? [] : this.rows)
				.then((taskprojects: Taskproject[]) => {
					if (create) {
						for (const taskproject of taskprojects) {
							this._preCreate(taskproject);

							this._taskprojectService.create(taskproject);
						}
					} else {
						for (const taskproject of this.rows) {
							if (!taskprojects.find(
								localTaskproject => localTaskproject._id === taskproject._id
							)) {
								this._taskprojectService.delete(taskproject);
							}
						}

						for (const taskproject of taskprojects) {
							const localTaskproject = this.rows.find(
								localTaskproject => localTaskproject._id === taskproject._id
							);

							if (localTaskproject) {
								this._core.copy(taskproject, localTaskproject);

								this._taskprojectService.update(localTaskproject);
							} else {
								this._preCreate(taskproject);

								this._taskprojectService.create(taskproject);
							}
						}
					}
				});
		};
	}

	private _preCreate(taskproject: Taskproject): void {
		taskproject.__created;
	}
}
