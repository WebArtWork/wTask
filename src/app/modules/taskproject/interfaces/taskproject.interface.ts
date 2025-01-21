import { CrudDocument } from 'wacom';

export interface Taskproject extends CrudDocument {
	name: string;
	description: string;
}
