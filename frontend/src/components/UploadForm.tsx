import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { beginAddPhoto } from "../actions/photos";

// we can make the form control a separate component to customize control over file name display
// bugs: 
// - filename clears after choosing and then cancel

function UploadForm() {
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoUrl, setPhotoUrl] = useState("");
  // const [photoName, setPhotoName] = useState("");

  const checkFileSize = (file: File) => {
    if (file.size > 1000000) {
      // more than 1MB
      return false;
    }
    return true;
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) {
      // no files selected
      e.preventDefault(); // this still clears the input value
      return;
    }
    let file = e.target.files![0]; // tell TS this wont be null
    let t = file?.name.match(/\.([^\\.]+)$/);
    let ext = t ? t![1] : "";
    switch (ext) {
      case "jpg":
      case "jpeg":
      case "png":
        if (checkFileSize(file)) {
          console.log("upload file");
          setPhoto(e.target.files && e.target.files[0]);
          setPhotoUrl(URL.createObjectURL(e.target.files && e.target.files[0]));
          // setPhotoName(file.name);
        } else {
          alert("File size is more than 1MB");
          e.target.value = "";
          setPhotoUrl("");
        }
        break;
      default:
        alert("File type not allowed");
        e.target.value = "";
        setPhotoUrl("");
        setPhoto(null);
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    beginAddPhoto(photo).then((res) => {
      if (res?.status === 201) {
        alert("Upload successful!");
      } else {
        alert(`Something went wrong: ${res?.statusText}`);
      }
      setPhoto(null);
      setPhotoUrl("");
    });
  };

  return (
    <div>
      <Form
        onSubmit={handleFormSubmit}
        method="post"
        encType="multipart/form-data"
        className="upload-form"
      >
        <Form.Group>
          <Form.Label style={{ paddingRight: "5px" }}>
            Choose photo to upload
          </Form.Label>
          <Form.Control
            type="file"
            name="photo"
            onChange={handleOnChange}
            accept=".jpg,.jpeg,.png"
          />
        </Form.Group>
        <img src={photoUrl} alt="" className="preview-img"></img>
        <Button
          variant="primary"
          type="submit"
          className={`${!photo ? "disabled submit-btn" : "submit-btn"}`}
          disabled={photo ? false : true}
        >
          Upload
        </Button>
      </Form>
    </div>
  );
}

export default UploadForm;
