import mongoose from "mongoose";

mongoose.connect(
  `mongodb+srv://db-app:${process.env.MONGO_PASS}@photo-gallery-app-clust.jst9b.mongodb.net/photo_gallery?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("connected to db");
    }
  }
);

//Get the default connection
let db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));