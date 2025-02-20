import { Injectable } from '@angular/core';
import { Tasksprint } from '../interfaces/tasksprint.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root'
})
export class TasksprintService extends CrudService<Tasksprint> {
	constructor() {
		super({
			name: 'tasksprint'
		});
	}
}
