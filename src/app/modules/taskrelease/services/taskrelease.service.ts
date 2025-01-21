import { Injectable } from '@angular/core';
import { Taskrelease } from '../interfaces/taskrelease.interface';
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
export class TaskreleaseService extends CrudService<Taskrelease> {
	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'taskrelease',
			},
			_http,
			_store,
			_alert,
			_core
		);
	}
}
