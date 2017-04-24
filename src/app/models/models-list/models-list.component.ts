import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {MLModel} from '../../common/models/mlmodel.model';


@Component({
  selector: 'app-models-list',
  templateUrl: './models-list.component.html',
  styleUrls: ['./models-list.component.css']
})
export class ModelsListComponent implements OnInit {
  @Input() items: MLModel[];
  @Output() selected = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
