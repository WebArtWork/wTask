import { Injectable } from '@angular/core';
import { Tasktag } from '../interfaces/tasktag.interface';
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
export class TasktagService extends CrudService<Tasktag> {
	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'tasktag',
			},
			_http,
			_store,
			_alert,
			_core
		);
	}
}
