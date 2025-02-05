import { Component } from '@angular/core';
import { FormService } from 'src/app/core/modules/form/form.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { taskprojectFormComponents } from 'src/app/modules/taskproject/formcomponents/taskproject.formcomponents';
import { Taskproject } from 'src/app/modules/taskproject/interfaces/taskproject.interface';
import { TaskprojectService } from 'src/app/modules/taskproject/services/taskproject.service';

@Component({
	templateUrl: './projects.component.html',
	styleUrls: ['./projects.component.scss'],
	standalone: false
})
export class ProjectsComponent {
	isMenuOpen = false;

	get projects(): Taskproject[] {
		return this._taskprojectService.taskprojects;
	}

	form: FormInterface = this._form.getForm(
		'taskproject',
		taskprojectFormComponents
	);

	create(): void {
		this._form.modal<Taskproject>(this.form, {
			label: 'Create',
			click: (created: unknown, close: () => void) => {
				this._taskprojectService.create(created as Taskproject);

				close();
			}
		});
	}

	constructor(private _taskprojectService: TaskprojectService, private _form: FormService) {}
}
