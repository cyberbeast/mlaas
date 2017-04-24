import { Injectable } from '@angular/core';
// import { DEMO_MODELS } from './mock-models';

import { urlsObject } from '../../config/urls';
import { Observable } from 'rxjs/Rx';
// import {asObservable} from "./asObservable";
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';

import {
  ModelClass
} from './models/model-class';

import {
  userModelsQuery,
  userModelsQueryResponse,
  createNewModelMutation
} from './queries/userModels';

@Injectable()
export class ModelService {
  private _models: BehaviorSubject<ModelClass[]>;

  constructor(private apollo: Apollo) {
    this.loadInitialData();
    this.monitorData();
    // this.dataStore = {
    //   models: []
    // };
    this._models = <BehaviorSubject<ModelClass[]>>new BehaviorSubject([]);
  }

  get models() {
    return this._models.asObservable();
  }

  monitorData() {
    // this.apollo.subscribe({
    //   query: gql`
    //     subscription {
    //       getModelChanges{
    //         _id
    //         name
    //         type
    //         train_status
    //         deploy_status
    //         data_path
    //         description
    //         created_at
    //         updated_at
    //       }
    //     }
    //   `
    // }).subscribe((data) => {
    //   console.log("UPDATE FIRED")
    //   this._models.next(data.getModelChanges);
    // })
  }

  loadInitialData() {
    this.apollo.watchQuery<userModelsQueryResponse>({
      query: userModelsQuery
    }).subscribe(({data}) => {
      this._models.next(data["getUserModels"]);
    });
  }

  createNewModel(temp: any){
    this.apollo.mutate({
      mutation: createNewModelMutation,
      variables: {
        model: temp
      }
    }).subscribe(({data}) => {
      console.log('Mutation Response: ' + JSON.stringify(data));
      // this.getModels();
      this.loadInitialData();
    });
  }

  private getModelUrl = urlsObject.apiUrl + urlsObject.api_getModels;
  private addModelUrl = urlsObject.apiUrl + urlsObject.api_addNewModel;

  // Observable boolean sources
  // public mlModelsSource: Subject<ModelClass[]> = new BehaviorSubject<ModelClass[]>(null);

  // Service message commands
  // announceMlModels(models: ModelClass[]) {
    // this.mlModelsSource.next(models);
  // }
  //
  // getModels(): Observable<ModelClass[]> {
  //   console.log("CALLED HERE HERE HERE HERE...");
  //   return this.http.get(this.getModelUrl)
  //                   .map((res:Response) => res.json());
  // }

  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }

  // getModel(id: string): Observable<ModelClass> {
  //   return this.getModels().map(
  //     models => models.find(model => model._id === id)
  //   );
  // }
  //
  // addNewModel(body: Object): Observable<string> {
  //   // newModel['_id'] = "";
  //   let bodyString = JSON.stringify(body); // Stringify payload
  //   let headers    = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
  //   let options    = new RequestOptions({ headers: headers });
  //
  //   console.log("RECEIVED: " + bodyString);
  //   return this.http.post(this.addModelUrl, body, options)
  //                   .map((res:Response) => res.text());
  // }



}
