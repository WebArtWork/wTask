import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { ElementsComponent } from './elements.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: ElementsComponent
	},
	{
		path: ':project_id',
		component: ElementsComponent
	},
	{
		path: ':project_id/:page_id',
		component: ElementsComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [ElementsComponent],
	providers: []
})
export class ElementsModule {}
