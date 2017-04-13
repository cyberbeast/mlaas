import { Component, OnInit, Input } from '@angular/core';
// import { ActivatedRoute, Params } from '@angular/router';
// import { Location } from '@angular/common';
// import 'rxjs/add/operator/switchMap';
import { ModelClass } from '../model-class';
import { PairsPipe } from 'ngx-pipes/src/app/pipes/object/pairs';
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
  @Input()
  model: ModelClass;

  constructor(
    private pairsPipe: PairsPipe,
  ) { }

  ngOnInit() {  }

}
