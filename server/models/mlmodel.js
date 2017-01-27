const mongoose = require('mongoose');
var Schema = mongoose.Schema;

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Define mlmodelSchema
var mlmodelSchema = new Schema({
  name: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  meta: {
    parameters: String
  },
  train_status: String,
  deploy_status: String,
  train_accuracy: String,
  test_accuracy: String,
  created_at: Date,
  updated_at: Date
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
