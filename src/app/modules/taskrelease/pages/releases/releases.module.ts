import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { ReleasesComponent } from './releases.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: ReleasesComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes), CoreModule],
	declarations: [ReleasesComponent],
	providers: []
})
export class ReleasesModule {}
