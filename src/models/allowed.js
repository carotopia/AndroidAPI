import mongoose from 'mongoose';

const allowedSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

export default mongoose.model('Allowed', allowedSchema);
