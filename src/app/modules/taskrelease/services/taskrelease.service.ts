import { Injectable } from '@angular/core';
import { Taskrelease } from '../interfaces/taskrelease.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root'
})
export class TaskreleaseService extends CrudService<Taskrelease> {
	constructor() {
		super({
			name: 'taskrelease'
		});
	}
}
