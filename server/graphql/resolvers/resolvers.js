import { initstatusmodel } from '../models/initstatusmodel';
const mlmodel = require('../models/mlmodel');
const ObjectId = require('mongoose').Types.ObjectId;

const resolvers = {
  RootQuery: {
    hi() {
      return "hi";
    },

    getInitStatus() {
      console.log('GET: \t [/initStatus] \t\t ' + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''));
      return {"cold_start": false};
      // return initstatusmodel.find({}).then((res) => res);
    },

    getUserModels() {
      console.log('GET: \t [/user_models] \t\t ' + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''));
      return mlmodel.find().sort({updated_at: -1}).then((res) => res);
    },

    getUserModelById(_, args) {
      return mlmodel.findById(args.id).then(res => res);
    }
  },
  Mutation: {
    hi(_, args) {
      return "hi " + args.name;
    },

    createNewModel(_, args) {
      console.log('POST: \t [/new_model] \t\t ' + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''));
      console.log(args);
      var newMlModel = mlmodel(args.newModel);

      newMlModel.save(function(err) {
        if (err) {
          console.log(err);
          return "error";
        } else {
          console.log('\t ----→ Created');
          return "success";
        }
      });
    }
  }
};

export default resolvers
