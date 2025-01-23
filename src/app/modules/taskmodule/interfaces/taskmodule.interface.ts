import { CrudDocument } from 'wacom';

export interface Taskmodule extends CrudDocument {
	name: string;
	description: string;
	project: string;
}
