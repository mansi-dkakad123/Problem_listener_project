import mongoose from 'mongoose'; // Changed require to import

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  keywords: {
    type: [String],
    required: true,
  },
  response: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.model('Service', serviceSchema); // Changed module.exports to export default