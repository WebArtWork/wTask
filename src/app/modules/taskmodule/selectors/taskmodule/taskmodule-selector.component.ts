import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { TaskmoduleService } from '../../services/taskmodule.service';
import { Taskmodule } from '../../interfaces/taskmodule.interface';

@Component({
	selector: 'taskmodule-selector',
	templateUrl: './taskmodule-selector.component.html',
	styleUrls: ['./taskmodule-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Taskmodule[] {
		return this._taskmoduleService.taskmodules;
	}

	constructor(private _taskmoduleService: TaskmoduleService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
