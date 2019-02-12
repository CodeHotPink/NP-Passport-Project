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
      <Row>
        <Col md='3'>
          <Row>
            {userId} rated {parkId} {numOfStars}/5 stars.
          </Row>
          <Row>
            {reviewDate}
          </Row>
        </Col>
        <Col md='9'>
          {textReview}
        </Col>
      </Row>
      <br />
    </div>
    
  );
};

export default ReviewItem;
