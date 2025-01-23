import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { ModulesComponent } from './modules.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: ModulesComponent
	},
	{
		path: ':project_id',
		component: ModulesComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [ModulesComponent],
	providers: []
})
export class ModulesModule {}
