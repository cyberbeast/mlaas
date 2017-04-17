import { makeExecutableSchema } from 'graphql-tools';
import Resolvers from '../resolvers/resolvers';
import initStatusSchema from './initstatusmodel_schema';
import mlModel from './mlmodel_schema';
import ModelLoss from './modelloss';
import ModelParameters from './modelparameters';
import ModelMetrics from './modelmetrics';

const RootQuery = `
  type RootQuery {
    getInitStatus: initStatus
    getUserModels: [mlModel]
  }
`;

const SchemaDefinition = `
  schema {
    query: RootQuery
  }
`;

export default makeExecutableSchema({
  typeDefs: [
    SchemaDefinition,
    RootQuery,
    initStatusSchema,
    mlModel,
    ModelLoss,
    ModelParameters,
    ModelMetrics
  ],
  resolvers: Resolvers
});
