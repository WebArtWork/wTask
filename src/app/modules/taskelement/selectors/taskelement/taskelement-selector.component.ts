import {
	SimpleChanges,
	EventEmitter,
	Component,
	OnChanges,
	Output,
	Input
} from '@angular/core';
import { SelectModule } from 'src/app/core/modules/select/select.module';
import { TaskelementService } from '../../services/taskelement.service';
import { Taskelement } from '../../interfaces/taskelement.interface';

@Component({
	selector: 'taskelement-selector',
	templateUrl: './taskelement-selector.component.html',
	styleUrls: ['./taskelement-selector.component.scss'],
	imports: [SelectModule]
})
export class SelectUserComponent implements OnChanges {
	@Input() value: string;

	@Output() wChange = new EventEmitter();

	get items(): Taskelement[] {
		return this._taskelementService.taskelements;
	}

	constructor(private _taskelementService: TaskelementService) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['value'] && !changes['value'].firstChange) {
			this.value = changes['value'].currentValue;
		}
	}
}
