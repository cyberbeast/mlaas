// import {Http, Headers} from '@angular/http';

import gql from 'graphql-tag';
import { Apollo, ApolloQueryObservable } from 'apollo-angular';

import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import {Subscription} from 'rxjs/Subscription';

import {AppStore} from '../models/appstore.model';
import {MLModel} from '../models/mlmodel.model';

import {
  userModelsQuery,
  createNewModelMutation,
  deleteModelByIdMutation,
  userModelsQueryResponse
} from '../../queries/userModels';

@Injectable()
export class MLModelService {
  mlmodels: Observable<Array<MLModel>>;
  private entryObs: ApolloQueryObservable<any>;
  private entrySub: Subscription;

  constructor(private apollo: Apollo, private store: Store<AppStore>) {
    this.mlmodels = store.select('mlmodels');
  }

  loadModels() {
    // Fetch
    this.entryObs = this.apollo.watchQuery<userModelsQueryResponse>({
      query: userModelsQuery
    })

    // Subscribe
    this.entrySub = this.entryObs.subscribe(({data}) => {
      this.store.dispatch({
        type: 'ADD_MODEL',
        payload: data["getUserModels"]
      });
    });

    this.apollo.subscribe({
      query: gql`
        subscription {
          getModelChanges{
            _id
            name
            type
            train_status
            deploy_status
            data_path
            description
            created_at
            updated_at
          }
        }
      `
    }).subscribe({
      next: (data) => {
        console.log("NEW ngrx update");
        const newData: MLModel = data.getModelChanges;
        this.entryObs.updateQuery((previousResult) => pushNewModel<Object>(previousResult, newData));
      },
      error(err: any): void {
        console.error('err', err);
      }
    });
  }

// UNCOMMENT FOR FUNCTIONALITY
  // saveItem(item: Item) {
  //   (item.id) ? this.updateItem(item) : this.createItem(item);
  // }
  //
  // createItem(item: Item) {
  //   this.http.post(`${BASE_URL}`, JSON.stringify(item), HEADER)
  //     .map(res => res.json())
  //     .map(payload => ({ type: 'CREATE_ITEM', payload }))
  //     .subscribe(action => this.store.dispatch(action));
  // }
  //
  // updateItem(item: Item) {
  //   this.http.put(`${BASE_URL}${item.id}`, JSON.stringify(item), HEADER)
  //     .subscribe(action => this.store.dispatch({ type: 'UPDATE_ITEM', payload: item }));
  // }
  //
  deleteModel(item: MLModel) {
    this.apollo.mutate({
      mutation: deleteModelByIdMutation,
      variables: {
        id: item._id
      }
    }).subscribe(({data}) => {
      // this.store.dispatch({
      //   type: 'DELETE_MODEL',
      //   payload: item
      // })
      console.log("Delete Mutation Reponse: " + JSON.stringify(data));
      // this.mlmodels.subscribe(v => console.log(v));
    });


    // this.http.delete(`${BASE_URL}${item.id}`)
      // .subscribe(action => this.store.dispatch({ type: 'DELETE_ITEM', payload: item }));
  }

  createModel(item: MLModel){
    this.apollo.mutate({
      mutation: createNewModelMutation,
      variables: {
        model: item
      }
    }).subscribe(({data}) => {
      console.log('Mutation Response: ' + JSON.stringify(data));
      // this.getModels();
      this.store.dispatch({
        type: 'CREATE_MODEL',
        payload: item
      })
    });
  }

}

function isDuplicateModel(newModel: MLModel, existingModels: MLModel[]): boolean {
  return newModel._id !== null && existingModels.some(model => newModel._id === model._id);
}

function pushNewModel<T>(prev: any, newModel: MLModel): T {
  // if (isDuplicateModel(newModel, prev.getUserModels)) {
  //   return prev;
  // }

  return Object.assign({}, prev, {
    getUserModels: [newModel, ...prev.getUserModels]
  });

  // return Object.assign({}, prev, {
  //   getUserModels:
  // })
}
