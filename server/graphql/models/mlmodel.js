const mongoose = require('mongoose');
var Schema = mongoose.Schema;

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Define mlmodelSchema
var mlmodelSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    required: true
  },
  parameters: {
    alpha: {type: Number, lowercase: true, trim: true, default: 0.01}
  },
  train_status: {
    type: String,
    required: true,
    default: "untrained"
  },
  deploy_status: {
    type: String,
    required: true,
    default: "offline"
  },
  metrics: {
    mean_squared_error: Number,
    mean_absolute_error: Number
  },
  loss: {
    mean_squared_error: Number,
    mean_absolute_error: Number
  },
  learned_model: {
    type: String,
    // required: true
  },
  description: String,
  created_at: Date,
  updated_at: Date
});
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Define custom methods for mlmodelSchema
mlmodelSchema.pre('save', function (next) {
  // Get current date
  var currentDate = new Date();

  // Change updated_at to current field
  this.updated_at = currentDate;

  // If created_at doesn't exist, add to that field
  if (!this.created_at) {
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
