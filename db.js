import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Cargar las variables de entorno desde el archivo .env

mongoose.set('strictQuery', false);

export const connectDB = async () => {
    try {
        // Usar la variable de entorno para la conexión a MongoDB
        await mongoose.connect(process.env.MONGODB_URI, {});
        console.log('>>> DB is connected');
    } catch (error) {
        console.log(error);
    }
};

