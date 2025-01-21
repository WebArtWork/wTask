import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { TaskpageService } from '../../services/taskpage.service';
import { Taskpage } from '../../interfaces/taskpage.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { taskpageFormComponents } from '../../formcomponents/taskpage.formcomponents';
import { firstValueFrom } from 'rxjs';

@Component({
	templateUrl: './pages.component.html',
	styleUrls: ['./pages.component.scss'],
	standalone: false
})
export class PagesComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('taskpage', taskpageFormComponents);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._taskpageService.setPerPage.bind(this._taskpageService),
		allDocs: false,
		create: (): void => {
			this._form.modal<Taskpage>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Taskpage);

					await firstValueFrom(
						this._taskpageService.create(created as Taskpage)
					);

					this.setRows();
				}
			});
		},
		update: (doc: Taskpage): void => {
			this._form.modal<Taskpage>(this.form, [], doc).then((updated: Taskpage) => {
				this._core.copy(updated, doc);

				this._taskpageService.update(doc);
			});
		},
		delete: (doc: Taskpage): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this taskpage?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(this._taskpageService.delete(doc));

							this.setRows();
						}
					}
				]
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Taskpage): void => {
					this._form.modalUnique<Taskpage>('taskpage', 'url', doc);
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

	rows: Taskpage[] = [];

	constructor(
		private _translate: TranslateService,
		private _taskpageService: TaskpageService,
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
				this._taskpageService.get({ page }).subscribe((rows) => {
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
				.modalDocs<Taskpage>(create ? [] : this.rows)
				.then(async (taskpages: Taskpage[]) => {
					if (create) {
						for (const taskpage of taskpages) {
							this._preCreate(taskpage);

							await firstValueFrom(
								this._taskpageService.create(taskpage)
							);
						}
					} else {
						for (const taskpage of this.rows) {
							if (!taskpages.find(
								localTaskpage => localTaskpage._id === taskpage._id
							)) {
								await firstValueFrom(
									this._taskpageService.delete(taskpage)
								);
							}
						}

						for (const taskpage of taskpages) {
							const localTaskpage = this.rows.find(
								localTaskpage => localTaskpage._id === taskpage._id
							);

							if (localTaskpage) {
								this._core.copy(taskpage, localTaskpage);

								await firstValueFrom(
									this._taskpageService.update(localTaskpage)
								);
							} else {
								this._preCreate(taskpage);

								await firstValueFrom(
									this._taskpageService.create(taskpage)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(taskpage: Taskpage): void {
		taskpage.__created;
	}
}
