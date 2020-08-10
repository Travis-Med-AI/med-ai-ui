import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GpuInfoViewModel, CpuInfoViewModel } from 'med-ai-common';

@Injectable({
  providedIn: 'root'
})
export class MonitorService {
  baseUrl = 'http://localhost:8000/monitor';
  constructor(private http: HttpClient) { }

  getGpuInfo(): Observable<GpuInfoViewModel> {
    return this.http.get<GpuInfoViewModel>(`${this.baseUrl}/gpu`)
  }
  getCpuInfo(): Observable<CpuInfoViewModel> {
    return this.http.get<CpuInfoViewModel>(`${this.baseUrl}/cpu`)
  }
}
