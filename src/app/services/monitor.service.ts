import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GpuInfoViewModel, CpuInfoViewModel } from 'med-ai-common';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class MonitorService {
  baseUrl = `${this.settingsService.getServerUrl()}/monitor`;
  constructor(private http: HttpClient, private settingsService: SettingsService) { }

  getGpuInfo(): Observable<GpuInfoViewModel> {
    return this.http.get<GpuInfoViewModel>(`${this.baseUrl}/gpu`)
  }
  getCpuInfo(): Observable<CpuInfoViewModel> {
    return this.http.get<CpuInfoViewModel>(`${this.baseUrl}/cpu`)
  }
}
