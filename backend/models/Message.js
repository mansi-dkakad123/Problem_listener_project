// backend/models/Message.js
import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation',
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'ai', 'tool'], // ✅ must include 'tool'
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

// 🧠 CRITICAL FIX: Force delete existing compiled model
if (mongoose.models.Message) {
  delete mongoose.models.Message; // 🔥 ensure old version is wiped
}

export default mongoose.models.Message || mongoose.model('Message', messageSchema);
