const express = require('express');
import bodyParser from 'body-parser';
import {
  graphqlExpress,
  graphiqlExpress
} from 'graphql-server-express';
import Schema from '../graphql/schema/schema';
const mongoose = require('mongoose');
const mlmodel = require('../graphql/models/mlmodel');
const initstatus = require('../graphql/models/initstatusmodel');
const ObjectId = require('mongoose').Types.ObjectId;
const config = require('../config.json');
var cors = require('cors');
import { pubsub } from '../../server';

var whitelist = [
    'http://localhost:3000',
    'http://localhost:4200'
];
var corsOptions = {
    origin: function(origin, callback){
        var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
        callback(null, originIsWhitelisted);
    },
    credentials: true
};


const router = express.Router();
router.use(cors(corsOptions));

router.use('/graphql', bodyParser.json(), graphqlExpress({
  schema: Schema
}));

router.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
  subscriptionsEndpoint: `ws://localhost:3000/subscriptions`,
}));

// FOR DEVELOPMENT PURPOSES ONLY! COMMENT FOR PRODUCTION!
router.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Connect to database
mongoose.connect(config.DB_URI);
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


// GET api listing
router.get('/', (req, res) => {
  res.send('api works');
});

// GET api for downloading the learned model
router.get('/download', (req, res) => {
  console.log('GET: \t [/download] \t\t ' + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''));
  console.log(req.query.id);
  mlmodel.findById(req.query.id, function(err, model){
    res.setHeader('Content-Type', "application/octet-stream");
    res.setHeader('Content-Disposition', 'attachment; filename=yourmodel.p');
    console.log(typeof(model.learned_model));
    res.send(model.learned_model);
  });
});

// GET route for checking cold start condition
// router.get('/initStatus', (req, res) => {
//   console.log('GET: \t [/initStatus] \t\t ' + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''));
//   initstatus.find({}, function(err, status){
//     if (err) throw err;
//     console.log('\t ----→ ' + status[0].cold_start);
//
//     // res.send(status[0].cold_start);
//     res.send(false);
//   });
// });

// GET route for retrieving all user models
// router.get('/user_models', (req, res) => {
//   console.log('GET: \t [/user_models] \t\t ' + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''));
//   mlmodel.find({}, function(err, mlmodels) {
//     if (err) throw err;
//
//     // Object of all models
//     if (mlmodels.length == 0){
//       mlmodels = "EMPTY";
//     }
//     console.log('\t ----→ FETCHED');
//     res.send(mlmodels);
//   });
// });

// POST route for adding a new model
// router.post('/new_model', (req, res) => {
//   console.log('POST: \t [/new_model] \t\t ' + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''));
//
//   // Extract post body here.
//   // console.log(JSON.stringify(req.body));
//   var newMLModel = mlmodel(req.body);
//
//   // Save the new model
//   newMLModel.save(function(err) {
//     if(err) {
//             console.log(err);
//             res.send({
//                 message :'something went wrong'
//             });
//         } else {
//              console.log('\t ----→ Created');
//             res.send({
//                 message:'Model created'
//             });
//
//         }
//   });
// });

// POST route for updating an existing model
router.post('/update_model', (req, res) => {
    // This method expects the mlmodel's name and updates the corresponding document.

    console.log(JSON.stringify(req.body));
    mlmodel.findByIdAndUpdate(req.body._id, req.body, function(err, returned_mlmodel) {
      if (err) throw err;

      console.log(returned_mlmodel);
      // update fields
      // returned_mlmodel[0].learned_model = req.body.learned_model;

      // returned_mlmodel[0].save(function(err) {
      //   if (err) throw err;
      //   pubsub.publish('getModelChanges', {});
      //   console.log("MLModel successfully UPDATED!");
      // });
    });

  res.send("NEW LEARNED MODEL AVAILABLE\!");
});

// POST route for deleting an existing model
router.post('/delete_model', (req, res) => {
  // This method expects the mlmodel's name and updates the corresponding document.

  mlmodel.find({ name: 'new model' }, function(err, returned_mlmodel) {
    if (err) throw err;

    // delete the model
    user.remove(function(err) {
      if (err) throw err;
      console.log("MLModel successfully DELETED!");
    });
  });

  res.send("DELETED!");
});

module.exports = router;
