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

  registerModel(image: string, input: string, output: string, hasImageOutput: boolean) {
    return this.http.post(`${this.baseUrl}/register`, { image, input, output, hasImageOutput })
  }

  setClassifier(image: string) {
    return this.http.post(`${this.baseUrl}/classifier`, {image})
  }

  getClassifier(): Observable<string> {
    return this.http.get(`${this.baseUrl}/classifier`).pipe(map((c:any) => c.image))
  }

}
