import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { TaskService } from '../../services/task.service';
import { Task } from '../../interfaces/task.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { taskFormComponents } from '../../formcomponents/task.formcomponents';
import { firstValueFrom } from 'rxjs';

@Component({
	templateUrl: './tasks.component.html',
	styleUrls: ['./tasks.component.scss'],
	standalone: false
})
export class TasksComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('task', taskFormComponents);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._taskService.setPerPage.bind(this._taskService),
		allDocs: false,
		create: (): void => {
			this._form.modal<Task>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Task);

					await firstValueFrom(
						this._taskService.create(created as Task)
					);

					this.setRows();
				}
			});
		},
		update: (doc: Task): void => {
			this._form.modal<Task>(this.form, [], doc).then((updated: Task) => {
				this._core.copy(updated, doc);

				this._taskService.update(doc);
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
							await firstValueFrom(this._taskService.delete(doc));

							this.setRows();
						}
					}
				]
			});
		},
		buttons: [
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
				class: 'playlist',
			},
			{
				icon: 'edit_note',
				click: this._bulkManagement(false),
				class: 'edit',
			},
		]
	};

	rows: Task[] = [];

	constructor(
		private _translate: TranslateService,
		private _taskService: TaskService,
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
				this._taskService.get({ page }).subscribe((rows) => {
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
								this._taskService.create(task)
							);
						}
					} else {
						for (const task of this.rows) {
							if (!tasks.find(
								localTask => localTask._id === task._id
							)) {
								await firstValueFrom(
									this._taskService.delete(task)
								);
							}
						}

						for (const task of tasks) {
							const localTask = this.rows.find(
								localTask => localTask._id === task._id
							);

							if (localTask) {
								this._core.copy(task, localTask);

								await firstValueFrom(
									this._taskService.update(localTask)
								);
							} else {
								this._preCreate(task);

								await firstValueFrom(
									this._taskService.create(task)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(task: Task): void {
		task.__created;
	}
}
