import React, { useState } from 'react';
import './Review.scss';
import Modal from './Modal';

const Reviews = () => {
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const reviews = [
    {
      name: 'Faddie Jaction',
      date: '26 Oct, 2022 9:34 pm',
      location: 'San Diago CA',
      rating: 5,
      review: `I bought two of these hoodies - one for my husband, and an XS for myself. I don't find the quality of this cashmere to be any better than what you'd find at a major retailer. It's fine for the price point, but we both experienced pilling on the very first wear, and it gets worse with each wear. So it probably will not have a long life. That said, it's a great leisure-wear piece that looks more pulled together than wearing a yoga brand zip-up, and I would buy another if they made this piece in grey.`
    },
    {
      name: 'Faddie Jaction',
      date: '26 Oct, 2022 9:34 pm',
      location: 'San Diago CA',
      rating: 5,
      review: `I bought two of these hoodies - one for my husband, and an XS for myself. I don't find the quality of this cashmere to be any better than what you'd find at a major retailer. It's fine for the price point, but we both experienced pilling on the very first wear, and it gets worse with each wear. So it probably will not have a long life. That said, it's a great leisure-wear piece that looks more pulled together than wearing a yoga brand zip-up, and I would buy another if they made this piece in grey.`
    },
    // Add more reviews as needed
  ];

  const handleAddReview = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setRating(0);
    setFeedback('');
  };

  const handleSubmitReview = () => {
    // Handle the submission logic here, such as sending the review to a server
    console.log('Review submitted:', { rating, feedback });
    handleCloseModal();
  };

  return (
    <div className="reviews">
      <h3>35 Reviews</h3>
      <div className="ratings-summary">
        <h2>4.5</h2>
        <p>35 Ratings</p>
        <div className="rating-breakdown">
          <div className="rating-bar">
            <span>5 Star</span>
            <div className="bar">
              <div className="filled" style={{ width: '84%' }}></div>
            </div>
            <span>84%</span>
          </div>
          <div className="rating-bar">
            <span>4 Star</span>
            <div className="bar">
              <div className="filled" style={{ width: '9%' }}></div>
            </div>
            <span>9%</span>
          </div>
          <div className="rating-bar">
            <span>3 Star</span>
            <div className="bar">
              <div className="filled" style={{ width: '4%' }}></div>
            </div>
            <span>4%</span>
          </div>
          <div className="rating-bar">
            <span>2 Star</span>
            <div className="bar">
              <div className="filled" style={{ width: '2%' }}></div>
            </div>
            <span>2%</span>
          </div>
          <div className="rating-bar">
            <span>1 Star</span>
            <div className="bar">
              <div className="filled" style={{ width: '1%' }}></div>
            </div>
            <span>1%</span>
          </div>
        </div>
      </div>
      <div className="review-list">
        {reviews.map((review, index) => (
          <div key={index} className="review">
            <div className="review-header">
              <div className="reviewer-info">
                <img src="https://tripfinder-boat.vercel.app/_next/image?url=https%3A%2F%2Frandomuser.me%2Fapi%2Fportraits%2Fmen%2F64.jpg&w=3840&q=75" alt="Reviewer" />
                <div>
                  <h4>{review.name}</h4>
                  <p>{review.date}</p>
                </div>
              </div>
              <div className="review-location">
                <span>{'★'.repeat(review.rating)}</span>
                <p>{review.location}</p>
              </div>
            </div>
            <p>{review.review}</p>
          </div>
        ))}
      </div>
      <button className="add-review-button" onClick={handleAddReview}>Add Review</button>
      <Modal
        show={showModal}
        onClose={handleCloseModal}
        onSubmit={handleSubmitReview}
        rating={rating}
        setRating={setRating}
        feedback={feedback}
        setFeedback={setFeedback}
      />
    </div>
  );
};

export default Reviews;
