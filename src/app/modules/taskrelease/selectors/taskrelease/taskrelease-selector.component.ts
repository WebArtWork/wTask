import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { TaskreleaseService } from '../../services/taskrelease.service';
import { Taskrelease } from '../../interfaces/taskrelease.interface';

@Component({
	selector: 'taskrelease-selector',
	templateUrl: './taskrelease-selector.component.html',
	styleUrls: ['./taskrelease-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Taskrelease[] {
		return this._taskreleaseService.taskreleases;
	}

	constructor(private _taskreleaseService: TaskreleaseService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
