import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.css']
})
export class ModelsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  models: any[] = [
    {
      name: "Water Heater",
      active: true
    },
    {
      name: "IOT Swarm",
      active: false
    },
    {
      name: "Thermostat Model",
      active: false
    },
    {
      name: "Door Camera",
      active: false
    },
  ];

}
