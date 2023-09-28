import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    posts: [{
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        image: {
            type: String, // Puedes almacenar la URL de la imagen
            required: true,
        },
        date: {
            type: Date,
            default: Date.now,
        }
    }]

});

export default mongoose.model('Post', PostSchema);