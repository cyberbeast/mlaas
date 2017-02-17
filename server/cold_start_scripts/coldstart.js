var InitStatus = require('../models/initstatusmodel');

var firstTimeStat = InitStatus({
    cold_start: true
});

firstTimeStat.save(function(err) {
    if (err) throw err;
    console.log('COLD START EVENT RECORDED IN DB!');
});