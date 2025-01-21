import { Injectable } from '@angular/core';
import { Taskproject } from '../interfaces/taskproject.interface';
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
export class TaskprojectService extends CrudService<Taskproject> {
	taskprojects: Taskproject[] = this.getDocs();

	taskprojectsByAuthor: Record<string, Taskproject[]> = {};

	constructor(
		_http: HttpService,
		_store: StoreService,
		_alert: AlertService,
		_core: CoreService
	) {
		super(
			{
				name: 'taskproject',
			},
			_http,
			_store,
			_alert,
			_core
		);

		this.get();

		this.filteredDocuments(this.taskprojectsByAuthor);
	}
}
