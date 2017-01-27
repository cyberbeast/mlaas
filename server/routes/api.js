const express = require('express');
const mongoose = require('mongoose');
const mlmodel = require('../models/mlmodel');

const router = express.Router();

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Connect to database
mongoose.connect('mongodb://localhost')
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


// GET api listing
router.get('/', (req, res) => {
  res.send('api works');
});

router.post('/new_model', (req, res) => {
  // Extract post body here.
  res.send('new_model_res');
});

module.exports = router;
