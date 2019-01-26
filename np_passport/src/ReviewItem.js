import React from 'react';

const ReviewItem = ({review}) => {
  const parkId = review['parkId']
  const numOfStars = review['numOfStars']
  const userId = review['userId']
  const reviewDate = review['reviewDate']
  const textReview = review['textReview']
  
  return (
    <div>
      {userId} rated {parkId} {numOfStars}/5 stars.<br />
      {reviewDate}<br />
      {textReview}<br />
      <br />
    </div>
  );
};

export default ReviewItem;
