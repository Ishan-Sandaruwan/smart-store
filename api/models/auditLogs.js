import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model to track who made the changes
    required: true,
  },
  action: {
    type: String,
    enum: ['create', 'update', 'delete'],
    required: true,
  },
  documentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  collectionName: {
    type: String,
    required: true,
  },
  changes: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

const AuditLog = mongoose.model('AuditLog', auditLogSchema);

export default AuditLog;
