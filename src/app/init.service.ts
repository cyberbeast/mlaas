import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class InitService {
  private initUrl = 'http://localhost:3000/api/initStatus'

  constructor(private http: Http) { }

  getColdStartStatus(): Promise<boolean> {
    return this.http.get(this.initUrl)
                    .toPromise()
                    .then(response => response.json().data as boolean)
                    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error("An error occurred", error);
    return Promise.reject(error.message || error);
  }
}
