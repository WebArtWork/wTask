import { CrudDocument } from 'wacom';

export interface Taskstory extends CrudDocument {
	name: string;
	description: string;
	project: string;
}
