import { CrudDocument } from 'wacom';

export interface Tasktag extends CrudDocument {
	name: string;
	description: string;
	project: string;
}
