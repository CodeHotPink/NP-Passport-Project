import React from 'react';

const VisitItem = ({visit}) => {
  const parkId = visit['parkId']
  const userId = visit['userId']
  const visitDate = visit['visitDate']
  
  return (
    <div>
      User {userId} visited park {parkId} on {visitDate}.<br />
    </div>
  );
};

export default VisitItem;
