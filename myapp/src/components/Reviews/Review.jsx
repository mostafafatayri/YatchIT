/** 
import React, { useState, useEffect } from 'react';
import './Review.scss';
import Modal from './Modal';
import newRequest from '../../utils/newRequest';
import moment from 'moment'; // To format the date

const Reviews = ({ yachtId,ratings }) => {
  alert(ratings);
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [reviewss, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
       
        const id = yachtId;  // Extract yachtId correctly
        const response = await newRequest.get(`/yatch/reviews/getreviews/${id}`);
        setReviews(response.data);
      } catch (error) {
        console.error('Failed to fetch reviews', error);
        alert('Failed to fetch reviews. Please try again.');
      }
    };

    fetchReviews();
  }, [yachtId]);

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
      <h3>{reviewss.length} Reviews</h3>
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
        {reviewss.map((review, index) => (
          <div key={index} className="review">
            <div className="review-header">
              <div className="reviewer-info">
                <img src="https://tripfinder-boat.vercel.app/_next/image?url=https%3A%2F%2Frandomuser.me%2Fapi%2Fportraits%2Fmen%2F64.jpg&w=3840&q=75" alt="Reviewer" />
                <div>
                  <h4>{review.user.firstname} {review.user.lastname}</h4>
                  <p>{moment(review.createdAt).format('DD MMM, YYYY hh:mm a')}</p>
                </div>
              </div>
              <div className="review-location">
                <span>{'★'.repeat(review.rating)}</span>
                <p>{review.user.Country}</p>
              </div>
            </div>
            <p>{review.feedback}</p>
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
        yachtId={yachtId} 
      />
    </div>
  );
};

export default Reviews;
**/


import React, { useState, useEffect } from 'react';
import './Review.scss';
import Modal from './Modal';
import newRequest from '../../utils/newRequest';
import moment from 'moment'; // To format the date

const Reviews = ({ yachtId, ratings }) => {
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [reviewss, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const id = yachtId;  // Extract yachtId correctly
        const response = await newRequest.get(`/yatch/reviews/getreviews/${id}`);
        setReviews(response.data);
      } catch (error) {
        console.error('Failed to fetch reviews', error);
        alert('Failed to fetch reviews. Please try again.');
      }
    };

    fetchReviews();
  }, [yachtId]);

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

  // Calculate total reviews and percentages
  const totalReviews = ratings.reduce((sum, count) => sum + count, 0);
  const averageRating = ratings.reduce((sum, count, index) => sum + count * index, 0) / totalReviews;

  const percentageRatings = ratings.map(count => (count / totalReviews) * 100);

  return (
    <div className="reviews">
      <h3>{totalReviews} Reviews</h3>
      <div className="ratings-summary">
        <h2>{averageRating.toFixed(1)}</h2>
        <p>{totalReviews} Ratings</p>
        <div className="rating-breakdown">
          {percentageRatings.slice(1).map((percentage, index) => (
            <div className="rating-bar" key={index}>
              <span>{1 + index} Star</span>
              <div className="bar">
                <div className="filled" style={{ width: `${percentage}%` }}></div>
              </div>
              <span>{percentage.toFixed(1)}%</span>
            </div>
          ))}
        </div>
      </div>
      <div className="review-list">
        {reviewss.map((review, index) => (
          <div key={index} className="review">
            <div className="review-header">
              <div className="reviewer-info">
                <img src="https://tripfinder-boat.vercel.app/_next/image?url=https%3A%2F%2Frandomuser.me%2Fapi%2Fportraits%2Fmen%2F64.jpg&w=3840&q=75" alt="Reviewer" />
                <div>
                  <h4>{review.user.firstname} {review.user.lastname}</h4>
                  <p>{moment(review.createdAt).format('DD MMM, YYYY hh:mm a')}</p>
                </div>
              </div>
              <div className="review-location">
                <span>{'★'.repeat(review.rating)}</span>
                <p>{review.user.Country}</p> {/* Static location */}
              </div>
            </div>
            <p>{review.feedback}</p>
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
        yachtId={yachtId}
      />
    </div>
  );
};

export default Reviews;
