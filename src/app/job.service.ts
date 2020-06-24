import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { saveAs } from 'file-saver';
// import { Repon } from '@angular/http';


@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private http: HttpClient) { }

  baseUrl = 'http://localhost:8000/ai'

  getStudies(page: number, pageSize: number, searchString: string): Observable<{studies: any[], total: number}>{
    return this.http.get<{studies: any[], total: number}>(`${this.baseUrl}/studies`,
                         {params: {page:`${page}`, pageSize: `${pageSize}`, searchString}})
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

  registerModel(image: string, input: string, output: string, hasImageOutput: boolean) {
    return this.http.post(`${this.baseUrl}/register-model`, { image, input, output, hasImageOutput })
  }

  startJob(id) {
    return this.http.post(`${this.baseUrl}/start-job`, {id})
  }

  getJobs() {
    return this.http.get(`${this.baseUrl}/eval-jobs`)
  }

  killJob(id: number) {
    return this.http.post(`${this.baseUrl}/kill-job`, {id})
  }

  getEvals(page: number, pageSize: number, searchString: string): Observable<{evals: any[], total: number}> {
    return this.http.get<{evals: any[], total: number}>(`${this.baseUrl}/evals`,
                                                        {params: {page:`${page}`, pageSize: `${pageSize}`, searchString}})
  }

  setClassifier(image: string) {
    return this.http.post(`${this.baseUrl}/set-classifier`, {image})
  }

  getClassifier(): Observable<string> {
    return this.http.get(`${this.baseUrl}/classifier`).pipe(map((c:any) => c.image))
  }

  countOrthancStudies(): Observable<number> {
    return this.http.get(`${this.baseUrl}/orthanc-count`).pipe(map((s:any) => s.count))
  }

  getOutputImage(evalId: number) {
    this.http
    .get(`${this.baseUrl}/output-image?evalId=${evalId}`, { responseType: 'arraybuffer' }) //set response Type properly (it is not part of headers)
    .toPromise()
    .then(data => {
        // may be you need to use data._body to get data of body
        var blob = new Blob([data], { type: 'image/jpeg' });
        var url = window.URL.createObjectURL(blob);
        window.open(url);
    })
    .catch(err => console.error("download error = ", err))
  }
}
