import { Injectable, Inject } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';
import {
  ModelClass
} from './models/model-class';
import {Observable} from 'rxjs/Observable';
import {
  userModelsQuery,
  userModelsQueryResponse
} from './queries/userModels';

@Injectable()
export class ModelBackendService {

  constructor(
    private apollo: Apollo
  ) { }

  getAllModels() {
    this.apollo.watchQuery<userModelsQueryResponse>({
      query: userModelsQuery
    }).subscribe(({data}) => {
      console.log(data["getUserModels"]);
    });
  }

}
