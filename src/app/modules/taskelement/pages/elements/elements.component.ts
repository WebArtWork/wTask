import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { TaskelementService } from '../../services/taskelement.service';
import { Taskelement } from '../../interfaces/taskelement.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { taskelementFormComponents } from '../../formcomponents/taskelement.formcomponents';
import { firstValueFrom } from 'rxjs';

@Component({
	templateUrl: './elements.component.html',
	styleUrls: ['./elements.component.scss'],
	standalone: false
})
export class ElementsComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('taskelement', taskelementFormComponents);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._taskelementService.setPerPage.bind(this._taskelementService),
		allDocs: false,
		create: (): void => {
			this._form.modal<Taskelement>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Taskelement);

					await firstValueFrom(
						this._taskelementService.create(created as Taskelement)
					);

					this.setRows();
				}
			});
		},
		update: (doc: Taskelement): void => {
			this._form.modal<Taskelement>(this.form, [], doc).then((updated: Taskelement) => {
				this._core.copy(updated, doc);

				this._taskelementService.update(doc);
			});
		},
		delete: (doc: Taskelement): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this taskelement?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(this._taskelementService.delete(doc));

							this.setRows();
						}
					}
				]
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Taskelement): void => {
					this._form.modalUnique<Taskelement>('taskelement', 'url', doc);
				}
			}
		],
		headerButtons: [
			{
				icon: 'playlist_add',
				click: this._bulkManagement(),
				class: 'playlist',
			},
			{
				icon: 'edit_note',
				click: this._bulkManagement(false),
				class: 'edit',
			},
		]
	};

	rows: Taskelement[] = [];

	constructor(
		private _translate: TranslateService,
		private _taskelementService: TaskelementService,
		private _alert: AlertService,
		private _form: FormService,
		private _core: CoreService
	) {
		this.setRows();
	}

	setRows(page = this._page): void {
		this._page = page;

		this._core.afterWhile(
			this,
			() => {
				this._taskelementService.get({ page }).subscribe((rows) => {
					this.rows.splice(0, this.rows.length);

					this.rows.push(...rows);
				});
			},
			250
		);
	}

	private _page = 1;

	private _bulkManagement(create = true): () => void {
		return (): void => {
			this._form
				.modalDocs<Taskelement>(create ? [] : this.rows)
				.then(async (taskelements: Taskelement[]) => {
					if (create) {
						for (const taskelement of taskelements) {
							this._preCreate(taskelement);

							await firstValueFrom(
								this._taskelementService.create(taskelement)
							);
						}
					} else {
						for (const taskelement of this.rows) {
							if (!taskelements.find(
								localTaskelement => localTaskelement._id === taskelement._id
							)) {
								await firstValueFrom(
									this._taskelementService.delete(taskelement)
								);
							}
						}

						for (const taskelement of taskelements) {
							const localTaskelement = this.rows.find(
								localTaskelement => localTaskelement._id === taskelement._id
							);

							if (localTaskelement) {
								this._core.copy(taskelement, localTaskelement);

								await firstValueFrom(
									this._taskelementService.update(localTaskelement)
								);
							} else {
								this._preCreate(taskelement);

								await firstValueFrom(
									this._taskelementService.create(taskelement)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(taskelement: Taskelement): void {
		taskelement.__created;
	}
}
