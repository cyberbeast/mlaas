import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import { ActivatedRoute, Params } from '@angular/router';
// import { Location } from '@angular/common';
// import 'rxjs/add/operator/switchMap';
import { ModelClass } from '../model-class';
import { PairsPipe } from 'ngx-pipes/src/app/pipes/object/pairs';
import {MLModel} from '../../common/models/mlmodel.model';

// import { ValuesPipe } from 'ngx-pipes/src/app/pipes/object/values';

// import { ModelService } from '../../model-service.service';

@Component({
  selector: 'app-models-detail',
  templateUrl: './models-detail.component.html',
  styleUrls: ['./models-detail.component.css'],
  providers: [
    PairsPipe,
  ]
})

export class ModelsDetailComponent implements OnInit {
  // @Input()
  // model: ModelClass;

  originalName: string;
  selectedItem: MLModel;
  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();
  @Output() deleted = new EventEmitter();

  edit_mode: boolean = false;
  focusBool: boolean = true;
  progressBool: boolean = false;

  @Input() set item(value: MLModel){
    if (value) this.originalName = value.name;
    this.selectedItem = Object.assign({}, value);
  }

  constructor(
    private pairsPipe: PairsPipe,
  ) { }

  ngOnInit() {  }

}
