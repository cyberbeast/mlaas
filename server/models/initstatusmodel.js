var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var initStatusSchema = new Schema({
    cold_start: Boolean,
    last_changed_at: Date
});

initStatusSchema.pre('save', function(next) {
    var currentDate = new Date();
    if (!this.last_changed_at)
        this.last_changed_at = currentDate;

    next();
});

var InitStatus = mongoose.model('InitStatus', initStatusSchema);

module.exports = InitStatus;