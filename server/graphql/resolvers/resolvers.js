import { initstatusmodel } from '../models/initstatusmodel';
const mlmodel = require('../models/mlmodel');
const ObjectId = require('mongoose').Types.ObjectId;
import { pubsub } from '../../../server';

var res = "unset";

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
    // hi(_, args) {
    //   console.log("REQUEST REC");
    //   pubsub.publish('hi_s', args.name);
    //   return ("hi " + args.name);
    // },

    addPost(root, {
      title,
      content
    }, context) {
      // if (!context.user) {
      //   throw new Error('Must be logged in to submit a comment.');
      // }
      // return a value or a Promise
      var post = {"id":1, "title":title, "content": content};
      pubsub.publish('postAdded', post);
      return post;
    },

    createNewModel(_, args) {
      console.log('[/new_model] \t\t ' + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''));
      console.log(args);
      var newMlModel = mlmodel(args.newModel);

      newMlModel.save(function(err, mongomodel) {
        if (err) {
          console.log(err);
          return false;
        } else {
          console.log('\t ---→ Created \n', JSON.stringify(mongomodel));
          pubsub.publish('getModelChanges', {});
          return true;
        }
      });
    },

    deleteModelById(_, args) {
      console.log('[/delete_model] \t\t ' + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''));
      console.log("ID:" + args.id);

      mlmodel.findByIdAndRemove(args.id, function(err){
        if (err){
          console.log(err)
          return false;
        }
        else {
          pubsub.publish('getModelChanges', {});
          return true;
        }

        // return this.res;
      });

      return true
    }
  },
  Subscription: {
    postAdded(post) {
  // the subscription payload is the comment.
      return post;
    },

    getModelChanges() {
      console.log(mlmodel.find().sort({updated_at: -1}).then((res) => res));
      return mlmodel.find().sort({updated_at: -1}).then((res) => res);
      // return model
    }
  },
};

export default resolvers
