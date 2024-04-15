import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlanComponent } from './plan/plan.component';
import { SubscriberComponent } from './subscriber/subscriber.component';

const routes: Routes = [{ path: 'plan', component: PlanComponent},
{path :'validate', component:SubscriberComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
