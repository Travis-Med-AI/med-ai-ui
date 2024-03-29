import { Injectable } from '@angular/core';
import { ExperimentViewModel,
         ExperimentStatsViewModel,
         PagedResponse,
         StudyType,
         StudyViewModel } from 'med-ai-common';
import { Observable, of } from 'rxjs';
import { StudyService } from './study.service';
import { HttpClient } from '@angular/common/http';
import { SettingsService } from './settings.service';


@Injectable({
  providedIn: 'root'
})
export class ExperimentService {
  baseUrl = `${this.settingsService.getServerUrl()}/experiments`

  constructor(private studyService: StudyService,
              private http: HttpClient,
              private settingsService: SettingsService) { }

  getExperiments(): Observable<ExperimentViewModel[]> {
    return this.http.get<ExperimentViewModel[]>(this.baseUrl)
  }

  getStudiesByExperiment(id: number, page=0, pageSize=15, studyType?: StudyType, modality?: string): Observable<PagedResponse<StudyViewModel>> {
    return this.http.get<PagedResponse<StudyViewModel>>(this.baseUrl + '/studies',
     { params: {id: id.toString(), page: page.toString(), pageSize: pageSize.toString(), studyType: studyType || '', modality: modality || ''} })
  }

  addStudiesToExperiment(studyIds: number[], experimentId: number): Observable<PagedResponse<StudyViewModel>> {
    return this.http.post<PagedResponse<StudyViewModel>>(this.baseUrl + '/studies', {
      experimentId,
      studies: studyIds
    })
  }

  addAllToExperiment(experimentId: number, searchString: string = '', studyType?: StudyType, modality?: string): Observable<PagedResponse<StudyViewModel>> {
    return this.http.post<PagedResponse<StudyViewModel>>(this.baseUrl + '/all-studies', {
      id: experimentId,
      searchString,
      studyType,
      modality: modality || ''
    })
  }

  getUnusedStudies(experimentId: number, pageIndex, pageSize, searchString: string='', studyType?:StudyType, modality?: string): Observable<PagedResponse<StudyViewModel>> {
    return this.http.get<PagedResponse<StudyViewModel>>(this.baseUrl + '/unused-studies',
    { params: {
      id: experimentId.toString(),
      page: pageIndex.toString(),
      pageSize: pageSize.toString(),
      searchString: searchString || '',
      studyType: studyType || '',
      modality: modality || ''
    }})
  }

  addNewExperiment(name: string, type: StudyType) {
    return this.http.post<ExperimentViewModel[]>(this.baseUrl, {name, type})
  }

  startExperiment(experimentId: number, modelId: number) {
    return this.http.post<ExperimentViewModel>(this.baseUrl + '/start', {experimentId, modelId})
  }

  stopExperiment(experimentId: number) {
    return this.http.post<ExperimentViewModel>(this.baseUrl + '/stop', {experimentId})
  }

  deleteExperiment(experimentId: number) {
    return this.http.delete<any>(this.baseUrl + `/${experimentId}`)
  }

  getResults(experimentId: number) {
    window.open(this.baseUrl + `/results?id=${experimentId}`);
  }

  getEvalStats(experimentId: number) {
    return this.http.post<ExperimentStatsViewModel>(this.baseUrl + '/experiment-stats', {experimentId})
  }
}
