import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { concat, includes, remove } from 'lodash';
import { StudyType, StudyViewModel } from 'med-ai-common';
import { ExperimentService, ExperimentViewModel } from '../services/experiment.service';
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

  studyTypes = Object.keys(StudyType)

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

  constructor(private experimentService: ExperimentService, private studyService: StudyService) { }

  ngOnInit(): void {
    this.experimentFilterControl.valueChanges.subscribe(e=> {
      this.selectedExperiment = e;
      this.reset()
    }
    )
    this.fetchStudies();
    this.searchControl.valueChanges.subscribe(v => {
      this.reset()
    })
  }

  reset() {
    this.pageIndex = 0;
    this.visibleStudies = 10;
    this.studies = [];
    this.fetchStudies();
  }

  onScroll() {
    this.pageIndex += 1;
    this.fetchStudies();
  }

  fetchStudies() {
    if(!this.selectedExperiment) {
      this.studyService.getStudies(this.pageIndex, this.pageSize, this.searchControl.value).subscribe(
        studies => {
          this.visibleStudies += studies.total;
          this.studies = concat(this.studies, studies.payload);
        }
      )
    } else {
      this.experimentService.getUnusedStudies(this.selectedExperiment, this.pageIndex, this.pageSize, this.searchControl.value).subscribe(
        studies => {
          this.visibleStudies += studies.total;
          this.studies = concat(this.studies, studies.payload);
        }
      )
    }

  }

  toggleSelect(orthancStudyId: string) {
    if(!includes(this.selectedStudies, orthancStudyId)) {
      this.selectedStudies.push(orthancStudyId);
    } else {
      remove(this.selectedStudies, s => s === orthancStudyId)
    }
    this.studiesSelected.emit(this.selectedStudies)
  }

  isSelected(orthancStudyId: string) {
    return includes(this.selectedStudies, orthancStudyId)
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
    this.experimentService.addStudiesToExperiment(selectedStudies, this.experimentFilterControl.value).subscribe(s => this.studies = s.payload)
  }
}
