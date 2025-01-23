import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { TaskmoduleService } from '../../services/taskmodule.service';
import { Taskmodule } from '../../interfaces/taskmodule.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { taskmoduleFormComponents } from '../../formcomponents/taskmodule.formcomponents';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
	templateUrl: './modules.component.html',
	styleUrls: ['./modules.component.scss'],
	standalone: false
})
export class ModulesComponent {
	project_id = this._router.url.includes('modules/')
		? this._router.url.replace('/modules/', '')
		: '';

	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm(
		'taskmodule',
		taskmoduleFormComponents
	);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._taskmoduleService.setPerPage.bind(
			this._taskmoduleService
		),
		allDocs: false,
		create: (): void => {
			this._form.modal<Taskmodule>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Taskmodule);

					await firstValueFrom(
						this._taskmoduleService.create(created as Taskmodule)
					);

					this.setRows();
				}
			});
		},
		update: (doc: Taskmodule): void => {
			this._form
				.modal<Taskmodule>(this.form, [], doc)
				.then((updated: Taskmodule) => {
					this._core.copy(updated, doc);

					this._taskmoduleService.update(doc);
				});
		},
		delete: (doc: Taskmodule): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this taskmodule?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(
								this._taskmoduleService.delete(doc)
							);

							this.setRows();
						}
					}
				]
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Taskmodule): void => {
					this._form.modalUnique<Taskmodule>(
						'taskmodule',
						'url',
						doc
					);
				}
			}
		],
		headerButtons: [
			{
				icon: 'playlist_add',
				click: this._bulkManagement(),
				class: 'playlist'
			},
			{
				icon: 'edit_note',
				click: this._bulkManagement(false),
				class: 'edit'
			}
		]
	};

	rows: Taskmodule[] = [];

	constructor(
		private _translate: TranslateService,
		private _taskmoduleService: TaskmoduleService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService,
		private _router: Router
	) {
		this.setRows();
	}

	setRows(page = this._page): void {
		this._page = page;

		this._core.afterWhile(
			this,
			() => {
				this._taskmoduleService
					.get({
						page,
						query: this.project_id
							? 'project=' + this.project_id
							: ''
					})
					.subscribe((rows) => {
						this.rows.splice(0, this.rows.length);

						this.rows.push(...rows);
					});
			},
			250
		);
	}

	private _page = 1;

	private _bulkManagement(create = true): () => void {
		return (): void => {
			this._form
				.modalDocs<Taskmodule>(create ? [] : this.rows)
				.then(async (taskmodules: Taskmodule[]) => {
					if (create) {
						for (const taskmodule of taskmodules) {
							this._preCreate(taskmodule);

							await firstValueFrom(
								this._taskmoduleService.create(taskmodule)
							);
						}
					} else {
						for (const taskmodule of this.rows) {
							if (
								!taskmodules.find(
									(localTaskmodule) =>
										localTaskmodule._id === taskmodule._id
								)
							) {
								await firstValueFrom(
									this._taskmoduleService.delete(taskmodule)
								);
							}
						}

						for (const taskmodule of taskmodules) {
							const localTaskmodule = this.rows.find(
								(localTaskmodule) =>
									localTaskmodule._id === taskmodule._id
							);

							if (localTaskmodule) {
								this._core.copy(taskmodule, localTaskmodule);

								await firstValueFrom(
									this._taskmoduleService.update(
										localTaskmodule
									)
								);
							} else {
								this._preCreate(taskmodule);

								await firstValueFrom(
									this._taskmoduleService.create(taskmodule)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(taskmodule: Taskmodule): void {
		taskmodule.__created;

		if (this.project_id) {
			taskmodule.project = this.project_id;
		}
	}
}
