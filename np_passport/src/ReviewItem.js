import React from 'react';

const ReviewItem = ({review}) => {
  const numOfStars = review['numOfStars']
  const userId = review['userId']
  const reviewDate = review['reviewDate']
  const textReview = review['textReview']
  
  return (
    <div>
      User {userId} rated the park {numOfStars}/5 stars.<br />
      {reviewDate}<br />
      {textReview}<br />
    </div>
  );
};

export default ReviewItem;
