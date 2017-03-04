import { Injectable } from '@angular/core';
import { ModelClass } from './models/model-class';
import { DEMO_MODELS } from './mock-models';
import { urlsObject } from '../../config/urls';

@Injectable()
export class ModelService {
  private addModelUrl = urlsObject.api_addNewModel;

  getModels(): Promise<ModelClass[]> {
    return Promise.resolve(DEMO_MODELS);
  }

  getModel(id: string): Promise<ModelClass> {
    return this.getModels().then(models => models.find(model => model._id === id));
  }

  // addNewModel(): Promise<string> {

  // }

  constructor() { }

}
