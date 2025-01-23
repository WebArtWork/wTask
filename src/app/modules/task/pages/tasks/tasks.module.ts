import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { TasksComponent } from './tasks.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: TasksComponent
	},
	{
		path: ':project_id',
		component: TasksComponent
	},
	{
		path: ':project_id/release/:release_id',
		component: TasksComponent
	},
	{
		path: ':project_id/sprint/:sprint_id',
		component: TasksComponent
	},
	{
		path: ':project_id/tag/:tag_id',
		component: TasksComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [TasksComponent],
	providers: []
})
export class TasksModule {}
