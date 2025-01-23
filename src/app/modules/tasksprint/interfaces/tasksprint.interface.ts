import { CrudDocument } from 'wacom';

export interface Tasksprint extends CrudDocument {
	name: string;
	description: string;
	project: string;
}
