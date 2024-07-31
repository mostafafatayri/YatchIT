import React, { useReducer, useEffect } from 'react';
import './Modal.scss';
import { modalReducer, initialState } from '../../reducers/ReviewsReducer';
import newRequest from '../../utils/newRequest';

const Modal = ({ show, onClose, yachtId }) => {
  console.log("from the model : "+JSON.stringify(yachtId));
 
  const [state, dispatch] = useReducer(modalReducer, initialState);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = sessionStorage.getItem("userInfo");
        const userData = JSON.parse(userInfo);
        dispatch({ type: 'SET_USER_ID', payload: userData._id });
      } catch (error) {
        console.error('Failed to fetch user info', error);
      }
    };

    fetchUserInfo();
    dispatch({ type: 'SET_YACHT_ID', payload: yachtId });
  }, [yachtId]);

  const handleRating = (rating) => {
    dispatch({ type: 'SET_RATING', payload: rating });
  };

  const handleFeedback = (e) => {
    dispatch({ type: 'SET_FEEDBACK', payload: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await newRequest.post('/yatch/review/add', {
        userId: state.userId,
        yachtId: state.yachtId,
        rating: state.rating,
        feedback: state.feedback
      },{withCredentials:true});
      if (response.status === 200) {
        dispatch({ type: 'SUBMIT_REVIEW' });
        onClose(); // Close the modal on success
      } else {
        alert('Failed to submit review');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review');
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h4 className="modal-title">Add Review</h4>
        </div>
        <div className="modal-body">
          <label>Your rating</label>
          <div className="stars">
            {[1, 2, 3, 4, 5].map(star => (
              <span
                key={star}
                className={state.rating >= star ? 'star selected' : 'star'}
                onClick={() => handleRating(star)}
              >
                ★
              </span>
            ))}
          </div>
          <label>Feedback</label>
          <textarea
            value={state.feedback}
            onChange={handleFeedback}
            placeholder="Enter your feedback"
          ></textarea>
        </div>
        <div className="modal-footer">
          <button onClick={onClose} className="button">Close</button>
          <button onClick={handleSubmit} className="button">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
