import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input,
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { TaskconfigurationService } from '../../services/taskconfiguration.service';
import { Taskconfiguration } from '../../interfaces/taskconfiguration.interface';

@Component({
	selector: 'taskconfiguration-selector',
	templateUrl: './taskconfiguration-selector.component.html',
	styleUrls: ['./taskconfiguration-selector.component.scss'],
	imports: [SelectModule],
})
export class TaskconfigurationSelectorComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Taskconfiguration[] {
		return this._taskconfigurationService.taskconfigurations;
	}

	constructor(private _taskconfigurationService: TaskconfigurationService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
