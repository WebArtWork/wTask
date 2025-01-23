import { Injectable } from '@angular/core';
import { Taskmodule } from '../interfaces/taskmodule.interface';
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
export class TaskmoduleService extends CrudService<Taskmodule> {
	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'taskmodule',
			},
			_http,
			_store,
			_alert,
			_core
		);
	}
}
