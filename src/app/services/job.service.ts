import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EvalJobViewModel } from 'med-ai-common';
import { SettingsService } from './settings.service';


@Injectable({
  providedIn: 'root'
})
export class JobService {
  baseUrl = `${this.settingsService.getServerUrl()}/jobs`


  constructor(private http: HttpClient, private settingsService: SettingsService) { }

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
