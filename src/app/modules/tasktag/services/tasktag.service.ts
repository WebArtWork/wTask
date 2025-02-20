import { Injectable } from '@angular/core';
import { Tasktag } from '../interfaces/tasktag.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root'
})
export class TasktagService extends CrudService<Tasktag> {
	constructor() {
		super({
			name: 'tasktag'
		});
	}
}
