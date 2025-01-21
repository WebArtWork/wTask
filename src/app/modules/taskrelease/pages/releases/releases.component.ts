import { Component } from '@angular/core';
import { AlertService, CoreService } from 'wacom';
import { TaskreleaseService } from '../../services/taskrelease.service';
import { Taskrelease } from '../../interfaces/taskrelease.interface';
import { FormService } from 'src/app/core/modules/form/form.service';
import { TranslateService } from 'src/app/core/modules/translate/translate.service';
import { FormInterface } from 'src/app/core/modules/form/interfaces/form.interface';
import { taskreleaseFormComponents } from '../../formcomponents/taskrelease.formcomponents';
import { firstValueFrom } from 'rxjs';

@Component({
	templateUrl: './releases.component.html',
	styleUrls: ['./releases.component.scss'],
	standalone: false
})
export class ReleasesComponent {
	columns = ['name', 'description'];

	form: FormInterface = this._form.getForm('taskrelease', taskreleaseFormComponents);

	config = {
		paginate: this.setRows.bind(this),
		perPage: 20,
		setPerPage: this._taskreleaseService.setPerPage.bind(this._taskreleaseService),
		allDocs: false,
		create: (): void => {
			this._form.modal<Taskrelease>(this.form, {
				label: 'Create',
				click: async (created: unknown, close: () => void) => {
					close();

					this._preCreate(created as Taskrelease);

					await firstValueFrom(
						this._taskreleaseService.create(created as Taskrelease)
					);

					this.setRows();
				}
			});
		},
		update: (doc: Taskrelease): void => {
			this._form.modal<Taskrelease>(this.form, [], doc).then((updated: Taskrelease) => {
				this._core.copy(updated, doc);

				this._taskreleaseService.update(doc);
			});
		},
		delete: (doc: Taskrelease): void => {
			this._alert.question({
				text: this._translate.translate(
					'Common.Are you sure you want to delete this taskrelease?'
				),
				buttons: [
					{
						text: this._translate.translate('Common.No')
					},
					{
						text: this._translate.translate('Common.Yes'),
						callback: async (): Promise<void> => {
							await firstValueFrom(this._taskreleaseService.delete(doc));

							this.setRows();
						}
					}
				]
			});
		},
		buttons: [
			{
				icon: 'cloud_download',
				click: (doc: Taskrelease): void => {
					this._form.modalUnique<Taskrelease>('taskrelease', 'url', doc);
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

	rows: Taskrelease[] = [];

	constructor(
		private _translate: TranslateService,
		private _taskreleaseService: TaskreleaseService,
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
				this._taskreleaseService.get({ page }).subscribe((rows) => {
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
				.modalDocs<Taskrelease>(create ? [] : this.rows)
				.then(async (taskreleases: Taskrelease[]) => {
					if (create) {
						for (const taskrelease of taskreleases) {
							this._preCreate(taskrelease);

							await firstValueFrom(
								this._taskreleaseService.create(taskrelease)
							);
						}
					} else {
						for (const taskrelease of this.rows) {
							if (!taskreleases.find(
								localTaskrelease => localTaskrelease._id === taskrelease._id
							)) {
								await firstValueFrom(
									this._taskreleaseService.delete(taskrelease)
								);
							}
						}

						for (const taskrelease of taskreleases) {
							const localTaskrelease = this.rows.find(
								localTaskrelease => localTaskrelease._id === taskrelease._id
							);

							if (localTaskrelease) {
								this._core.copy(taskrelease, localTaskrelease);

								await firstValueFrom(
									this._taskreleaseService.update(localTaskrelease)
								);
							} else {
								this._preCreate(taskrelease);

								await firstValueFrom(
									this._taskreleaseService.create(taskrelease)
								);
							}
						}
					}

					this.setRows();
				});
		};
	}

	private _preCreate(taskrelease: Taskrelease): void {
		taskrelease.__created;
	}
}
