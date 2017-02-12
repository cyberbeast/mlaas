import { Component, OnInit, ViewChild } from '@angular/core';
import { Wizard } from 'clarity-angular';

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.css']
})
export class ModelsComponent implements OnInit {
  @ViewChild("wizard") wizard: Wizard;
    open: boolean = false; // you can open the wizard by setting this variable to true

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
