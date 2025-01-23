import { CrudDocument } from 'wacom';

export interface Taskrelease extends CrudDocument {
	name: string;
	description: string;
	project: string;
}
