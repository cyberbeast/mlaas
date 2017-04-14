import { makeExecutableSchema } from 'graphql-tools';
import Resolvers from '../resolvers/resolvers';
import initStatusSchema from './initstatusmodel_schema';

// # supplier(name: String): Supplier

const RootQuery = `
  type RootQuery {
    getInitStatus: initStatus
  }
`;

const SchemaDefinition = `
  schema {
    query: RootQuery
  }
`;

export default makeExecutableSchema({
  typeDefs: [SchemaDefinition, RootQuery, initStatusSchema],
  resolvers: Resolvers
});
