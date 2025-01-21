import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { TasktagService } from '../../services/tasktag.service';
import { Tasktag } from '../../interfaces/tasktag.interface';

@Component({
	selector: 'tasktag-selector',
	templateUrl: './tasktag-selector.component.html',
	styleUrls: ['./tasktag-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Tasktag[] {
		return this._tasktagService.tasktags;
	}

	constructor(private _tasktagService: TasktagService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
