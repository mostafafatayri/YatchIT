import React from 'react';
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

     
     
     
 