import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndustryHomepageComponent } from './industry-homepage/industry-homepage.component';
import { IndustryOverviewComponent } from './industry-overview/industry-overview.component';
import { IndustryTimelineComponent } from './industry-timeline/industry-timeline.component';

const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'homepage'},
    {path: 'homepage', component: IndustryHomepageComponent},
    {path: 'overview', component: IndustryOverviewComponent},
    {path: 'timeline', component: IndustryTimelineComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
