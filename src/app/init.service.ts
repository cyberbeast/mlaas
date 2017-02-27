import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class InitService {
  private initUrl = 'http://localhost:3000/api/initStatus';
  
  // Observable boolean sources
  public triggerColdStartSource: Subject<boolean> = new BehaviorSubject<boolean>(null);

  // Service message commands
  announceColdStart(status: boolean) {
    this.triggerColdStartSource.next(status);
  }


  constructor(private http: Http) { }

  getColdStartStatus(): Observable<boolean> {
    return this.http.get(this.initUrl)
                    .map((res:Response) => res.json());
  }

  private handleError(error: any): Promise<any> {
    console.error("An error occurred", error);
    return Promise.reject(error.message || error);
  }
}
