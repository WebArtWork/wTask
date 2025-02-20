import { Injectable } from '@angular/core';
import { Taskproject } from '../interfaces/taskproject.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root'
})
export class TaskprojectService extends CrudService<Taskproject> {
	taskprojects: Taskproject[] = this.getDocs();

	taskprojectsByAuthor: Record<string, Taskproject[]> = {};

	constructor() {
		super({
			name: 'taskproject'
		});

		this.get();

		this.filteredDocuments(this.taskprojectsByAuthor);
	}
}
