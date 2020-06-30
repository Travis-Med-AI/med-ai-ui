import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ModelService {
  baseUrl = 'http://localhost:8000/models'

  constructor(private http: HttpClient) { }

  getModels() {
    return this.http.get(`${this.baseUrl}`)
  }

  getImages() {
    return this.http.get(`${this.baseUrl}/images`)
  }

  registerModel(image: string, input: string, output: string, hasImageOutput: boolean, modality: string) {
    return this.http.post(`${this.baseUrl}/register`, { image, input, output, hasImageOutput, modality })
  }

  setClassifier(image: string, modality: string) {
    return this.http.post(`${this.baseUrl}/classifier`, {image, modality})
  }

  getClassifiers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/classifiers`)
  }

}
