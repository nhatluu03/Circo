import mongoose from 'mongoose';
import {User} from './models/user.model.js';
import "./utils/loadEnv.js";

mongoose.connect(process.env.MONGO).then(() => {
    console.log("Connected to the Database successfully");
});

// Create a function to perform the update
const updateDocuments = async () => {
    try {
      // Assuming newField is a required field
      const updateResult = await User.updateMany({}, { $set: { newField: 'defaultValue' } });
      console.log('Documents updated:', updateResult);
    } catch (err) {
      console.error('Error updating documents:', err);
    } finally {
      // Close the MongoDB connection
      mongoose.connection.close();
    }
  };
  
// Run the update function
updateDocuments();