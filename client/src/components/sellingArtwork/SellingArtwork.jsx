import { useState } from "react";
import "./SellingArtwork.scss";

export default function SellingArtwork({ sellingArtwork }) {
  if (sellingArtwork.images.length < 3) {
    return null;
  }
  const handleAddToCart = (item) => {
    console.log("Add to cart");
    console.log(item);
  }
  return (
    <div className="selling-artwork-item">
      <div className="selling-artwork-item__sample-container">
        <div className="selling-artwork-item__sample-container--left">
          <img
            src={`../../public/uploads/artworks/${sellingArtwork.images[0]}`}
            alt=""
            className="selling-artwork-item__sample-item"
          />
        </div>
        <div className="selling-artwork-item__sample-container--right">
          <img
            src={`../../public/uploads/artworks/${sellingArtwork.images[1]}`}
            alt=""
            className="selling-artwork-item__sample-item"
          />
          <img
            src={`../../public/uploads/artworks/${sellingArtwork.images[2]}`}
            alt=""
            className="selling-artwork-item__sample-item"
          />
        </div>
      </div>
      <div className="selling-artwork-item__details">
        <div className="selling-artwork-item__field-container">
          {sellingArtwork?.fields?.length > 0 && sellingArtwork.fields.map((field, index) => {
            return (
              <span key={index} className="selling-artwork-item__field-item">
                {field.title}
              </span>
            );
          })}
        </div>
        <h4 className="selling-artwork-item__title">{sellingArtwork.title}</h4>
        <div className="selling-artwork-item__extra">
          <p className="selling-artwork-item__price">${sellingArtwork.price}</p>
          <p className="selling-artwork-item__solds">
            {sellingArtwork.sold} Sold
          </p>
        </div>
        <button className="btn btn-1 add-to-cart-btn" onClick={handleAddToCart(sellingArtwork)}>
          <i className="bx bx-cart"></i>Add to Cart
        </button>
      </div>
    </div>
  );
}
