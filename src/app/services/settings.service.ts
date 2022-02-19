import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  settings: any = {}

  constructor( private http: HttpClient ) {
  }

  getServerUrl () {
    return environment.API_URL
  }

  getOrthancUrl () {
    return environment.ORTHANC_URL
  }
}
