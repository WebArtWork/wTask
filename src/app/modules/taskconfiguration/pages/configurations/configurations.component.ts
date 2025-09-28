import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { FormService } from 'src/app/core/modules/form/form.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { TableModule } from 'src/app/core/modules/table/table.module';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { AlertService, CoreService } from 'wacom';
import { taskconfigurationFormComponents } from '../../formcomponents/taskconfiguration.formcomponents';
import { Taskconfiguration as Task } from '../../interfaces/taskconfiguration.interface';
import { TaskconfigurationService } from '../../services/taskconfiguration.service';

@Component({
	templateUrl: './configurations.component.html',
	styleUrls: ['./configurations.component.scss'],
	imports: [TableModule]
})
export class ConfigurationsComponent {
	columns = ['owner', 'repo', 'token'];

	form: FormInterface = this._form.getForm(
		'task',
		taskconfigurationFormComponents
	);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._configurationService.setPerPage.bind(
			this._configurationService
		),
		allDocs: false,
		create: this._router.url.includes('configurations/')
			? (): void => {
					this._form.modal<Task>(this.form, {
						label: 'Create',
						click: async (
							created: unknown,
							close: () => void
						): Promise<void> => {
							close();

							this._preCreate(created as Task);

							await firstValueFrom(
								this._configurationService.create(
									created as Task
								)
							);

							this.setRows();
						}
					});
			  }
			: null,
		update: (doc: Task): void => {
			this._form.modal<Task>(this.form, [], doc).then((updated: Task) => {
				this._core.copy(updated, doc);

				this._configurationService.update(doc);
			});
		},
		delete: (doc: Task): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this task?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(
								this._configurationService.delete(doc)
							);

							this.setRows();
						}
					}
				]
			});
		},
		buttons: [
			{
				icon: 'task_alt',
				hrefFunc: (doc: Task): string => {
					return '/task/' + doc._id;
				}
			},
			{
				icon: 'cloud_download',
				click: (doc: Task): void => {
					this._form.modalUnique<Task>('task', 'url', doc);
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

	rows: Task[] = [];

	project_id = '';

	constructor(
		private _translate: TranslateService,
		private _configurationService: TaskconfigurationService,
		private _route: ActivatedRoute,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService,
		private _router: Router
	) {
		this._route.paramMap.subscribe((params) => {
			this.project_id = params.get('project_id') || '';

			this.setRows();
		});
	}

	setRows(page = this._page): void {
		this._page = page;

		this._core.afterWhile(
			this,
			() => {
				this._configurationService
					.get({ page, query: this._query() })
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
				.modalDocs<Task>(create ? [] : this.rows)
				.then(async (tasks: Task[]) => {
					if (create) {
						for (const task of tasks) {
							this._preCreate(task);

							await firstValueFrom(
								this._configurationService.create(task)
							);
						}
					} else {
						for (const task of this.rows) {
							if (
								!tasks.find(
									(localTask) => localTask._id === task._id
								)
							) {
								await firstValueFrom(
									this._configurationService.delete(task)
								);
							}
						}

						for (const task of tasks) {
							const localTask = this.rows.find(
								(localTask) => localTask._id === task._id
							);

							if (localTask) {
								this._core.copy(task, localTask);

								await firstValueFrom(
									this._configurationService.update(localTask)
								);
							} else {
								this._preCreate(task);

								await firstValueFrom(
									this._configurationService.create(task)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(task: Task): void {
		task.__created = false;

		task.project = this.project_id;
	}

	private _query(): string {
		let query = '';

		if (this.project_id) {
			query += (query ? '&' : '') + 'project=' + this.project_id;
		}

		return query;
	}
}
