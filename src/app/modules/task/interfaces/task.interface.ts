import { CrudDocument } from 'wacom';

export interface Task extends CrudDocument {
	name: string;
	description: string;
}
