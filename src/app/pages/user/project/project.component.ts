import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TaskprojectService } from 'src/app/modules/taskproject/services/taskproject.service';

@Component({
	templateUrl: './project.component.html',
	styleUrls: ['./project.component.scss'],
	standalone: false
})
export class ProjectComponent {
	project = this._taskprojectService.doc(
		this._router.url.replace('/project/', '')
	);

	constructor(
		private _taskprojectService: TaskprojectService,
		private _router: Router
	) {}
}
