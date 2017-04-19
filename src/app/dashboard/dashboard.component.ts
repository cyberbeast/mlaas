import {
  Component,
  OnInit
} from '@angular/core';
import {
  ModelClass
} from '../models/model-class';
import {
  ModelService
} from '../model-service.service';
import {
  InitService
} from '../init.service';
import {
  Observable
} from 'rxjs/Rx';
import {
  Router
} from '@angular/router';
import {ReversePipe} from 'ngx-pipes/src/app/pipes/array/reverse';
import { Apollo } from 'apollo-angular';
import {
  initStatusQuery,
  initStatusQueryResponse
} from '../queries/initStatus';

import {
  userModelsQuery,
  userModelsQueryResponse
} from '../queries/userModels';


@Component({
  selector: 'app-dashboard',
  providers: [
    ModelService,
    ReversePipe
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  models: ModelClass[];
  coldStart: boolean;
  wizardStatus: boolean;

  proceed(): void {
    this.showFirstRunWizard(this.coldStart);
  }

  showFirstRunWizard(inp_status: boolean): void {
    this.announceColdStart(inp_status);
    this.router.navigate(['/models']);
  }


  constructor(
    private modelservice: ModelService,
    private initservice: InitService,
    private router: Router,
    private reversePipe: ReversePipe,
    private apollo: Apollo
  ) {}

  announceColdStart(status: boolean) {
    this.initservice.announceColdStart(status);
  }

  ngOnInit() {
    this.apollo.watchQuery<initStatusQueryResponse>({
      query: initStatusQuery
    }).subscribe(({data}) => {
      this.coldStart = data["getInitStatus"].cold_start;
      // console.log(JSON.stringify(data));
      // console.log("GOT IT" + data["getInitStatus"].cold_start);
      // return data.cold_start
    });

    this.apollo.watchQuery<userModelsQueryResponse>({
      query: userModelsQuery
    }).subscribe(({data}) => {
      this.models = data["getUserModels"];
    });
  }

}
