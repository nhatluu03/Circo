import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ShowcasingArtworkDetails from "../showcasingArtworkDetails/ShowcasingArtworkDetails";
import ShowcasingArtwork from "../../pages/showcasingArtwork/ShowcasingArtwork.jsx";
import axios from "axios";
import "../../assets/scss/artwork.scss";
import "./ShowcasingArtworks.scss";

export default function ShowcasingArtworks({ showcasingArtworks }) {
  // const [artworks, setArtworks] = useState([]);

  // useEffect(() => {
  //   const fetchArtworks = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:3000/artworks");
  //       console.log(response.data);
  //       setArtworks(response.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchArtworks();
  // }, []);

  const [selectedArtworkIdx, setSelectedArtworkIdx] = useState(null);
  const openModal = (index) => {
    setSelectedArtworkIdx(index);
  };

  const closeArtwork = () => {
    setSelectedArtworkIdx(null);
  };

  const nextArtwork = () => {
    const currentIndex = showcasingArtworks.findIndex(
      (artwork) => artwork._id === selectedArtworkIdx
    );
    if (currentIndex !== -1 && currentIndex < showcasingArtworks.length - 1) {
      setSelectedArtworkIdx(showcasingArtworks[currentIndex + 1]._id);
    }
  };

  const prevArtwork = () => {
    const currentIndex = showcasingArtworks.findIndex(
      (artwork) => artwork._id === selectedArtworkIdx
    );
    if (currentIndex !== -1 && currentIndex > 0) {
      setSelectedArtworkIdx(showcasingArtworks[currentIndex - 1]._id);
    }
  };

  return (
    <>
      {selectedArtworkIdx && (
        <ShowcasingArtworkDetails
          showcasingArtwork={showcasingArtworks.find(
            (artwork) => artwork._id === selectedArtworkIdx
          )}
          closeArtwork={closeArtwork}
          nextArtwork={nextArtwork}
          prevArtwork={prevArtwork}
        />
      )}

      <div className="showcasing-artwork-container">
        {showcasingArtworks?.length > 0 ? (
          showcasingArtworks?.map((showcasingArtwork, index) => {
            return (
              showcasingArtwork.images &&
              showcasingArtwork.images.length > 0 && (
                <div
                  className="showcasing-artwork-item"
                  key={index}
                  onClick={() => {
                    openModal(showcasingArtwork._id);
                  }}
                >
                  {showcasingArtwork.images &&
                    showcasingArtwork.images.length > 0 && (
                      <img
                        src={`../../public/uploads/artworks/${showcasingArtwork.images[0]}`}
                        alt=""
                      />
                    )}
                </div>
              )
            );
          })
        ) : (
          <p>There is no artwork found</p>
        )}
      </div>
    </>
  );
}
