import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/modules/task/services/task.service';

@Component({
	templateUrl: './task.component.html',
	styleUrls: ['./task.component.scss'],
	standalone: false
})
export class TaskComponent {
	task = this._taskService.doc(this._router.url.replace('/task/', ''));

	constructor(private _taskService: TaskService, private _router: Router) {}
}
