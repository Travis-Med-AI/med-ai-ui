import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StudyService } from '../services/study.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-evaluate-study',
  templateUrl: './evaluate-study.component.html',
  styleUrls: ['./evaluate-study.component.scss']
})
export class EvaluateStudyComponent implements OnInit {

  studyControl = new FormControl();
  studies: any[];
  constructor(private studyService: StudyService) { }

  ngOnInit(): void {
    this.studyControl.valueChanges.subscribe(s => this.fetchStudies(0, 5, s))
  }

  fetchStudies(pageIndex: number, pageSize: number, searchString: string) {
    this.studyService.getStudies(pageIndex, pageSize, this.studyControl.value).subscribe((res) => {
      this.studies = res.payload;
    })
  }

}
