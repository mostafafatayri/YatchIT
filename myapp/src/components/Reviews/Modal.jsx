import React from 'react';
import './Modal.scss';

const Modal = ({ show, onClose, onSubmit, rating, setRating, feedback, setFeedback }) => {
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
                className={rating >= star ? 'star selected' : 'star'}
                onClick={() => setRating(star)}
              >
                ★
              </span>
            ))}
          </div>
          <label>Feedback</label>
          <textarea
            value={feedback}
            onChange={e => setFeedback(e.target.value)}
            placeholder="Enter your feedback"
          ></textarea>
        </div>
        <div className="modal-footer">
          <button onClick={onClose} className="button">Close</button>
          <button onClick={onSubmit} className="button">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
