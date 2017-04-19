import { makeExecutableSchema } from 'graphql-tools';
import Resolvers from '../resolvers/resolvers';
import initStatusSchema from './initstatusmodel_schema';
import mlModel from './mlmodel_schema';
import ModelLoss from './modelloss';
import ModelParameters from './modelparameters';
import ModelMetrics from './modelmetrics';

const RootQuery = `
  type RootQuery {
    hi: String
  }

  type Mutation {
    hi(name: String!): String
  }
`;

const SchemaDefinition = `
  schema {
    query: RootQuery
    mutation: Mutation
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
