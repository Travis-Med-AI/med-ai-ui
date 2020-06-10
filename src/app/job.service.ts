import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http: HttpClient) { }

  baseUrl = 'http://localhost:8000/ai'

  getStudies(){
    return this.http.get(`${this.baseUrl}/studies`)
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

  getEvals() {
    return this.http.get(`${this.baseUrl}/evals`)
  }
}
