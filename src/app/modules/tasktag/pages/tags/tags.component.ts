import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { TasktagService } from '../../services/tasktag.service';
import { Tasktag } from '../../interfaces/tasktag.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { tasktagFormComponents } from '../../formcomponents/tasktag.formcomponents';
import { firstValueFrom } from 'rxjs';

@Component({
	templateUrl: './tags.component.html',
	styleUrls: ['./tags.component.scss'],
	standalone: false
})
export class TagsComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('tasktag', tasktagFormComponents);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._tasktagService.setPerPage.bind(this._tasktagService),
		allDocs: false,
		create: (): void => {
			this._form.modal<Tasktag>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Tasktag);

					await firstValueFrom(
						this._tasktagService.create(created as Tasktag)
					);

					this.setRows();
				}
			});
		},
		update: (doc: Tasktag): void => {
			this._form.modal<Tasktag>(this.form, [], doc).then((updated: Tasktag) => {
				this._core.copy(updated, doc);

				this._tasktagService.update(doc);
			});
		},
		delete: (doc: Tasktag): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this tasktag?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(this._tasktagService.delete(doc));

							this.setRows();
						}
					}
				]
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Tasktag): void => {
					this._form.modalUnique<Tasktag>('tasktag', 'url', doc);
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

	rows: Tasktag[] = [];

	constructor(
		private _translate: TranslateService,
		private _tasktagService: TasktagService,
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
				this._tasktagService.get({ page }).subscribe((rows) => {
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
				.modalDocs<Tasktag>(create ? [] : this.rows)
				.then(async (tasktags: Tasktag[]) => {
					if (create) {
						for (const tasktag of tasktags) {
							this._preCreate(tasktag);

							await firstValueFrom(
								this._tasktagService.create(tasktag)
							);
						}
					} else {
						for (const tasktag of this.rows) {
							if (!tasktags.find(
								localTasktag => localTasktag._id === tasktag._id
							)) {
								await firstValueFrom(
									this._tasktagService.delete(tasktag)
								);
							}
						}

						for (const tasktag of tasktags) {
							const localTasktag = this.rows.find(
								localTasktag => localTasktag._id === tasktag._id
							);

							if (localTasktag) {
								this._core.copy(tasktag, localTasktag);

								await firstValueFrom(
									this._tasktagService.update(localTasktag)
								);
							} else {
								this._preCreate(tasktag);

								await firstValueFrom(
									this._tasktagService.create(tasktag)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(tasktag: Tasktag): void {
		tasktag.__created;
	}
}
