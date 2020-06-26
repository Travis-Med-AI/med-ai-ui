import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class JobService {
  baseUrl = 'http://localhost:8000/jobs'


  constructor(private http: HttpClient) { }

  getJobs() {
    return this.http.get(`${this.baseUrl}`)
  }

  startJob(id: number) {
    return this.http.post(`${this.baseUrl}/start`, {id})
  }

  killJob(id: number) {
    return this.http.post(`${this.baseUrl}/kill`, {id})
  }
}
