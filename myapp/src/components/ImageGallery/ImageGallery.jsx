import React, { useState } from 'react';
import './ImageGallery.scss';

const ImageGallery = ({ images }) => {
  const [imageArray, setImageArray] = useState(images);

  const rotateImages = () => {
    const newArray = [...imageArray];
    const firstImage = newArray.shift();
    newArray.push(firstImage);
    setImageArray(newArray);
  };

  return (
    <div className="image-gallery">
      <div className="main-image-container">
        <img src={imageArray[0]} alt="Boat" className="main-image" />
        <button className="arrow-button2" onClick={rotateImages}>
          &gt;
        </button>
      </div>
      <div className="thumbnail-container">
        {imageArray.slice(1, 4).map((img, index) => (
          <img src={img} alt={`Boat Thumbnail ${index + 1}`} className="thumbnail" key={index} />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;

     
 /*import React from 'react';
import './ImageGallery.scss';

const ImageGallery = () => {
  return (
    <div className="image-gallery">
      <img src="https://tripfinder-boat.vercel.app/_next/image?url=%2Fimages%2Ftop-boats%2Fboat-thirty-one.jpg&w=3840&q=75" alt="Boat" className="main-image" />
      <div className="thumbnail-container">
        <img src="https://tripfinder-boat.vercel.app/_next/image?url=%2Fimages%2Ftop-boats%2Fboat-thirty-one.jpg&w=3840&q=75" alt="Boat Thumbnail" className="thumbnail" />
        <img src="https://tripfinder-boat.vercel.app/_next/image?url=%2Fimages%2Ftop-boats%2Fboat-thirty-one.jpg&w=3840&q=75" alt="Boat Thumbnail" className="thumbnail" />
        <img src="https://tripfinder-boat.vercel.app/_next/image?url=%2Fimages%2Ftop-boats%2Fboat-thirty-one.jpg&w=3840&q=75" alt="Boat Thumbnail" className="thumbnail" />
   
      </div>
    </div>
  );
};

export default ImageGallery;

     
     
     
  */