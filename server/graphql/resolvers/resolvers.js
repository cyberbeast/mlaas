// var GraphQLDate = require('graphql-date');
import initstatusmodel from '../models/initstatusmodel';
const ObjectId = require('mongoose').Types.ObjectId;

const resolvers = {
  RootQuery: {
    getInitStatus() {
      console.log('GET: \t [/initStatus] \t\t ' + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''));
      return {"cold_start": false};
      // return initstatusmodel.find({}).then((res) => false);
    }
  }
};

export default resolvers
