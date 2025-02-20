import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { TaskService } from '../../services/task.service';
import { Task } from '../../interfaces/task.interface';

@Component({
	selector: 'task-selector',
	templateUrl: './task-selector.component.html',
	styleUrls: ['./task-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectTaskComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Task[] {
		return this._taskService.getDocs();
	}

	constructor(private _taskService: TaskService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
