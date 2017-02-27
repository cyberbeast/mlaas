const mongoose = require('mongoose');
var Schema = mongoose.Schema;

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Define mlmodelSchema
var mlmodelSchema = new Schema({
  name: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  meta: {
    parameters: String,
    train_status: String,
    deploy_status: String,
    train_accuracy: String,
    test_accuracy: String,
    description: String,
  },
  created_at: Date,
  updated_at: Date
});
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Define custom methods for mlmodelSchema
mlmodelSchema.pre('save', function(next) {
  // Get current date
  var currentDate = new Date();

  // Change updated_at to current field
  this.updated_at = currentDate;

  // If created_at doesn't exist, add to that field
  if (!this.created_at){
    this.created_at = currentDate;
  }

  next();
});
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Create MLModel based on the mlmodelSchema
var MLModel = mongoose.model('MLModel', mlmodelSchema);
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Export the model for use in the node application
module.exports = MLModel;
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
