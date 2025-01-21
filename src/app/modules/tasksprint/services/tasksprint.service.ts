import { Injectable } from '@angular/core';
import { Tasksprint } from '../interfaces/tasksprint.interface';
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
export class TasksprintService extends CrudService<Tasksprint> {
	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'tasksprint',
			},
			_http,
			_store,
			_alert,
			_core
		);
	}
}
