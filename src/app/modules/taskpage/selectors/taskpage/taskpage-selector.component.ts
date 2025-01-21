import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { TaskpageService } from '../../services/taskpage.service';
import { Taskpage } from '../../interfaces/taskpage.interface';

@Component({
	selector: 'taskpage-selector',
	templateUrl: './taskpage-selector.component.html',
	styleUrls: ['./taskpage-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Taskpage[] {
		return this._taskpageService.taskpages;
	}

	constructor(private _taskpageService: TaskpageService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
