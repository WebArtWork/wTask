import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../../../modules/task/interfaces/task.interface';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { taskFormComponents } from 'src/app/modules/task/formcomponents/task.formcomponents';
import { TaskService } from 'src/app/modules/task/services/task.service';
import { AlertService, CoreService } from 'wacom';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';

@Component({
	selector: 'app-task',
	standalone: false,

	templateUrl: './task.component.html',
	styleUrl: './task.component.scss'
})
export class TaskComponent {
	@Input() task: Task;
	form: FormInterface = this._form.getForm('task', taskFormComponents);

	@Output() load = new EventEmitter();

	constructor(
		private _taskService: TaskService,
		private _form: FormService,
		private _core: CoreService,
		private _alert: AlertService,
		private _translate: TranslateService
	) {}

	update(): void {
		this._form
			.modal<Task>(this.form, [], this.task)
			.then((updated: Task) => {
				this._core.copy(updated, this.task);

				this._taskService.update(this.task);
			});
	}

	delete(): void {
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
						this._taskService.delete(this.task).subscribe(() => {
							this.load.emit();
						});
					}
				}
			]
		});
	}
}
