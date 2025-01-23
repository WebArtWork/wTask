import { CrudDocument } from 'wacom';

export interface Taskpage extends CrudDocument {
	name: string;
	description: string;
	project: string;
}
