import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {urlsObject} from '../../config/urls';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

const initStatusQuery = gql`
  query initStatusQuery {
    getInitStatus {
      cold_start
    }
  }
`;

interface initStatusQueryResponse {
  cold_start
};

@Injectable()
export class InitService {
  private initUrl = urlsObject.apiUrl + urlsObject.api_initStatus;

  // Observable boolean sources
  public triggerColdStartSource: Subject<boolean> = new BehaviorSubject<boolean>(null);

  // Service message commands
  announceColdStart(status: boolean) {
    this.triggerColdStartSource.next(status);
  }


  constructor(private http: Http, private apollo: Apollo) { }

  getColdStartStatus(): Observable<boolean> {

    // this.apollo.watchQuery<initStatusQueryResponse>({
    //   query: initStatusQuery
    // }).subscribe(({data}) => {
    //   console.log("INIT: " + data);
    // }).then(console.log("f"));

    return this.http.get(this.initUrl)
                    .map((res:Response) => res.json());
  }

  private handleError(error: any): Promise<any> {
    console.error("An error occurred", error);
    return Promise.reject(error.message || error);
  }
}
