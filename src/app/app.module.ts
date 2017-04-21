import {
  BrowserModule,
} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NgModule
} from '@angular/core';
import {
  FormsModule
} from '@angular/forms';
import {
  HttpModule
} from '@angular/http';
import {
  RouterModule
} from '@angular/router';

import {
  ClarityModule
} from 'clarity-angular';

import {FocusModule} from 'angular2-focus';

import {NgPipesModule} from 'ngx-pipes';

import { ApolloClient, createNetworkInterface } from 'apollo-client';
import { ApolloModule } from 'apollo-angular';

import {
  AppComponent
} from './app.component';
import {
  ModelsComponent
} from './models/models.component';
import {
  LogsComponent
} from './logs/logs.component';
import {
  DashboardComponent
} from './dashboard/dashboard.component';
import {
  ModelsDetailComponent
} from './models/models-detail/models-detail.component';

import {
  InitService
} from './init.service';
import {
  ModelService
} from './model-service.service';

import { provideClient } from './apollo';

// by default, this client will send queries to `/graphql` (relative to the URL of your app)
// const client = new ApolloClient({
//   networkInterface: createNetworkInterface({
//     uri: 'http://localhost:3000/api/graphql',
//     opts: {
//       credentials: 'same-origin',
//     },
//   }),
// });
//
// export function provideClient(): ApolloClient {
//   return client;
// }

@NgModule({
  declarations: [
    AppComponent,
    ModelsComponent,
    LogsComponent,
    DashboardComponent,
    ModelsDetailComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ApolloModule.forRoot(provideClient),
    FormsModule,
    HttpModule,
    NgPipesModule,
    ClarityModule.forRoot(),
    FocusModule.forRoot(),
    RouterModule.forRoot([{
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
export class AppModule {}
