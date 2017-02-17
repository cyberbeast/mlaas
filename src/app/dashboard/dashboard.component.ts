import { Component, OnInit } from '@angular/core';
import { ModelClass } from '../models/model-class';
import { ModelService } from '../model-service.service';
import { InitService } from '../init.service';

@Component({
  selector: 'app-dashboard',
  providers: [
    ModelService,
    // InitService,
    ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  models: ModelClass[];
  coldStart: boolean;

  getModels(): void {
    this.modelservice.getModels().then(models_result => this.models = models_result);
  }

  getInitStatus(): void {
    this.initservice.getColdStartStatus().then(coldstart_status => {this.coldStart = coldstart_status;
    console.log(JSON.stringify(coldstart_status));
    });
  }

  constructor(
    private modelservice: ModelService,
    private initservice: InitService,
    ) { }

  ngOnInit() {
    this.getInitStatus();
    this.getModels();
  }

}
