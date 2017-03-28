const express = require('express');
const mongoose = require('mongoose');
const mlmodel = require('../models/mlmodel');
const initstatus = require('../models/initstatusmodel');
const config = require('../config.json');

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
mongoose.connect(config.DB_URI);
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


// GET api listing
router.get('/', (req, res) => {
  res.send('api works');
});

// GET route for checking cold start condition
router.get('/initStatus', (req, res) => {
  console.log('GET: \t [/initStatus] \t\t ' + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''));
  initstatus.find({}, function(err, status){
    if (err) throw err;
    console.log('\t ----→ ' + status[0].cold_start);
    
    // res.send(status[0].cold_start);
    res.send(false);
  });
});

// GET route for retrieving all user models
router.get('/user_models', (req, res) => {
  console.log('GET: \t [/user_models] \t\t ' + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''));
  mlmodel.find({}, function(err, mlmodels) {
    if (err) throw err;

    // Object of all models
    if (mlmodels.length == 0){
      mlmodels = "EMPTY";
    }
    console.log('\t ----→ FETCHED');
    res.send(mlmodels);
  });
});

// POST route for adding a new model
router.post('/new_model', (req, res) => {
  console.log('POST: \t [/new_model] \t\t ' + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''));

  // Extract post body here.
  // console.log(JSON.stringify(req.body));
  var newMLModel = mlmodel(req.body);

  // Save the new model
  newMLModel.save(function(err) {
    if(err) {
            console.log(err);
            res.send({
                message :'something went wrong'
            });
        } else {
             console.log('\t ----→ Created');
            res.send({
                message:'Model created'
            });

        }      
  });
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
