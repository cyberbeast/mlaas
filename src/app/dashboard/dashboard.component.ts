import { Component, OnInit } from '@angular/core';
import { ModelClass } from '../models/model-class';

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
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  models = DEMO_MODELS;

  constructor() { }

  ngOnInit() {
  }

}
