import { useState, useEffect, useContext, useRef } from "react";
import "./DeleteSellingArtwork.scss";
// import { UserContext } from "../../../contexts/user.context.jsx";
import axios from "axios";

export default function DeleteSellingArtwork({sellingArtwork, setShowDeleteSellingArtworkForm}) {
  // const { user, login } = useContext(UserContext);
  const handleDeleteSellingArtwork = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(`http://localhost:3000/artworks/${sellingArtwork._id}`, {withCredentials: true});
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div
        className="overlay"
        onClick={() => setShowDeleteSellingArtworkForm(false)}
      ></div>
      <form
        className="form modal-form delete-selling-artwork-form"
        onSubmit={handleDeleteSellingArtwork}
        encType="multipart/form-data"
      >
        <img
          className="form-close-ic"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAARNJREFUSEvt1DtKBEEURuFvUkFMlFEwEBF0DYMPUFNxG2IquBOZxEhwA+IKVIxUTH1grKGuQC6U0EhPVTnQmEyFTdV/7j11u3o6Xr2O800ARcP/rugYZ3gfUeoqNnA6qpVcB4c4wQs2WyAruMY89nHRBskB4mAERNBrqvSnk2Xcoo9HbOHrr4DY3waZqg2PgJpLXsBV6uQJMwl8jx185kapBhDnF5OupRSW1dIE1gLCdTgP97EesF2qvlZRhN8kRc9JUXy7w24JUuqgWfkbBphujGexkxygLfwjKYrRDWVzJV05wAGGCC0x57//5rXUySz2cDnOf3CE88xTEZD1cZ+K4ktZs6F0yTUZ2T0TQFFh54q+ARi0NBkujYiHAAAAAElFTkSuQmCC"
          onClick={() => {
            setShowDeleteSellingArtworkForm(false);
          }}
        />
        <h2 className="form-title">Delete artwork for sell</h2>
        <div className="form-field">
          Are you sure to delete {sellingArtwork.title}?
          *This will remove the artwork from the ArtHub permanently.
          {/* <span ref={usernameErrRef} className="form-field__error"></span> */}
        </div>

        <div className="form-field">
            <input type="submit" className="form-field__input" value="Confirm"/>
        </div>
      </form>
    </>
  );
}
