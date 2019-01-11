import React from 'react';

const ReviewItem = ({review}) => {        
  const image = review['images'][0]['url']
  const imageAlt = review['images'][0]['altText']
  const address = review['addresses'][0]['line1']
  const city = review['addresses'][0]['city']
  const state = review['addresses'][0]['stateCode']
  const zipCode = review['addresses'][0]['postalCode']
  const phoneNumber = review['contacts']['phoneNumbers'][0]['phoneNumber']
  const website = review['url']
  const reviewName = review['fullName']
  return (
    <div>
      {reviewName}<br />
      <img src={image} alt={imageAlt} height='100' width='100' /><br />
      Put # of stars<br />
      <a href ='{reviewName} Website' /><br /> 
      {address}<br />
      {city}, {state} {zipCode}<br />
      {phoneNumber}<br />
    </div>
  );
};
// 4 columns total: column 1(Need photo on left), column 2((average number of stars, button for view website), column 3(address) & column 4(google map display)

export default ReviewItem;
