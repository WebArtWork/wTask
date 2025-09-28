import { Routes } from '@angular/router';
import { ConfigurationsComponent } from './configurations.component';

export const configurationsRoutes: Routes = [
	{
		path: '',
		component: ConfigurationsComponent
	},
	{
		path: ':project_id',
		component: ConfigurationsComponent
	}
];
