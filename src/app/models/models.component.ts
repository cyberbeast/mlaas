import { Component, OnInit, ViewChild } from '@angular/core';
import { Wizard } from 'clarity-angular';
import { ModelClass } from './model-class';

const DEMO_MODELS: ModelClass[] = [
  { _id: "OISAJFKALJS",
    name: "Water Heater",
    type: "Linear Regression",
    parameters: "a=0.05",
    train_status: "Trained",
    deploy_status: "OFFLINE",
    test_accuracy: "88%",
    created_at: 2017,
    updated_at: 2017},
    { _id: "OISAJFKALSD",
    name: "IoT Swarm",
    type: "SVM",
    parameters: "a=0.05",
    train_status: "Trained",
    deploy_status: "OFFLINE",
    test_accuracy: "88%",
    created_at: 2017,
    updated_at: 2017},
    { _id: "OISAJFKALFD",
    name: "Thermostat Model",
    type: "Linear Regression",
    parameters: "a=0.05",
    train_status: "Trained",
    deploy_status: "OFFLINE",
    test_accuracy: "88%",
    created_at: 2017,
    updated_at: 2017},
]

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.css']
})
export class ModelsComponent implements OnInit {
  models = DEMO_MODELS;

  selectedModel: ModelClass;
  
  onSelect(model: ModelClass): void {
    this.selectedModel = model;
  }

  @ViewChild("wizard") wizard: Wizard;
    open: boolean = false; // you can open the wizard by setting this variable to true

  constructor() { }

  ngOnInit() {
  }
  // models: any[] = [
  //   {
  //     name: "Water Heater",
  //     active: true
  //   },
  //   {
  //     name: "IOT Swarm",
  //     active: false
  //   },
  //   {
  //     name: "Thermostat Model",
  //     active: false
  //   },
  //   {
  //     name: "Door Camera",
  //     active: false
  //   },
  // ];

}
