import { Component, OnInit } from '@angular/core';
import { ModelClass } from '../models/model-class';
import { ModelService } from '../model-service.service';

@Component({
  selector: 'app-dashboard',
  providers: [ModelService],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  models: ModelClass[];

  getModels(): void {
    this.modelservice.getModels().then(models_result => this.models = models_result);
  }

  constructor(private modelservice: ModelService) { }

  ngOnInit() {
    console.log("HERE");
    this.getModels();
  }

}
