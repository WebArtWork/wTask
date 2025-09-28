import { CrudDocument } from 'wacom';

export interface Taskconfiguration extends CrudDocument {
	name: string;
	description: string;
	project: string;
}
