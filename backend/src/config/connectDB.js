import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.log('MONGODB_URI not set. MongoDB connection skipped.');
      return;
    }

    const conn = await mongoose.connect(mongoUri);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log('MongoDB connection error:', error);
    process.exit(1);
  }
};
