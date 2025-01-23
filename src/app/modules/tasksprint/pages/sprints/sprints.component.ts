import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { TasksprintService } from '../../services/tasksprint.service';
import { Tasksprint } from '../../interfaces/tasksprint.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { tasksprintFormComponents } from '../../formcomponents/tasksprint.formcomponents';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
	templateUrl: './sprints.component.html',
	styleUrls: ['./sprints.component.scss'],
	standalone: false
})
export class SprintsComponent {
	project_id = this._router.url.includes('sprints/')
		? this._router.url.replace('/sprints/', '')
		: '';

	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm(
		'tasksprint',
		tasksprintFormComponents
	);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._tasksprintService.setPerPage.bind(
			this._tasksprintService
		),
		allDocs: false,
		create: (): void => {
			this._form.modal<Tasksprint>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Tasksprint);

					await firstValueFrom(
						this._tasksprintService.create(created as Tasksprint)
					);

					this.setRows();
				}
			});
		},
		update: (doc: Tasksprint): void => {
			this._form
				.modal<Tasksprint>(this.form, [], doc)
				.then((updated: Tasksprint) => {
					this._core.copy(updated, doc);

					this._tasksprintService.update(doc);
				});
		},
		delete: (doc: Tasksprint): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this tasksprint?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(
								this._tasksprintService.delete(doc)
							);

							this.setRows();
						}
					}
				]
			});
		},
		buttons: [
			{
				icon: 'task',
				hrefFunc: (doc: Tasksprint): string => {
					return '/tasks/' + doc.project + '/sprint/' + doc._id;
				}
			},
			{
				icon: 'cloud_download',
				click: (doc: Tasksprint): void => {
					this._form.modalUnique<Tasksprint>(
						'tasksprint',
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

	rows: Tasksprint[] = [];

	constructor(
		private _translate: TranslateService,
		private _tasksprintService: TasksprintService,
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
				this._tasksprintService
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
				.modalDocs<Tasksprint>(create ? [] : this.rows)
				.then(async (tasksprints: Tasksprint[]) => {
					if (create) {
						for (const tasksprint of tasksprints) {
							this._preCreate(tasksprint);

							await firstValueFrom(
								this._tasksprintService.create(tasksprint)
							);
						}
					} else {
						for (const tasksprint of this.rows) {
							if (
								!tasksprints.find(
									(localTasksprint) =>
										localTasksprint._id === tasksprint._id
								)
							) {
								await firstValueFrom(
									this._tasksprintService.delete(tasksprint)
								);
							}
						}

						for (const tasksprint of tasksprints) {
							const localTasksprint = this.rows.find(
								(localTasksprint) =>
									localTasksprint._id === tasksprint._id
							);

							if (localTasksprint) {
								this._core.copy(tasksprint, localTasksprint);

								await firstValueFrom(
									this._tasksprintService.update(
										localTasksprint
									)
								);
							} else {
								this._preCreate(tasksprint);

								await firstValueFrom(
									this._tasksprintService.create(tasksprint)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(tasksprint: Tasksprint): void {
		tasksprint.__created;

		if (this.project_id) {
			tasksprint.project = this.project_id;
		}
	}
}
