var InitStatus = require('../models/initstatusmodel');
var mongoose = require('mongoose');
const config = require('../config.json');

const mongo = mongoose.connect(config.DB_URI);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected! Injecting first run status...');
  var firstTimeStat = InitStatus({
    cold_start: true
  });

  firstTimeStat.save(function (err) {
    if (err) throw err;
    console.log('COLD START EVENT RECORDED IN DB!');
  });
  // we're connected!
});

