import express from "express";
import multer from "multer";
import Photo from "../model/Photo";
const Router = express.Router();

const upload = multer({
  limits: {
    fileSize: 1000000, // max file size 1MB = 1000000 bytes
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png)$/)) {
      cb(new Error("only upload files with jpg, jpeg or png format."));
    }
    cb(undefined, true); // continue with upload
  },
});

Router.post(
  "/photos",
  upload.single("photo"), // process a single file
  async (req, res) => {
    try {
      const photo = new Photo(req.body);
      const file = req.file.buffer;
      photo.photo = file;

      await photo.save();
      res.status(201).send({ _id: photo._id });
    } catch (error) {
      res.status(500).send({
        upload_error: "Error while uploading file...Try again later.",
      });
    }
  }
  // (error, req, res, next) => {
  //   if (error) {
  //     res.status(500).send({
  //       upload_error: error.message,
  //     });
  //   }
  // }
);

Router.get("/photos", async (req, res) => {
  try {
    const photos = await Photo.find({});
    const photoIDs = photos.map((ele) => ele._id);
    res.send(photoIDs);
  } catch (error) {
    res.status(500).send({ get_error: "Error while getting list of photos." });
  }
});

Router.get("/photos/:id", async (req, res) => {
  try {
    const result = await Photo.findById(req.params.id);
    res.set("Content-Type", "image/jpeg");
    res.send(result.photo);
  } catch (error) {
    res.status(400).send({ get_error: "Error while getting photo." });
  }
});

export default Router;
