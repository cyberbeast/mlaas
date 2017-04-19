import {
  Component,
  OnInit,
  ViewChild,
  Input,
  OnDestroy,
  AfterViewInit
} from '@angular/core';
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
  Subscription
} from 'rxjs/Rx';
import {
  InitService
} from '../init.service';

import { Apollo } from 'apollo-angular';
import {
  userModelsQuery,
  userModelByIdQuery,
  createNewModelMutation,
  userModelsQueryResponse
} from '../queries/userModels';

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

  models: ModelClass[];
  selectedModel: ModelClass;

  subscription: Subscription;


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
  edit_mode: boolean = false;
  focusBool: boolean = true;

  wizardCommitBool: boolean = false;

  progressBool: boolean = false;

  // Wizard methods
  onCancel(): void {
    if (this.wizardCommitBool == false){
      alert('Are you sure you want to cancel and abandon changes?');
      this.router.navigate(['']);
    }
  }

  onCommit(b: boolean): void {
    this.wizardCommitBool = b;
    if (this.wizardCommitBool == true){
      console.log("SUBMITTING: " + JSON.stringify(this.temp_new_ml_model));
      this.apollo.mutate({
        mutation: createNewModelMutation,
        variables: {
          model: this.temp_new_ml_model
        }
      }).subscribe(({data}) => {
        console.log('Mutation Response: ' + JSON.stringify(data);
        this.getModels();
      });
      // this.modelservice.addNewModel(this.temp_new_ml_model).subscribe(res => console.log(res), err => console.log("ERROR") ,() => this.getModels());
      // this.models.push(this.temp_new_ml_model);
    }
  }

  constructor(
    private router: Router,
    private modelservice: ModelService,
    private route: ActivatedRoute,
    private location: Location,
    private initService: InitService,
    private reversePipe: ReversePipe,
    private apollo: Apollo
  ) {}

  ngOnInit() {
    this.getModels();
    this.apollo.watchQuery<userModelsQueryResponse>({
      query: userModelByIdQuery,
      variables: {
        modelid: this.query_modelId
      }
    }).subscribe(({data}) => {
      this.selectedModel = data["getUserModelById"];
    });;
    this.route.params.subscribe(params => {
      console.log("Requesting model info for: " + params["id"]);
      this.query_modelId.next(params["id"]);
      // this.selectedModel = this.getModels().then(() => { this.models.find(model => model._id === params['id']);})
    });
      // .switchMap((params: Params) => this.models.find(model => model._id === params['id']))
      // modelservice.getModel(params['id']))
      // .subscribe(model_ret => {
        // this.selectedModel = model_ret;
        // console.log(JSON.stringify(this.selectedModel));
      // });
  }

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
