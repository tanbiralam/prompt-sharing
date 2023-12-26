import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('MongoDB already Connected');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'promptHub',
            // ...other options
        });

        isConnected = true;

        console.log('MongoDB Connected');
    } catch (error) {
        isConnected = false;
        console.error('Error connecting to MongoDB:', error.message);
        console.error('Error details:', error);
        throw error;
    }
};

