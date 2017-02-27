const express = require('express');
const mongoose = require('mongoose');
const mlmodel = require('../models/mlmodel');
const initstatus = require('../models/initstatusmodel');


// var cors = require('cors');

const router = express.Router();

// FOR DEVELOPMENT PURPOSES ONLY! COMMENT FOR PRODUCTION!
router.use(function(req, res, next) {  
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Connect to database
mongoose.connect('mongodb://localhost')
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


// GET api listing
router.get('/', (req, res) => {
  res.send('api works');
});

// GET route for checking cold start condition
router.get('/initStatus', (req, res) => {
  console.log('REQ: \t [/initStatus] \t\t ' + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''));
  initstatus.find({}, function(err, status){
    if (err) throw err;
    console.log('\t ----→ ' + status[0].cold_start);
    
    res.send(status[0].cold_start);
  });
});

// GET route for retrieving all user models
router.get('/user_models', (req, res) => {
  mlmodel.find({}, function(err, mlmodels) {
    if (err) throw err;

    // Object of all models
    console.log(mlmodels);
  });
});

// POST route for adding a new model
router.post('/new_model', (req, res) => {
  // Extract post body here.
  var newMLModel = mlmodel({
    name: "new model",
    type: "svm",
    meta: {
      parameters: "a=0",
      train_status: "untrained",
      deploy_status: "not deployed",
      train_accuracy: "0",
      test_accuracy: "0",
    }
  });

  // Save the new model
  newMLModel.save(function(err) {
    if (err) throw err;
    console.log("New ML Model added to the database");
  });

  res.send('CREATED!');
});

// POST route for updating an existing model
router.post('/update_model', (req, res) => {
    // This method expects the mlmodel's name and updates the corresponding document.

    mlmodel.find({ name: 'new model' }, function(err, returned_mlmodel) {
      if (err) throw err;

      // update fields
      returned_mlmodel.type = "something_else";

      mlmodel.save(function(err) {
        if (err) throw err;
        console.log("MLModel successfully UPDATED!");
      });
    });

  res.send("UPDATED!");
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
