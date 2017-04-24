import {MLModel} from './mlmodel.model';

export interface AppStore {
  mlmodels: MLModel[];
  selectedModel: MLModel;
  // widgets: Widget[];
  // selectedWidget: Widget;
};
