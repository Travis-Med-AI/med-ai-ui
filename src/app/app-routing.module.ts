import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { NewJobComponent } from './studies/studies.component';
import { RegisterModelComponent } from './register-model/register-model.component';
import { ModelsComponent } from './models/models.component';
import { EvalsComponent } from './evals/evals.component';
import { SettingsComponent } from './settings/settings.component';
import { MonitorComponent } from './monitor/monitor.component';
import { OrthancComponent } from './orthanc/orthanc.component';
import { EvaluateStudyComponent } from './evaluate-study/evaluate-study.component';
import { ExperimentsComponent } from './experiments/experiments.component';


const routes: Routes = [
  { path: 'landing', component: LandingComponent },
  { path: 'evaluate-study', component: EvaluateStudyComponent },
  { path: 'new-job', component: NewJobComponent },
  { path: 'register-model', component: RegisterModelComponent },
  { path: 'jobs', component: ModelsComponent },
  { path: 'evals', component: EvalsComponent },
  { path: 'experiments', component: ExperimentsComponent },
  { path: 'monitor', component: MonitorComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'orthanc', component: OrthancComponent },
  { path: '', redirectTo: '/landing', pathMatch: 'full'},
  { path: '*', redirectTo: '/landing' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
