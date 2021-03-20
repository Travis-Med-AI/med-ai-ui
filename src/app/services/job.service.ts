import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EvalJobViewModel } from 'med-ai-common';


@Injectable({
  providedIn: 'root'
})
export class JobService {
  baseUrl = 'http://localhost:8000/jobs'


  constructor(private http: HttpClient) { }

  getJobs(): Observable<EvalJobViewModel[]> {
    return this.http.get<EvalJobViewModel[]>(`${this.baseUrl}`)
  }

  startJob(id: number): Observable<{updated: number}> {
    return this.http.post<{updated: number}>(`${this.baseUrl}/start`, {id})
  }

  killJob(id: number): Observable<EvalJobViewModel> {
    return this.http.post<EvalJobViewModel>(`${this.baseUrl}/kill`, {id})
  }
}
