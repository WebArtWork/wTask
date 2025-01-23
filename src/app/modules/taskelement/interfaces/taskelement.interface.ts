import { CrudDocument } from 'wacom';

export interface Taskelement extends CrudDocument {
	name: string;
	description: string;
	project: string;
	page: string;
}
