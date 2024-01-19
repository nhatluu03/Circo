import {memo, useState } from "react";
import "./SellingArtwork.scss";
import DeleteSellingArtwork from "../crudStore/deleteSellingArtwork/DeleteSellingArtwork";
import EditSellingArtwork from "../crudStore/editSellingArtwork/EditSellingArtwork";

const SellingArtwork = memo(({ sellingArtwork, isOwner }) => {
  const [showDeleteSellingArtworkForm, setShowDeleteSellingArtworkForm] = useState(false);
  const [showEditSellingArtworkForm, setShowEditSellingArtworkForm] = useState(false);
  
  if (sellingArtwork.images.length < 3) {
    return null;
  }
  const handleAddToCart = (artwork) => {
    // Create a function to add the item to the cart
    const addToCart = () => {
      const cartItem = {
        _id: artwork._id,
        title: artwork.title,
        image: artwork.images[0], // You might want to adjust this based on your needs
        price: artwork.price,
        quantity: 1, // You can adjust the quantity as needed
      };

      // Get the existing cart items from localStorage
      const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

      // Check if the item is already in the cart
      const existingCartItemIndex = existingCart.findIndex((item) => item._id === artwork._id);

      if (existingCartItemIndex !== -1) {
        // If the item is already in the cart, update the quantity
        existingCart[existingCartItemIndex].quantity += 1;
      } else {
        // If the item is not in the cart, add it
        existingCart.push(cartItem);
      }

      // Save the updated cart to localStorage
      localStorage.setItem("cart", JSON.stringify(existingCart));
    };

    // Call the addToCart function
    addToCart();
    console.log("Item added to cart:", artwork);
  };
  
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
          {sellingArtwork?.fields?.length > 0 &&
            sellingArtwork.fields.map((field, index) => {
              return (
                <span key={index} className="selling-artwork-item__field-item">
                  {field.name}
                </span>
              );
            })}
        </div>
        <h4 className="selling-artwork-item__title">{sellingArtwork.title}</h4>
        <div className="selling-artwork-item__extra">
          <p className="selling-artwork-item__price">${sellingArtwork.price}</p>
          {/* <p className="selling-artwork-item__solds">
            {sellingArtwork.sold} Sold
          </p> */}
        </div>

        {/* {!isOwner ? ( */}
          <button
            className="btn btn-1 add-to-cart-btn"
            onClick={() => {handleAddToCart(sellingArtwork)}}
          >
            <i className="bx bx-cart"></i>
            <span>Add to Cart</span>
          </button>
        {/* ) : (
          <div className="selling-artwork-item__action">
            <button
              className="btn btn-4"
              onClick={() => {setShowDeleteSellingArtworkForm(true)}}
            >
              <i className="fa-regular fa-trash-can"></i>
              <span>Delete</span>
            </button>
            <button
              className="btn btn-2"
              onClick={() => {setShowEditSellingArtworkForm(true)}}
            >
              <i className="fa-regular fa-pen-to-square"></i>
              <span>Edit</span>
            </button>
          </div>
        )} */}
      </div>

      {/* Modal forms */}
      {/* {showDeleteSellingArtworkForm && <DeleteSellingArtwork sellingArtwork={sellingArtwork} setShowDeleteSellingArtworkForm={setShowDeleteSellingArtworkForm}/>} */}
      {/* {showEditSellingArtworkForm && <EditSellingArtwork sellingArtwork={sellingArtwork} setShowEditSellingArtworkForm={setShowEditSellingArtworkForm}/>} */}
    </div>
  );
});

export default SellingArtwork;