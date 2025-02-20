import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { TasksComponent } from './tasks.component';
import { Routes, RouterModule } from '@angular/router';
import { TaskComponent } from './task/task.component';
import { SelectTaskComponent } from 'src/app/modules/task/selectors/task/task-selector.component';

const routes: Routes = [
	{
		path: '',
		component: TasksComponent
	},
	{
		path: ':project_id',
		component: TasksComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule, SelectTaskComponent],
	declarations: [TasksComponent, TaskComponent]
})
export class TasksModule {}
