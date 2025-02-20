import { Injectable } from '@angular/core';
import { Taskstory } from '../interfaces/taskstory.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root'
})
export class TaskstoryService extends CrudService<Taskstory> {
	constructor() {
		super({
			name: 'taskstory'
		});
	}
}
