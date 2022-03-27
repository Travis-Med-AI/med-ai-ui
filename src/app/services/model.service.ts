import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ModelViewModel, ModelManifestItem, ClassifierViewModel, Modality } from 'med-ai-common';
import { SettingsService } from './settings.service';


@Injectable({
  providedIn: 'root'
})
export class ModelService {
  baseUrl = `${this.settingsService.getServerUrl()}/models`

  constructor(private http: HttpClient, private settingsService: SettingsService) { }

  getModels(): Observable<ModelViewModel[]> {
    return this.http.get<ModelViewModel[]>(`${this.baseUrl}`)
  }

  getImages(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/images`)
  }

  registerModel(manifestItem: ModelManifestItem): Observable<ModelViewModel> {
    return this.http.post<ModelViewModel>(`${this.baseUrl}/register`, manifestItem)
  }

  retryModel(image: string): Observable<ModelViewModel> {
    return this.http.post<ModelViewModel>(`${this.baseUrl}/retry`, {image})
  }

  setClassifier(image: string, modality: string): Observable<ModelViewModel> {
    return this.http.post<ModelViewModel>(`${this.baseUrl}/classifier`, {image, modality})
  }

  getClassifiers(): Observable<ClassifierViewModel[]> {
    return this.http.get<ClassifierViewModel[]>(`${this.baseUrl}/classifiers`)
  }

  getAvailableModels(): Observable<ModelManifestItem[]> {
    return this.http.get<ModelManifestItem[]>(`${this.baseUrl}/available`)
  }

  deleteModel(modelId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${modelId}`)
  }

  setModality(modelId: number, modality: Modality): Observable<ModelViewModel> {
    return this.http.post<ModelViewModel>(`${this.baseUrl}/modality`, {modelId, modality})
  }

}
