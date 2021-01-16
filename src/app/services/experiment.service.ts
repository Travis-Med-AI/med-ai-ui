import { Injectable } from '@angular/core';
import { PagedResponse, StudyType, StudyViewModel } from 'med-ai-common';
import { Observable, of } from 'rxjs';
import { maxBy } from 'lodash'
import { StudyService } from './study.service';
import { HttpClient } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { query } from '@angular/animations';

export enum ExperimentStatus {
  NEW,
  RUNNING,
  STOPPED,
  COMPLETED
}

export interface ExperimentViewModel {
  id?: number;
  name: string;
  createdDate: Date;
  status: ExperimentStatus,
  type: StudyType
}

export const EXPERIMENTS: ExperimentViewModel[] = [
  {name: 'experiment 1', createdDate: new Date(), id: 1, status: ExperimentStatus.COMPLETED, type: StudyType.frontalCXR},
  {name: 'experiment 2', createdDate: new Date(), id: 2, status: ExperimentStatus.RUNNING, type: StudyType.CT},
  {name: 'experiment 3', createdDate: new Date(), id: 3, status: ExperimentStatus.NEW, type: StudyType.frontalCXR},
  {name: 'experiment 4', createdDate: new Date(), id: 4, status: ExperimentStatus.NEW, type: StudyType.CT},
  {name: 'experiment 5', createdDate: new Date(), id: 5, status: ExperimentStatus.COMPLETED, type: StudyType.frontalCXR},
  {name: 'experiment 6', createdDate: new Date(), id: 6, status: ExperimentStatus.COMPLETED, type: StudyType.frontalCXR}
]

@Injectable({
  providedIn: 'root'
})
export class ExperimentService {
  baseUrl = 'http://localhost:8000/experiments'

  constructor(private studyService: StudyService,
              private http: HttpClient) { }

  getExperiments(): Observable<ExperimentViewModel[]> {
    return this.http.get<ExperimentViewModel[]>(this.baseUrl)
  }

  getStudiesByExperiment(id: number, page=0, pageSize=15): Observable<PagedResponse<StudyViewModel>> {
    return this.http.get<PagedResponse<StudyViewModel>>(this.baseUrl + '/studies',
     { params: {id: id.toString(), page: page.toString(), pageSize: pageSize.toString()} })
  }

  addStudiesToExperiment(studyIds: number[], experimentId: number): Observable<PagedResponse<StudyViewModel>> {
    return this.http.post<PagedResponse<StudyViewModel>>(this.baseUrl + '/studies', {
      experimentId,
      studies: studyIds
    })
  }

  getUnusedStudies(experimentId: number, pageIndex, pageSize, searchString: string=''): Observable<PagedResponse<StudyViewModel>> {
    return this.studyService.getStudies(pageIndex, pageSize, searchString)
  }

  addNewExperiment(name: string, type: StudyType) {
    return this.http.post<ExperimentViewModel[]>(this.baseUrl, {name, type})
  }
}
