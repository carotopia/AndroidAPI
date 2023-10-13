import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type : String,
        required: true,
        
    },
    lastname: {
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
    description : {
        type : String,
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