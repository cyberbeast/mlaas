import {
  Component,
  OnInit
} from '@angular/core';
import {
  ModelClass
} from '../models/model-class';
import {
  ModelService
} from '../model-service.service';
import {
  InitService
} from '../init.service';
import {
  Observable
} from 'rxjs/Rx';
import {
  Router
} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  providers: [
    ModelService,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  models: ModelClass[];
  coldStart: boolean;
  wizardStatus: boolean;

  getModels(): void {
    this.modelservice.getModels().then(models_result => this.models = models_result);
  }

  getInitStatus(): void {
    this.initservice.getColdStartStatus()
      .subscribe(
        status => {
          if (status == true) {
            this.coldStart = status;
            this.announceColdStart(status);
          }
        },
        err => {
          console.log(err);
        }
      );
  }

  proceed(): void {
    this.showFirstRunWizard(this.coldStart);
  }

  showFirstRunWizard(inp_status: boolean): void {
    this.announceColdStart(inp_status);
    this.router.navigate(['/models']);
  }


  constructor(
    private modelservice: ModelService,
    private initservice: InitService,
    private router: Router,
  ) {}

  announceColdStart(status: boolean) {
    this.initservice.announceColdStart(status);
  }

  ngOnInit() {
    this.getInitStatus();
    this.getModels();
  }

}

