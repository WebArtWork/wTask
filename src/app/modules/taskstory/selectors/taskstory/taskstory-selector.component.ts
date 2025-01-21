import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { TaskstoryService } from '../../services/taskstory.service';
import { Taskstory } from '../../interfaces/taskstory.interface';

@Component({
	selector: 'taskstory-selector',
	templateUrl: './taskstory-selector.component.html',
	styleUrls: ['./taskstory-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Taskstory[] {
		return this._taskstoryService.taskstorys;
	}

	constructor(private _taskstoryService: TaskstoryService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
