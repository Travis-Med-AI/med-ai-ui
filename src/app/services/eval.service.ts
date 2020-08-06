import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EvalService {
  baseUrl = 'http://localhost:8000/evals'


  constructor(private http: HttpClient) { }


  getEvals(page: number, pageSize: number, searchString: string): Observable<{evals: any[], total: number}> {
    return this.http.get<{evals: any[], total: number}>(`${this.baseUrl}`,
                                                        {params: {page:`${page}`, pageSize: `${pageSize}`, searchString}})
  }

  evalDicom(modelId, studyId) {
    return this.http.get(`${this.baseUrl}/${modelId}/${studyId}`)
  }

  deleteEval(evalId:number) {
    return this.http.delete(`${this.baseUrl}/${evalId}`)
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