// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import "./Artwork.scss";

// export default function Artwork() {
//   const { id } = useParams();
//   const [artwork, setArtwork] = useState();

//   useEffect(() => {
//     const fetchArtwork = async () => {
//       try {
//         const response = await fetch(
//           `https://api.slingacademy.com/v1/sample-data/photos/${id}`
//         );
//         const data = await response.json();
//         console.log(data.photo);
//         setArtwork(data.photo);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchArtwork();
//   }, []);

//   return (
//   <div className="artwork-details">
//     <h1>{artwork?.id}</h1>
//     <p>{artwork?.title}</p>
//     <img src={artwork?.url} alt={artwork?.title} />
//   </div>
//   );
// }

import React, { useEffect } from 'react';
import "./Artwork.scss";

const Artwork = ({ artwork, onClose }) => {
  console.log(artwork)

  // Close modal on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (e.target.classList.contains('artwork-modal')) {
        onClose();
      }
    };

    window.addEventListener('click', handleOutsideClick);

    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [onClose]);

  return (
      <div className="artwork-modal">
        <div className="overlay">
          <button onClick={onClose}>Close</button>
        </div>
        <div className="artwork-content">
          <img src={artwork.url} alt={artwork.title} />
          <h2>{artwork.title}</h2>
          <p>{artwork.description}</p>
          {/* <button onClick={onClose}>Close</button> */}
        </div>
      </div>
  );
};

export default Artwork;

