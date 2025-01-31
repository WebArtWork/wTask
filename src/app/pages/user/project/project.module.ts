import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { ProjectComponent } from './project.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: ':project_id',
		component: ProjectComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [ProjectComponent]
})
export class ProjectModule {}
