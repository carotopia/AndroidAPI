import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type : String,
        required: true,
        
    },
    last_name: {
        type : String,
        required: true,
    },
    phone: {
        type : Number,
        required: true,
        unique: true,
    },
    email: {
        type : String,
    },
    password: {
        type : String,
        required: true,
    },
    tags : {
        type: [String]
    },
    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization'
    }]
})

export default mongoose.model('User', userSchema);