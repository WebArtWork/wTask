import { Component } from '@angular/core';
import { Taskproject } from 'src/app/modules/taskproject/interfaces/taskproject.interface';
import { TaskprojectService } from 'src/app/modules/taskproject/services/taskproject.service';

@Component({
	templateUrl: './projects.component.html',
	styleUrls: ['./projects.component.scss'],
	standalone: false
})
export class ProjectsComponent {
	get projects(): Taskproject[] {
		return this._taskprojectService.taskprojects;
	}
	isMenuOpen = false
	constructor(private _taskprojectService: TaskprojectService) {}
}
