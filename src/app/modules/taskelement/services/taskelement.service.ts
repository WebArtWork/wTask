import { Injectable } from '@angular/core';
import { Taskelement } from '../interfaces/taskelement.interface';
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
export class TaskelementService extends CrudService<Taskelement> {
	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'taskelement',
			},
			_http,
			_store,
			_alert,
			_core
		);
	}
}
