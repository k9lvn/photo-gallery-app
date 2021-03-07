import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { startLoadPhotos } from "../actions/photos";
import Photo from "./Photo";

function Gallery() {
  const [photosIds, setPhotosIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    startLoadPhotos().then((res) => {
      if (res && res.status <= 299) {
        const photoList = res.data;
        setPhotosIds(photoList);
        setIsLoading(false);
      }
    });
  }, []);

  return (
    <div className="photos-list">
      {isLoading ? (
        <Spinner animation="grow" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : (
        photosIds.map((id) => {
          return <Photo id={id} key={id} />;
        })
      )}
    </div>
  );
}

export default Gallery;
