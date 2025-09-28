import { Injectable } from '@angular/core';
import { Taskconfiguration } from '../interfaces/taskconfiguration.interface';
import { CrudService } from 'wacom';

@Injectable({
	providedIn: 'root',
})
export class TaskconfigurationService extends CrudService<Taskconfiguration> {
	taskconfigurations: Taskconfiguration[] = this.getDocs();

	taskconfigurationsByAuthor: Record<string, Taskconfiguration[]> = {};

	constructor() {
		super({
			name: 'taskconfiguration',
		});

		this.get();

		this.filteredDocuments(this.taskconfigurationsByAuthor);
	}
}
