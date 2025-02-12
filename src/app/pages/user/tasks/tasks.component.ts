import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from 'src/app/modules/task/services/task.service';
import { Task } from '../../../modules/task/interfaces/task.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { taskFormComponents } from 'src/app/modules/task/formcomponents/task.formcomponents';

@Component({
	templateUrl: './tasks.component.html',
	styleUrls: ['./tasks.component.scss'],
	standalone: false
})
export class TasksComponent {
	tasks: Task[] = [];

	project_id = '';

	isMenuOpen = true;
	form: FormInterface = this._form.getForm('task', taskFormComponents);

	constructor(
		private _taskService: TaskService,
		private _route: ActivatedRoute,
		private _form: FormService
	) {
		this._route.paramMap.subscribe((params) => {
			this.project_id = params.get('project_id') || '';

			this.load();
		});
	}

	create(): void {
		this._form.modal<Task>(this.form, {
			label: 'Create',
			click: async (
				created: unknown,
				close: () => void
			): Promise<void> => {
				close();

				this._preCreate(created as Task);

				this._taskService.create(created as Task).subscribe(() => {
					this.load();
				});
			}
		});
	}

	load(): void {
		this._taskService
			.get({ page: 1, query: this._query() })
			.subscribe((tasks) => {
				this.tasks.splice(0, this.tasks.length);

				this.tasks.push(...tasks);
			});
	}

	private _query(): string {
		let query = '';

		if (this.project_id) {
			query += (query ? '&' : '') + 'project=' + this.project_id;
		}

		// if (this.release_id) {
		// 	query += (query ? '&' : '') + 'release=' + this.release_id;
		// }

		// if (this.sprint_id) {
		// 	query += (query ? '&' : '') + 'sprint=' + this.sprint_id;
		// }

		// if (this.tag_id) {
		// 	query += (query ? '&' : '') + 'tag=' + this.tag_id;
		// }

		return query;
	}

	private _preCreate(task: Task): void {
		task.__created = false;

		if (this.project_id) {
			task.project = this.project_id;
		}

		// if (this.release_id) {
		// 	task.release = this.release_id;
		// }

		// if (this.sprint_id) {
		// 	task.sprint = this.sprint_id;
		// }

		// if (this.tag_id) {
		// 	task.tag = this.tag_id;
		// }
	}
}
