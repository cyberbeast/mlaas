import { initstatusmodel } from '../models/initstatusmodel';
const mlmodel = require('../models/mlmodel');
const ObjectId = require('mongoose').Types.ObjectId;

const resolvers = {
  RootQuery: {
    getInitStatus() {
      console.log('GET: \t [/initStatus] \t\t ' + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''));
      return {"cold_start": false};
      // return initstatusmodel.find({}).then((res) => res);
    },

    getUserModels() {
      console.log('GET: \t [/user_models] \t\t ' + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''));
      return mlmodel.find().then((res) => res);
    }
  }
};

export default resolvers
