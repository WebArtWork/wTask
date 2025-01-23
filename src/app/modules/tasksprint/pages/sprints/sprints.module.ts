import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { SprintsComponent } from './sprints.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: SprintsComponent
	},
	{
		path: ':project_id',
		component: SprintsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [SprintsComponent],
	providers: []
})
export class SprintsModule {}
