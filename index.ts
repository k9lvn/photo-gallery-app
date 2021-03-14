import express from "express";
import cors from "cors";
import photosRouter from "./routers/photos";
import "./db/connection";

const app = express();
const PORT = process.env.PORT || 3300;

let corsOptions = {
  origin: "https://kind-sinoussi-6afd22.netlify.app",
  optionsSuccessStatus: 200, // For legacy browser support
};

app.use(cors(corsOptions));

// app.use(cors()); // allows restricted resources on a web page to be requested from another domain outside the domain from which the first resource was served
app.use(photosRouter);

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
