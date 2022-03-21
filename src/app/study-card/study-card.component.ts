import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ModelViewModel, StudyViewModel } from 'med-ai-common';
import { EvalService } from '../services/eval.service';
import { NotificationService } from '../services/notification.service';
import { StudyService } from '../services/study.service';

@Component({
  selector: 'app-study-card',
  templateUrl: './study-card.component.html',
  styleUrls: ['./study-card.component.scss']
})
export class StudyCardComponent implements OnInit {
  @Input() study: StudyViewModel;
  @Input() models: ModelViewModel[];
  modelControl = new FormControl('')
  constructor(private studyService: StudyService,
              private notificationService: NotificationService,
              private evalService: EvalService) { }

  ngOnInit(): void {
  }

  deleteStudy(study) {
    this.studyService.deleteStudy(study.id)
    .subscribe(res => this.notificationService.showNotification(`deleted study ${study.id}`));

  }

  startEval(study) {
    let model = this.modelControl.value;
    this.evalService.evalDicom(model, study.id)
      .subscribe(res => this.notificationService.showNotification(`Sent request for evaluation of study ${study.id}`));
  }
}
