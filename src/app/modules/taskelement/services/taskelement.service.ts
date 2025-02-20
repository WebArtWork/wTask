import { Injectable } from '@angular/core';
import { Taskelement } from '../interfaces/taskelement.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root'
})
export class TaskelementService extends CrudService<Taskelement> {
	constructor() {
		super({
			name: 'taskelement'
		});
	}
}
