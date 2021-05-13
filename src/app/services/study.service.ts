import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PagedResponse, StudyViewModel } from 'med-ai-common';


@Injectable({
  providedIn: 'root'
})
export class StudyService {
  baseUrl = 'http://localhost:8000/studies'

  constructor(private http: HttpClient) { }

  getStudies(page: number, pageSize: number, searchString: string, studyType:string=''): Observable<PagedResponse<StudyViewModel>>{
    return this.http.get<PagedResponse<StudyViewModel>>(`${this.baseUrl}`,
                         {params: {page:`${page}`, pageSize: `${pageSize}`, searchString: searchString || '', studyType: studyType || ''}})
  }

  countOrthancStudies(): Observable<number> {
    return this.http.get<{count: number}>(`${this.baseUrl}/orthanc-count`).pipe(map((s:any) => s.count))
  }

  getPreviewUrl(studyId: number) {
    return `http://localhost:8000/images/${studyId}.png`
  }

  deleteStudy(studyId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${studyId}`)
  }

}
