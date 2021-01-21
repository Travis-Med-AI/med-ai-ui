import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { concat, includes, remove } from 'lodash';
import { ExperimentViewModel, StudyType, StudyViewModel } from 'med-ai-common';
import { ExperimentService } from '../services/experiment.service';
import { NotificationService } from '../services/notification.service';
import { StudyService } from '../services/study.service';

@Component({
  selector: 'app-study-sidebar',
  templateUrl: './study-sidebar.component.html',
  styleUrls: ['./study-sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StudySidebarComponent implements OnInit {
  @Output() studiesSelected: EventEmitter<string[]> = new EventEmitter()
  @Input() experiments: ExperimentViewModel[] = [];

  studyTypes = Object.values(StudyType)

  experimentFilterControl = new FormControl();
  studyTypeControl = new FormControl();
  experiementIds: string[] = [];
  studies: StudyViewModel[] = []
  searchControl = new FormControl('');
  visibleStudies = 10;
  pageIndex = 0;
  pageSize = 15;
  selectedStudies: string[] = [];
  hideDragged = false;
  showFilters = false;
  selectedExperiment: number;

  constructor(private experimentService: ExperimentService,
              private studyService: StudyService,
              private notificationService: NotificationService
    ) { }

  ngOnInit(): void {
    this.experimentFilterControl.valueChanges.subscribe(e=> {
      if(e) {
        this.selectedExperiment = e;
        this.reset()
      }
    }
    )
    this.fetchStudies();
    this.searchControl.valueChanges.subscribe(v => {
      if(v) this.reset()
    })
    this.studyTypeControl.valueChanges.subscribe(e => {
      if(e) this.reset()
    })
  }

  reset() {
    this.pageIndex = 0;
    this.visibleStudies = 0;
    this.studies = [];
    this.fetchStudies();
  }

  onScroll() {
    this.pageIndex += 1;
    this.fetchStudies();
  }

  fetchStudies() {
    if(!this.selectedExperiment) {
      this.studyService.getStudies(this.pageIndex,
                                   this.pageSize,
                                   this.searchControl.value,
                                   this.studyTypeControl.value).subscribe(
        studies => {
          this.visibleStudies += studies.total;
          this.studies = concat(this.studies, studies.payload);
        }
      )
    } else {
      this.experimentService.getUnusedStudies(this.selectedExperiment,
                                              this.pageIndex,
                                              this.pageSize,
                                              this.searchControl.value,
                                              this.studyTypeControl.value).subscribe(
        studies => {
          this.visibleStudies += studies.total;
          this.studies = concat(this.studies, studies.payload);
        }
      )
    }

  }

  toggleSelect(studyId: string) {
    if(!includes(this.selectedStudies, studyId)) {
      this.selectedStudies.push(studyId);
    } else {
      remove(this.selectedStudies, s => s === studyId)
    }
    this.studiesSelected.emit(this.selectedStudies)
  }

  isSelected(studyId: string) {
    return includes(this.selectedStudies, studyId)
  }

  hideMultiple() {
    this.hideDragged = true;
  }

  showMultiple() {
    this.hideDragged = false;
  }

  getExperimentIds() {
    return this.experiments.map(e => `${e.id}`);
  }

  addStudies() {
    let selectedStudies = this.selectedStudies.map(s => parseInt(s))
    this.experimentService.addStudiesToExperiment(selectedStudies,
                                                  this.experimentFilterControl.value).subscribe(s => this.reset())
  }

  addAllToExperiment() {
    this.experimentService.addAllToExperiment(this.experimentFilterControl.value || '',
                                              this.searchControl.value || '',
                                              this.studyTypeControl.value || '').subscribe(s => this.reset())
  }

  clearFilters() {
    this.experimentFilterControl.reset();
    this.studyTypeControl.reset();
    this.searchControl.reset();
    this.selectedExperiment = null;
    this.reset()
  }
}
