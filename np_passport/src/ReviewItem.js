import React from 'react';
import {Col, Row, Grid} from 'react-bootstrap';

const ReviewItem = ({review}) => {
  const parkId = review['parkId']
  const numOfStars = review['numOfStars']
  const userId = review['userId']
  const reviewDate = review['reviewDate']
  const textReview = review['textReview']
  
  return (
    <div className='container'>
      <div id='reviewHeader'>
        <Row>
          {userId} 
        </Row>
        <Row>
          Rated {parkId} 
        </Row>
        <Row>
          {numOfStars}/5 stars.
        </Row>
        <Row>
          {reviewDate}
        </Row>
      </div>
      <Row>
        <div id='reviewBody'>
          {textReview}
        </div>
      </Row>
      <br />
    </div>
    
  );
};

export default ReviewItem;
