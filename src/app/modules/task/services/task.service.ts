import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root'
})
export class TaskService extends CrudService<Task> {
	constructor() {
		super({
			name: 'task'
		});
	}
}
