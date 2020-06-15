import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http: HttpClient) { }

  baseUrl = 'http://localhost:8000/ai'

  getStudies(page: number, pageSize: number): Observable<{studies: any[], total: number}>{
    return this.http.get<{studies: any[], total: number}>(`${this.baseUrl}/studies`,
                         {params: {page:`${page}`, pageSize: `${pageSize}`}})
  }

  getModels() {
    return this.http.get(`${this.baseUrl}/models`)
  }

  evalDicom(modelId, studyId) {
    return this.http.get(`${this.baseUrl}/${modelId}/${studyId}`)
  }

  getImages() {
    return this.http.get(`${this.baseUrl}/images`)
  }

  registerModel(image: string, input: string, output: string) {
    return this.http.post(`${this.baseUrl}/register-model`, { image, input, output })
  }

  startJob({model, endTime}) {
    return this.http.post(`${this.baseUrl}/start-job`, {model, endTime})
  }

  getJobs() {
    return this.http.get(`${this.baseUrl}/eval-jobs`)
  }

  killJob(id: number) {
    return this.http.post(`${this.baseUrl}/kill-job`, {id})
  }

  getEvals(page: number, pageSize: number): Observable<{evals: any[], total: number}> {
    return this.http.get<{evals: any[], total: number}>(`${this.baseUrl}/evals`,
                                                        {params: {page:`${page}`, pageSize: `${pageSize}`}})
  }
}
