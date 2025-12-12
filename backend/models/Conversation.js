// backend/models/Conversation.js
import mongoose from 'mongoose'; // Changed require to import

const conversationSchema = new mongoose.Schema({
  userId: {
    type: String, // You can change this to mongoose.Schema.Types.ObjectId if you have a User model
    required: true,
  },
  title: {
    type: String,
    required: true,
    default: 'New Chat',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Conversation', conversationSchema); // Changed module.exports to export default