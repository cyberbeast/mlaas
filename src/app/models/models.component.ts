import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ActivatedRoute, Params , Router} from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { Wizard } from 'clarity-angular';
import { ModelClass } from './model-class';
import { ModelService } from '../model-service.service';

@Component({
  selector: 'app-models',
  providers: [ModelService],
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.css']
})
export class ModelsComponent implements OnInit {
  models: ModelClass[];
  selectedModel: ModelClass;

  getModels(): void {
    this.modelservice.getModels().then(models_result => this.models = models_result);
  }
  
  gotoDetail(selectedModelIP: ModelClass): void {
    this.router.navigate(['models', selectedModelIP._id])
  }

  @ViewChild("wizard") wizard: Wizard;
  open: boolean = false; // you can open the wizard by setting this variable to true

  constructor(
    private router: Router,
    private modelservice: ModelService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.getModels();
    this.route.params
    .switchMap((params: Params) => this.modelservice.getModel(params['id']))
    .subscribe(model_ret => this.selectedModel = model_ret);
  }
}
