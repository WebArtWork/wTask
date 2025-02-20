import { Injectable } from '@angular/core';
import { Taskpage } from '../interfaces/taskpage.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root'
})
export class TaskpageService extends CrudService<Taskpage> {
	constructor() {
		super({
			name: 'taskpage'
		});
	}
}
