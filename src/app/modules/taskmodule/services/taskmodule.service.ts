import { Injectable } from '@angular/core';
import { Taskmodule } from '../interfaces/taskmodule.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root'
})
export class TaskmoduleService extends CrudService<Taskmodule> {
	constructor() {
		super({
			name: 'taskmodule'
		});
	}
}
