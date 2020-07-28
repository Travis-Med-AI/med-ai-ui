import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidenavComponent } from './sidenav/sidenav.component';
import { LandingComponent } from './landing/landing.component';

import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input'
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatTableModule } from '@angular/material/table'
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';

import { FlexLayoutModule } from '@angular/flex-layout';
import { NewJobComponent } from './new-job/new-job.component';
import { RegisterModelComponent } from './register-model/register-model.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { JobsComponent } from './jobs/jobs.component';
import { EvalsComponent } from './evals/evals.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkScrollableModule, ScrollingModule } from '@angular/cdk/scrolling';
import { SettingsComponent } from './settings/settings.component';
import { MonitorComponent } from './monitor/monitor.component';
import { OrthancComponent } from './orthanc/orthanc.component';
import { EvaluateStudyComponent } from './evaluate-study/evaluate-study.component';



@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    LandingComponent,
    NewJobComponent,
    RegisterModelComponent,
    JobsComponent,
    EvalsComponent,
    TruncatePipe,
    SettingsComponent,
    MonitorComponent,
    OrthancComponent,
    EvaluateStudyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    HttpClientModule,
    FlexLayoutModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatIconModule,
    MatTooltipModule,
    CdkTableModule,
    CdkScrollableModule,
    ScrollingModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatCardModule,
    MatStepperModule,
    MatAutocompleteModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [RegisterModelComponent]
})
export class AppModule { }
