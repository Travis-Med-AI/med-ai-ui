import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidenavComponent } from './sidenav/sidenav.component';
import { LandingComponent } from './landing/landing.component';

import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { MatExpansionModule } from '@angular/material/expansion';
import { MatBadgeModule } from '@angular/material/badge';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { FlexLayoutModule } from '@angular/flex-layout';
import { StudiesComponent } from './studies/studies.component';
import { RegisterModelComponent } from './register-model/register-model.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { ModelsComponent } from './models/models.component';
import { EvalsComponent } from './evals/evals.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkScrollableModule, ScrollingModule } from '@angular/cdk/scrolling';
import { SettingsComponent } from './settings/settings.component';
import { MonitorComponent } from './monitor/monitor.component';
import { OrthancComponent } from './orthanc/orthanc.component';
import { EvaluateStudyComponent } from './evaluate-study/evaluate-study.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { DeleteConfirmationComponent } from './models/delete-confirmation/delete-confirmation.component';
import { NotificationDialogComponent } from './notification-dialog/notification-dialog.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { StdoutDialogComponent } from './evals/stdout-dialog/stdout-dialog.component';
import { NgxMasonryModule } from 'ngx-masonry';
import { EvalDialogComponent } from './evals/eval-dialog/eval-dialog.component';
import { ExperimentsComponent } from './experiments/experiments.component';
import { NewExperimentComponent } from './new-experiment/new-experiment.component';
import { ExperimentCardComponent } from './experiment-card/experiment-card.component';
import { StudySidebarComponent } from './study-sidebar/study-sidebar.component';
import { environment } from '../environments/environment';
import { LabelDialogComponent } from './label-dialog/label-dialog.component';
import { ModelDropdownComponent } from './model-dropdown/model-dropdown.component';
import { ExperimentAnalysisComponent } from './experiment-anaylsis/experiment-analysis.component';
import { RouterModule } from '@angular/router';
import { StudyCardComponent } from './study-card/study-card.component';
import { TableComponent } from './table/table.component';
import { ModelCardComponent } from './model-card/model-card.component';
import { LoginComponent } from './login/login.component';
import { AuthInterceptor } from './auth.interceptor';
import { SignupComponent } from './signup/signup.component';

const config: SocketIoConfig = { url: environment.API_URL}

const materialModules = [
  MatPaginatorModule,
  MatSlideToggleModule,
  MatCheckboxModule,
  MatSnackBarModule,
  MatSidenavModule,
  MatCardModule,
  MatStepperModule,
  MatAutocompleteModule,
  MatDialogModule,
  MatExpansionModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatTableModule,
  MatIconModule,
  MatTooltipModule,
  MatToolbarModule,
  MatButtonModule,
  MatInputModule,
  MatBadgeModule,
  MatProgressBarModule,
  MatDividerModule,
  MatGridListModule,
  MatListModule
]

@NgModule({
    declarations: [
        AppComponent,
        SidenavComponent,
        LandingComponent,
        StudiesComponent,
        RegisterModelComponent,
        ModelsComponent,
        EvalsComponent,
        TruncatePipe,
        SettingsComponent,
        MonitorComponent,
        OrthancComponent,
        EvaluateStudyComponent,
        DeleteConfirmationComponent,
        NotificationDialogComponent,
        StdoutDialogComponent,
        EvalDialogComponent,
        ExperimentsComponent,
        NewExperimentComponent,
        ExperimentCardComponent,
        StudySidebarComponent,
        LabelDialogComponent,
        ModelDropdownComponent,
        ExperimentAnalysisComponent,
        StudyCardComponent,
        TableComponent,
        ModelCardComponent,
        LoginComponent,
        SignupComponent,
    ],
    imports: [
        BrowserModule,
        SocketIoModule.forRoot(config),
        ...materialModules,
        InfiniteScrollModule,
        NgxMasonryModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        RouterModule,
        HttpClientModule,
        FlexLayoutModule,
        MatSelectModule,
        FormsModule,
        ReactiveFormsModule,
        CdkTableModule,
        CdkScrollableModule,
        ScrollingModule,
        DragDropModule,
    ],
    providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
    bootstrap: [AppComponent]
})
export class AppModule { }
