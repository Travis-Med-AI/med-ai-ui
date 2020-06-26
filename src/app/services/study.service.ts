import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class StudyService {
  baseUrl = 'http://localhost:8000/studies'

  constructor(private http: HttpClient) { }

  getStudies(page: number, pageSize: number, searchString: string): Observable<{studies: any[], total: number}>{
    return this.http.get<{studies: any[], total: number}>(`${this.baseUrl}`,
                         {params: {page:`${page}`, pageSize: `${pageSize}`, searchString}})
  }

  countOrthancStudies(): Observable<number> {
    return this.http.get(`${this.baseUrl}/orthanc-count`).pipe(map((s:any) => s.count))
  }
}
