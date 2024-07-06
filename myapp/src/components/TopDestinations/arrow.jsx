import React from 'react';
import './arrow.scss'; // Make sure to import the styles

const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-arrow next-arrow`}
      style={{ ...style, display: 'block', background: 'rgba(0, 0, 0, 0.5)', borderRadius: '50%', right: '10px', zIndex: 1 }}
     
      onClick={onClick}
    />
  );
};

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} custom-arrow prev-arrow`}
      style={{ ...style, display: 'block', background: 'rgba(0, 0, 0, 0.5)', borderRadius: '50%', left: '10px', zIndex: 1 }}
      onClick={onClick}
    />
  );
};

export { SampleNextArrow, SamplePrevArrow };
