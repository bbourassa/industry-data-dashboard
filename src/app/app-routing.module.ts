import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndustryOverviewComponent } from './industry-overview/industry-overview.component';
import { IndustryTimelineComponent } from './industry-timeline/industry-timeline.component';

const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: ''},
    {path: 'overview', component: IndustryOverviewComponent},
    {path: 'timeline', component: IndustryTimelineComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
