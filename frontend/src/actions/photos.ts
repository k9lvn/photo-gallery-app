import axios from "axios";
// import { getErrors } from './errors';

export const beginAddPhoto = async (photo: any) => {
  try {
    const formData = new FormData();
    formData.append("photo", photo);
    const res = await axios.post<string>("/photos", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const startLoadPhotos = async () => {
  try {
    const photos = await axios.get<string[]>("/photos");
    console.log("photos ", photos);
    return photos;
  } catch (error) {
    console.log(error);
  }
};
