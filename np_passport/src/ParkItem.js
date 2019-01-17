import React from 'react';
import ReviewList from './ReviewList';

const ParkItem = ({park}) => {        
  const image = park['images'][0]['url']
  const imageAlt = park['images'][0]['altText']
  const address = park['addresses'][0]['line1']
  const city = park['addresses'][0]['city']
  const state = park['addresses'][0]['stateCode']
  const zipCode = park['addresses'][0]['postalCode']
  const phoneNumber = park['contacts']['phoneNumbers'][0]['phoneNumber']
  const website = park['url']
  const parkName = park['fullName']
  return (
    <div>
      {parkName}<br />
      <img src={image} alt={imageAlt} height='100' width='100' /><br />
      <a href ='{parkName} Website' /><br /> 
      {address}<br />
      {city}, {state} {zipCode}<br />
      {phoneNumber}<br />
      Put # of stars<ReviewList park = {parkName}/>
    </div>
  );
};
// 4 columns total: column 1(Need photo on left), column 2((average number of stars, button for view website), column 3(address) & column 4(google map display)

export default ParkItem;
