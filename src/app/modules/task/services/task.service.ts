import { Injectable } from '@angular/core';
import { Task } from '../interfaces/task.interface';
import {
	AlertService,
	CoreService,
	HttpService,
	StoreService,
	CrudService
} from 'wacom';

@Injectable({
	providedIn: 'root',
})
export class TaskService extends CrudService<Task> {
	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'task',
			},
			_http,
			_store,
			_alert,
			_core
		);
	}
}
