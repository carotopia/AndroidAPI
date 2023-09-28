import mongoose from 'mongoose';


mongoose.set('strictQuery', false); // Desactivar strictQuery
export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://carolina123:carolina123@cluster0.fcoldwu.mongodb.net/FrisaDataBase?retryWrites=true&w=majority", {});
        console.log('>>> DB is connected');
    } catch (error) {
        console.log(error);
    }
};
