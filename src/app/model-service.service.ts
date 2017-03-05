import { Injectable } from '@angular/core';
import { ModelClass } from './models/model-class';
import { DEMO_MODELS } from './mock-models';
import { urlsObject } from '../../config/urls';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ModelService {
  private getModelUrl = urlsObject.apiUrl + urlsObject.api_getModels;
  private addModelUrl = urlsObject.apiUrl + urlsObject.api_addNewModel;

  // Observable boolean sources
  // public mlModelsSource: Subject<ModelClass[]> = new BehaviorSubject<ModelClass[]>(null);

  // Service message commands
  // announceMlModels(models: ModelClass[]) {
    // this.mlModelsSource.next(models);
  // }

  getModels(): Observable<ModelClass[]> {
    console.log("CALLED HERE HERE HERE HERE...");
    return this.http.get(this.getModelUrl)
                    .map((res:Response) => res.json());
  }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }

  getModel(id: string): Observable<ModelClass> {
    return this.getModels().map(
      models => models.find(model => model._id === id)
    );
  }

  addNewModel(body: Object): Observable<string> {
    // newModel['_id'] = "";
    let bodyString = JSON.stringify(body); // Stringify payload 
    let headers    = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options    = new RequestOptions({ headers: headers });

    console.log("RECEIVED: " + bodyString);
    return this.http.post(this.addModelUrl, body, options)
                    .map((res:Response) => res.text());
  }

  constructor(private http: Http) { }

}
