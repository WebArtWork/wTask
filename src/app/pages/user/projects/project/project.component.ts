import { Component, Input } from '@angular/core';
import { Taskproject } from 'src/app/modules/taskproject/interfaces/taskproject.interface';

@Component({
	selector: 'app-project',
	standalone: false,
	templateUrl: './project.component.html',
	styleUrl: './project.component.scss'
})
export class ProjectComponent {
	@Input() project: Taskproject;
}
