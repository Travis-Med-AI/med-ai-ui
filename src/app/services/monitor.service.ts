import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonitorService {
  baseUrl = 'http://localhost:8000/monitor';
  constructor(private http: HttpClient) { }

  getGpuInfo(): Observable<any> {
    return this.http.get(`${this.baseUrl}/gpu`)
  }
  getCpuInfo(): Observable<any> {
    return this.http.get(`${this.baseUrl}/cpu`)
  }
}
