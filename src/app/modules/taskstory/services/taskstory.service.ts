import { Injectable } from '@angular/core';
import { Taskstory } from '../interfaces/taskstory.interface';
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
export class TaskstoryService extends CrudService<Taskstory> {
	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'taskstory',
			},
			_http,
			_store,
			_alert,
			_core
		);
	}
}
