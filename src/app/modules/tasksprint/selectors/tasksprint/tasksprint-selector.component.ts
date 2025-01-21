import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { TasksprintService } from '../../services/tasksprint.service';
import { Tasksprint } from '../../interfaces/tasksprint.interface';

@Component({
	selector: 'tasksprint-selector',
	templateUrl: './tasksprint-selector.component.html',
	styleUrls: ['./tasksprint-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Tasksprint[] {
		return this._tasksprintService.tasksprints;
	}

	constructor(private _tasksprintService: TasksprintService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
