import {
  Component,
  OnInit,
  OnChanges,
  Input
} from '@angular/core';

import {MLModel} from '../common/models/mlmodel.model';
import {MLModelService} from '../common/services/mlmodels.service';
import {Store} from '@ngrx/store';
import {AppStore} from '../common/models/appstore.model';

import gql from 'graphql-tag';

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
  @Input() models: Observable<ModelClass[]>;

  coldStart: boolean;
  wizardStatus: boolean;

  posts: any = "Init"

  items: Observable<Array<MLModel>>;
  selectedItem: Observable<MLModel>;

  proceed(): void {
    this.showFirstRunWizard(this.coldStart);
  }

  showFirstRunWizard(inp_status: boolean): void {
    this.announceColdStart(inp_status);
    this.router.navigate(['/models']);
  }

  selectItem(item: MLModel) {
    this.store.dispatch({type: 'SELECT_MODEL', payload: item});
    this.router.navigate(['./models']);
  }

  constructor(
    private modelservice: ModelService,
    private mservice: MLModelService,
    private initservice: InitService,
    private router: Router,
    private reversePipe: ReversePipe,
    private apollo: Apollo,
    private store: Store<AppStore>
  ) {
    this.items = mservice.mlmodels;
    this.selectedItem = store.select('selectedModel');
    this.selectedItem.subscribe(v => console.log(v));
    mservice.loadModels();
  }

  announceColdStart(status: boolean) {
    this.initservice.announceColdStart(status);
  }

  createHiMessage() {
    console.log("Trying");
    this.apollo.mutate({
      mutation: gql`
        mutation ($title: String!, $content: String!) {
          addPost(title: $title, content:$content) {
            id
          }
        }
      `,
      variables: { title: "SANDESH", content: "con1111" }
    }).toPromise();
  }

  ngOnInit() {
    // let models: ModelClass[];
    this.apollo.watchQuery<initStatusQueryResponse>({
      query: initStatusQuery
    }).subscribe(({data}) => {
      this.coldStart = data["getInitStatus"].cold_start;
      // console.log(JSON.stringify(data));
      console.log("GOT IT" + data["getInitStatus"].cold_start);
      // return data.cold_start
    });

    this.mservice.loadModels();
    this.items = this.mservice.mlmodels;
    this.selectedItem = this.store.select('selectedModel');
    this.selectedItem.subscribe(v => console.log(v));
    // this.models = this.modelservice.models;
    // this.apollo.watchQuery<userModelsQueryResponse>({
    //   query: userModelsQuery
    // }).subscribe(({data}) => {
    //   this.models = data["getUserModels"];
    // });

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
    //   next: (data) => {
    //     const newData: ModelClass[] = data.getModelChanges;
    //
    //   }
    //   console.log("DASHBOARD UPDATE");
    //   console.log("CREATED: " + JSON.stringify(data.getModelChanges));
    //
    //   this.models = this.modelservice.models;
    //   // console.log
    //
    //   // console.log(this.models.push(obj));
    // });

    this.apollo.subscribe({
      query: gql`
        subscription {
          postAdded{
            content
          }
        }
      `
    }).subscribe((data) => {
        this.posts = data.postAdded.content;
    });
  }
}
