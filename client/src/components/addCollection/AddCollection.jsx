import { useState, useEffect, useContext, useRef } from "react";
import "./AddCollection.scss";
import { UserContext } from "../../contexts/user.context.jsx";
import axios from "axios";
import sampleArtwork01 from "../../assets/img/artwork_01.png";
import sampleArtwork02 from "../../assets/img/artwork_02.png";

export default function AddCollection({ setShowAddCollectionForm }) {
  const { user, login } = useContext(UserContext);
  const [masterpieces, setMasterpieces] = useState([]);

  const imageData = [
    { id: 1, src: sampleArtwork01 },
    { id: 2, src: sampleArtwork02 },
    { id: 3, src: sampleArtwork01 },
    { id: 4, src: sampleArtwork02 },
    { id: 5, src: sampleArtwork01 },
  ];

  const handleCheckboxChange = (imageId) => {
    const isSelected = masterpieces.includes(imageId);

    if (isSelected) {
      // Remove from the array if already selected
      setMasterpieces((prevSelected) =>
        prevSelected.filter((id) => id !== imageId)
      );
    } else {
      // Add to the array if not selected
      setMasterpieces((prevSelected) => [...prevSelected, imageId]);
    }
  };

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    setFiles([...files, ...selectedFiles]);
    console.log(files);
  };

  const handleFileDelete = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  const [inputs, setInputs] = useState({});
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("talent", user._id);
    fd.append("description", inputs.description);
    fd.append("images", JSON.stringify(files.map((file) => file.name)));

    try {
      const response = await axios.post("http://localhost:3000/collections/");
      console.log(user);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        className="overlay"
        onClick={() => setShowAddCollectionForm(false)}
      ></div>
      <form className="form add-collection-form" onSubmit={handleSubmit}>
        <img
          className="form-close-ic"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAARNJREFUSEvt1DtKBEEURuFvUkFMlFEwEBF0DYMPUFNxG2IquBOZxEhwA+IKVIxUTH1grKGuQC6U0EhPVTnQmEyFTdV/7j11u3o6Xr2O800ARcP/rugYZ3gfUeoqNnA6qpVcB4c4wQs2WyAruMY89nHRBskB4mAERNBrqvSnk2Xcoo9HbOHrr4DY3waZqg2PgJpLXsBV6uQJMwl8jx185kapBhDnF5OupRSW1dIE1gLCdTgP97EesF2qvlZRhN8kRc9JUXy7w24JUuqgWfkbBphujGexkxygLfwjKYrRDWVzJV05wAGGCC0x57//5rXUySz2cDnOf3CE88xTEZD1cZ+K4ktZs6F0yTUZ2T0TQFFh54q+ARi0NBkujYiHAAAAAElFTkSuQmCC"
          onClick={() => {
            setShowAddCollectionForm(false);
          }}
        />
        <h2 className="form-title">Add collection</h2>
        <div className="form-field description">
          <label htmlFor="description" className="form-field__label">
            Title
          </label>
          <input
            type="text"
            _
            className="form-field__input"
            name="description"
            placeholder="Enter the title of your collection"
          />
        </div>
        <div className="form-field description">
          <label htmlFor="description" className="form-field__label">
            Choose masterpieces
          </label>
          <div className="masterpiece-container">
            {imageData.map((image) => (
              <div key={image.id} className={`masterpiece-item ${masterpieces.includes(image.id) ? 'active' : ''}`} onClick={() => handleCheckboxChange(image.id)}>
                <img src={image.src} alt={`Image ${image.id}`} class="masterpiece-item__img"/>
                <div className="checkbox-overlay">
                  {masterpieces.includes(image.id) ? (
                    <i
                      class="fa-regular fa-square-check"
                    ></i>
                  ) : (
                    <i
                      class="fa-solid fa-cart-shopping"
                    ></i>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="form-field">
          <input
            type="submit"
            value="Confirm"
            className="form-field__input"
          />
        </div>
      </form>
    </>
  );
}
