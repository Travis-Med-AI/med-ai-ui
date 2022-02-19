import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { csvVerification, PagedResponse, StudyViewModel } from 'med-ai-common';
import { SettingsService } from './settings.service';


@Injectable({
  providedIn: 'root'
})
export class StudyService {
  baseUrl = `${this.settingsService.getServerUrl()}/studies`

  constructor(private http: HttpClient, private settingsService: SettingsService) { }

  getStudies(page: number, pageSize: number, searchString: string, studyType:string=''): Observable<PagedResponse<StudyViewModel>>{
    return this.http.get<PagedResponse<StudyViewModel>>(`${this.baseUrl}`,
                         {params: {page:`${page}`, pageSize: `${pageSize}`, searchString: searchString || '', studyType: studyType || ''}})
  }

  countOrthancStudies(): Observable<number> {
    return this.http.get<{count: number}>(`${this.baseUrl}/orthanc-count`).pipe(map((s:any) => s.count))
  }

  getPreviewUrl(studyId: number) {
    return `${this.settingsService.getServerUrl()}/images/${studyId}.png`
  }

  deleteStudy(studyId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${studyId}`)
  }

  checkForSeriesUID(file: File, modelId: number): Observable<csvVerification> {
    const formData = new FormData();
    formData.append("csv", file);
    formData.append("modelId", modelId.toString())
    return this.http.post<csvVerification>(`${this.baseUrl}/check-series-ids`, formData)
  }

  saveLabels(file: File, modelId:number) {
    const formData = new FormData();
    formData.append("csv", file);
    formData.append("modelId", modelId.toString())
    return this.http.post<csvVerification>(`${this.baseUrl}/save-labels`, formData)
  }

}
