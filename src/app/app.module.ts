import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ClarityModule } from 'clarity-angular';

import { AppComponent } from './app.component';
import { ModelsComponent } from './models/models.component';
import { LogsComponent } from './logs/logs.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ModelsDetailComponent } from './models/models-detail/models-detail.component';

import { InitService } from './init.service';
import { ModelService } from './model-service.service';

@NgModule({
  declarations: [
    AppComponent,
    ModelsComponent,
    LogsComponent,
    DashboardComponent,
    ModelsDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ClarityModule.forRoot(),
    RouterModule.forRoot([
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'models',
        component: ModelsComponent
      },
      {
        path: 'models/:id',
        component: ModelsComponent,
      },
      {
        path: 'logs',
        component: LogsComponent
      },
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
    ])
  ],
  providers: [
    InitService,
    // ModelService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
