import mongoose from 'mongoose';
import config from '../config';

export const connectDB = async () => {
  try {
    await mongoose.connect(config.database_url);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log(error);
  }
};
