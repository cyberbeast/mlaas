import {
  Component,
  OnInit,
  ViewChild,
  Input,
  OnDestroy,
  AfterViewInit
} from '@angular/core';
import gql from 'graphql-tag';

import {
  ActivatedRoute,
  Params,
  Router
} from '@angular/router';
import {
  Location
} from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { Subject } from 'rxjs/Subject';
import {
  Wizard
} from 'clarity-angular';
import {ReversePipe} from 'ngx-pipes/src/app/pipes/array/reverse';
import {
  ModelClass
} from './model-class';
import {
  ModelService
} from '../model-service.service';
import {
  Subscription,
  Observable
} from 'rxjs/Rx';
import {
  InitService
} from '../init.service';

import { Apollo } from 'apollo-angular';
import {
  userModelsQuery,
  userModelByIdQuery,
  createNewModelMutation,
  deleteModelByIdMutation,
  userModelsQueryResponse
} from '../queries/userModels';

import {MLModel} from '../common/models/mlmodel.model';
import {MLModelService} from '../common/services/mlmodels.service';
import {Store} from '@ngrx/store';
import {AppStore} from '../common/models/appstore.model';

@Component({
  selector: 'app-models',
  providers: [
    ModelService,
    ReversePipe
    ],
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.css']
})
export class ModelsComponent implements OnInit {
  @Input()
  showWizard_status: boolean;

  query_modelId: Subject<string> = new Subject<string>();

  // models: ModelClass[];
  models: Observable<ModelClass[]>;

  selectedModel: ModelClass;

  subscription: Subscription;

  items: Observable<Array<MLModel>>;
  selectedItem: Observable<MLModel>;

  constructor(
    private router: Router,
    private mservice: MLModelService,
    private store: Store<AppStore>,
    private modelservice: ModelService,
    private route: ActivatedRoute,
    private location: Location,
    private initService: InitService,
    private reversePipe: ReversePipe,
    private apollo: Apollo
  ) {
    // this.items = mservice.mlmodels;
    // this.selectedItem = store.select('selectedModel');
    // // this.selectedItem.subscribe(v => console.log(v));
    // mservice.loadModels();
  }

  createItem(item: MLModel) {
    // this.mservice.
  }

  selectItem(item: MLModel) {
    this.store.dispatch({type: 'SELECT_MODEL', payload: item});
  }

  deleteItem(item: MLModel) {
    this.mservice.deleteModel(item);
    this.selectItem(this.items[0]);

    // Generally, we would want to wait for the result of `itemsService.deleteItem`
    // before resetting the current item.
    // this.resetItem();
  }


  getModels(): void {
    // this.modelservice.getModels().subscribe(
    //     models_result => {
    //       this.models = models_result;
    //       // console.log("THIS ONE...");
    //       // console.log(JSON.stringify(this.models));
    //     }
    //   );
    this.apollo.watchQuery<userModelsQueryResponse>({
      query: userModelsQuery
    }).subscribe(({data}) => {
      this.models = data["getUserModels"];
    });



    // return "done".toPromise();
  }

  gotoDetail(selectedModelIP: ModelClass): void {
    this.router.navigate(['models', selectedModelIP._id]);
  }

  @ViewChild("wizard") wizard: Wizard;
  open: boolean = false; // you can open the wizard by setting this variable to true
  closable: boolean = true;


  wizardCommitBool: boolean = false;

  // Wizard methods
  onCancel(): void {
    if (this.wizardCommitBool == false){
      alert('Are you sure you want to cancel and abandon changes?');
      this.router.navigate(['']);
    }
  }

  deleteModel(id: string): void{
    console.log("Deleting: " + id);
    this.apollo.mutate({
      mutation: deleteModelByIdMutation,
      variables: {
        id: id
      }
    }).subscribe(({data}) => {
      console.log("Delete Mutation Reponse: " + JSON.stringify(data));
    });
    console.log("SWITCHING TO: " + JSON.stringify(this.models));
    this.gotoDetail(this.models[1]);
  }

  onCommit(b: boolean): void {
    this.wizardCommitBool = b;
    if (this.wizardCommitBool == true){
      console.log("SUBMITTING: " + JSON.stringify(this.temp_new_ml_model));
      this.modelservice.createNewModel(this.temp_new_ml_model);
      // this.gotoDetail(this.models[0]);
      // this.modelservice.addNewModel(this.temp_new_ml_model).subscribe(res => console.log(res), err => console.log("ERROR") ,() => this.getModels());
      // this.models.push(this.temp_new_ml_model);
    }
  }


  ngOnInit() {



    console.log("HEREHERHEHREHRE");
    // this.mservice.loadModels();
    this.items = this.mservice.mlmodels;
    this.selectedItem = this.store.select('selectedModel');
    // this.selectedItem.subscribe(v => console.log(v));
    // this.getModels();

    // this.models = this.modelservice.models;
    //
    //
    //
    // this.apollo.watchQuery<userModelsQueryResponse>({
    //   query: userModelByIdQuery,
    //   variables: {
    //     modelid: this.query_modelId
    //   }
    // }).subscribe(({data}) => {
    //   console.log("First fetch after init");
    //   console.log(JSON.stringify(data));
    //   this.selectedModel = data["getUserModelById"];
    // });


      // .switchMap((params: Params) => this.models.find(model => model._id === params['id']))
      // modelservice.getModel(params['id']))
      // .subscribe(model_ret => {
        // this.selectedModel = model_ret;
        // console.log(JSON.stringify(this.selectedModel));
      // });
  }

  // ngOnChanges(): void {
  //       this.models = this.modelservice.models;
  // }


  ngAfterViewInit() {
    this.initService.triggerColdStartSource.subscribe((status) => {
      if (status == true) {
        this.open = status;
        this.closable = false;
      } else {
        this.open = false;
        this.closable = true;
      }
    });

    // this.route.params.subscribe(params => {
    //   if (params["id"] == null) {
    //     console.log("LOLOL");
    //     console.log(this.models);
    //     // this.gotoDetail(this.models[0]);
    //   }
    //   else {
    //     console.log("Requesting model info for: " + params["id"]);
    //     this.query_modelId.next(params["id"]);
    //   }
    //   // this.selectedModel = this.getModels().then(() => { this.models.find(model => model._id === params['id']);})
    // });
  }

  modelType: Array < Object > = [{
      num: 0,
      name: "Linear Regression"
    },
    // {
    //   num: 1,
    //   name: "SVM"
    // }
  ];

  getTypeParameters() {
    console.log("Fetching related parameters...");
  }

  temp_new_ml_model = {
    name: "",
    description: "",
    type: "",
    parameters: {
      alpha: ""
    }
  };
}
