import { Injectable } from '@angular/core';
import { Taskpage } from '../interfaces/taskpage.interface';
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
export class TaskpageService extends CrudService<Taskpage> {
	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'taskpage',
			},
			_http,
			_store,
			_alert,
			_core
		);
	}
}
