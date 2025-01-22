import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { TaskComponent } from './task.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: TaskComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [TaskComponent]
})
export class TaskModule {}
