import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Notifications } from 'med-ai-common';
import { ExperimentService } from '../services/experiment.service';
import { MatDialog } from '@angular/material/dialog';
import { NewExperimentComponent } from '../new-experiment/new-experiment.component';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-experiments',
  templateUrl: './experiments.component.html',
  styleUrls: ['./experiments.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ExperimentsComponent implements OnInit {
  experiments = [];
  experiementIds = [];
  selectedStudies = [];

  constructor(private experimentService: ExperimentService,
              private dialog: MatDialog,
              private notficiationService: NotificationService) { }

  ngOnInit(): void {
    this.getExperiments();
    let notificationTypes = [
      Notifications.experimentFailed,
      Notifications.experimentFinished,
      Notifications.experimentStarted,
      Notifications.experimentUpdated
    ]
    this.notficiationService.watchNotificationTypes(notificationTypes)
        .subscribe(n => this.getExperiments())
  }

  getExperiments() {
    this.experimentService.getExperiments().subscribe(es => {
      this.experiments = es;
    })
  }

  updateSelectedStudies(selected) {
    this.selectedStudies = selected;
  }

  createNewExperiment() {
    const dialogRef = this.dialog.open(NewExperimentComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(_ => this.getExperiments())
  }
}
