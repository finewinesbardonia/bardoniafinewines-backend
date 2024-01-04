const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const uri = process.env.MONGO_DB_ATLAS_CONNECTION_STRING;

const connectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // Remove the useCreateIndex option
};

// Connect to MongoDB Atlas
mongoose.connect(uri, connectOptions)
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((error) => {
    console.error(`Error connecting to MongoDB: ${error.message}`);
  });
