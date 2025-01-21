import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { TaskprojectService } from '../../services/taskproject.service';
import { Taskproject } from '../../interfaces/taskproject.interface';

@Component({
	selector: 'taskproject-selector',
	templateUrl: './taskproject-selector.component.html',
	styleUrls: ['./taskproject-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Taskproject[] {
		return this._taskprojectService.taskprojects;
	}

	constructor(private _taskprojectService: TaskprojectService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
