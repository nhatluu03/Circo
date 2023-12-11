import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Talent.scss'
import { SharedDataContext } from '../../SharedDataContext.jsx'; // Adjust the path accordingly

export default function Talent() {
  const { id } = useParams();
  const { sharedData, updateSharedData } = useContext(SharedDataContext);

  // Fetch additional data for Talent page if needed
  useEffect(() => {
    // Fetch data based on the talent id or any other conditions
    // ...

    // Update shared data if needed
    updateSharedData({
      name: 'John Doe',
      age: 30,
    });
  }, [id, updateSharedData]);


  return (
    <div>
      {sharedData && (
        <div>
          <h1>Talent Page</h1>
          <p>Name: {sharedData.name}</p>
          <p>Age: {sharedData.age}</p>
        </div>
      )}
    </div>
  )
}
