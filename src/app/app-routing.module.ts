import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { StudiesComponent } from './studies/studies.component';
import { RegisterModelComponent } from './register-model/register-model.component';
import { ModelsComponent } from './models/models.component';
import { EvalsComponent } from './evals/evals.component';
import { SettingsComponent } from './settings/settings.component';
import { MonitorComponent } from './monitor/monitor.component';
import { OrthancComponent } from './orthanc/orthanc.component';
import { EvaluateStudyComponent } from './evaluate-study/evaluate-study.component';
import { ExperimentsComponent } from './experiments/experiments.component';
import { AuthGuardService } from './services/auth-guard.service';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';


const routes: Routes = [
  { path: 'landing', component: LandingComponent, canActivate: [AuthGuardService] },
  { path: 'evaluate-study', component: EvaluateStudyComponent, canActivate: [AuthGuardService] },
  { path: 'new-job', component: StudiesComponent, canActivate: [AuthGuardService] },
  { path: 'register-model', component: RegisterModelComponent, canActivate: [AuthGuardService] },
  { path: 'jobs', component: ModelsComponent, canActivate: [AuthGuardService] },
  { path: 'evals', component: EvalsComponent , canActivate: [AuthGuardService]},
  { path: 'experiments', component: ExperimentsComponent, canActivate: [AuthGuardService] },
  { path: 'monitor', component: MonitorComponent, canActivate: [AuthGuardService] },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuardService] },
  { path: 'orthanc', component: OrthancComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '', redirectTo: '/landing', pathMatch: 'full'},
  { path: '*', redirectTo: '/landing' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
