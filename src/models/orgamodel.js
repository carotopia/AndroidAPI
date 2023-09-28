import mongoose from 'mongoose';
const organizationSchema = new mongoose.Schema({
    name: {
        type : String,
        required: true,
    },
    phone : {
        type : Number,
        required: true,
    },
    email: {
        type : String,
        required: true,
    },
    street : {
        type : String,
        required: true,
    },
    suburb : {
        type : String,
        required: true,
    },
    city : {
        type : String,
        required: true,
    },
    state : {
        type : String,
        required: true,
    },
    schedule : {
        type : String,
        required: true,
    },
    linkWeb : {
        type : String,
    },
    linkFacebook : {
        type : String,
    },
    linkInstagram : {
        type : String,
    },
    linkTwitter : {
        type : String,
    },
    linkOther : {
        type : String,
    },
    description : {
        type : String,
        required: true,
    },
    image : {
        type : String,
        required: true,
    },
    tags : {
        type: [String],
        required: true,
    },
    password : {
        type : String,
        required: true,
    }
});

export default mongoose.model('Organization',organizationSchema );