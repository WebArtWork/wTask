import { CrudDocument } from 'wacom';

export interface Task extends CrudDocument {
	name: string;
	description: string;
	project: string;
	release: string;
	sprint: string;
	tag: string;
}
