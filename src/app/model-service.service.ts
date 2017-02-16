import { Injectable } from '@angular/core';
import { ModelClass } from './models/model-class';
import { DEMO_MODELS } from './mock-models';

@Injectable()
export class ModelService {

  getModels(): Promise<ModelClass[]> {
    return Promise.resolve(DEMO_MODELS);
  }

  getModel(id: string): Promise<ModelClass> {
    return this.getModels().then(models => models.find(model => model._id === id));
  }

  constructor() { }

}
