import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { ModelClass } from '../model-class';

@Component({
  selector: 'app-models-detail',
  templateUrl: './models-detail.component.html',
  styleUrls: ['./models-detail.component.css']
})
export class ModelsDetailComponent implements OnInit {
  @Input()
  model: ModelClass;

  constructor(
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    // this.route.params
    // .switchMap((params: Params) => this.heroService.getHero(+params['id']))
  }

}
