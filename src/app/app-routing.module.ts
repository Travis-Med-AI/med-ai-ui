import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { NewJobComponent } from './new-job/new-job.component';
import { RegisterModelComponent } from './register-model/register-model.component';
import { StartJobComponent } from './start-job/start-job.component';
import { JobsComponent } from './jobs/jobs.component';
import { EvalsComponent } from './evals/evals.component';


const routes: Routes = [
  { path: 'landing', component: LandingComponent },
  { path: 'new-job', component: NewJobComponent },
  { path: 'register-model', component: RegisterModelComponent },
  { path: 'start-job', component: StartJobComponent },
  { path: 'jobs', component: JobsComponent },
  { path: 'evals', component: EvalsComponent },
  { path: '', redirectTo: 'landing', pathMatch: 'full'},
  { path: '*', redirectTo: 'landing' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
