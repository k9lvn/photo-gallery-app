import mongoose, { Schema, Document } from "mongoose";

export interface IPhoto extends Document {
  photo: Buffer,
}

const PhotoSchema: Schema<IPhoto> = new Schema({
  photo: {
    type: Buffer,
  },
});

// PhotoSchema.methods.toJSON = function () {
//   const result = this.toObject();
//   delete result.photo;
//   return result;
// };

const Photo = mongoose.model<IPhoto>("Photo", PhotoSchema);

export default Photo;
