import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { TaskstoryService } from '../../services/taskstory.service';
import { Taskstory } from '../../interfaces/taskstory.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { taskstoryFormComponents } from '../../formcomponents/taskstory.formcomponents';
import { firstValueFrom } from 'rxjs';

@Component({
	templateUrl: './stories.component.html',
	styleUrls: ['./stories.component.scss'],
	standalone: false
})
export class StoriesComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('taskstory', taskstoryFormComponents);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._taskstoryService.setPerPage.bind(this._taskstoryService),
		allDocs: false,
		create: (): void => {
			this._form.modal<Taskstory>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Taskstory);

					await firstValueFrom(
						this._taskstoryService.create(created as Taskstory)
					);

					this.setRows();
				}
			});
		},
		update: (doc: Taskstory): void => {
			this._form.modal<Taskstory>(this.form, [], doc).then((updated: Taskstory) => {
				this._core.copy(updated, doc);

				this._taskstoryService.update(doc);
			});
		},
		delete: (doc: Taskstory): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this taskstory?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(this._taskstoryService.delete(doc));

							this.setRows();
						}
					}
				]
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Taskstory): void => {
					this._form.modalUnique<Taskstory>('taskstory', 'url', doc);
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

	rows: Taskstory[] = [];

	constructor(
		private _translate: TranslateService,
		private _taskstoryService: TaskstoryService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService
	) {
		this.setRows();
	}

	setRows(page = this._page): void {
		this._page = page;

		this._core.afterWhile(
			this,
			() => {
				this._taskstoryService.get({ page }).subscribe((rows) => {
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
				.modalDocs<Taskstory>(create ? [] : this.rows)
				.then(async (taskstorys: Taskstory[]) => {
					if (create) {
						for (const taskstory of taskstorys) {
							this._preCreate(taskstory);

							await firstValueFrom(
								this._taskstoryService.create(taskstory)
							);
						}
					} else {
						for (const taskstory of this.rows) {
							if (!taskstorys.find(
								localTaskstory => localTaskstory._id === taskstory._id
							)) {
								await firstValueFrom(
									this._taskstoryService.delete(taskstory)
								);
							}
						}

						for (const taskstory of taskstorys) {
							const localTaskstory = this.rows.find(
								localTaskstory => localTaskstory._id === taskstory._id
							);

							if (localTaskstory) {
								this._core.copy(taskstory, localTaskstory);

								await firstValueFrom(
									this._taskstoryService.update(localTaskstory)
								);
							} else {
								this._preCreate(taskstory);

								await firstValueFrom(
									this._taskstoryService.create(taskstory)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(taskstory: Taskstory): void {
		taskstory.__created;
	}
}
