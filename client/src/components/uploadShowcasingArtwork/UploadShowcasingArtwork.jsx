import { useState, useEffect, useContext, useRef } from "react";
import "./UploadShowcasingArtwork.scss";
import "../../assets/scss/artwork.scss";
import { UserContext } from "../../contexts/user.context.jsx";
import defaultAvatar from "../../assets/img/default_avt.png";
import axios from "axios";
import { makeRequest } from "../../axios.js";

export default function UploadShowcasingArtwork({ setShowUploadShowcasingArtworkForm }) {
  const { user, login } = useContext(UserContext);
  const [files, setFiles] = useState([]);

  // Dropdown list of art fields
  const [fields, setFields] = useState([]);
  useEffect(() => {
    const fetchFields = async () => {
      try {
        const response = await axios.get("http://localhost:3000/fields");
        console.log(response.data);
        setFields(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFields();
  }, []);

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

    try {
      // Step 2: Post image to url2
      const file = files[0];

      const formData = new FormData();
      formData.append("file", file);
      const res1 = await axios.post("http://localhost:3000/artworks/upload", formData, {
        withCredentials:true,
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });

      console.log(user)

      const imgUrl = res1.data.url;
      console.log(imgUrl)


      // Step 1: Post artwork data to url1
      inputs.images = [
        imgUrl
      ]
      console.log(inputs)
      console.log(inputs)
      const res2 = await axios.post('http://localhost:3000/artworks/', inputs, {
        withCredentials: true
      });
      console.log('Artwork Data:', res2.data);
      alert("Successfully uploaded the artwork!")
      setShowUploadShowcasingArtworkForm(false);
      // const response2 = await axios.post('http://localhost:3000/artworks/uploads', files, {
      //   withCredentials: true,
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      // });
      // console.log('Image URL:', response2.data.imageUrl);
    

      // const res = fetch("http://localhost:3000/artworks/upload", {
      //   method: "POST",
      //   headers: {
      //     'Accept': 'application/json',
      //     'Content-Type': 'application/json'
      //   },
      
      //   //make sure to serialize your JSON body
      //   body: formData
      // })
      // .then( (response) => { 
      //   console.log(respose)
      //    //do something awesome that makes the world a better place
      // });

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        className="overlay"
        onClick={() => setShowUploadShowcasingArtworkForm(false)}
      ></div>
      <form
        className="form modal-form upload-showcasiartwork-form"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <img
          className="form-close-ic"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAARNJREFUSEvt1DtKBEEURuFvUkFMlFEwEBF0DYMPUFNxG2IquBOZxEhwA+IKVIxUTH1grKGuQC6U0EhPVTnQmEyFTdV/7j11u3o6Xr2O800ARcP/rugYZ3gfUeoqNnA6qpVcB4c4wQs2WyAruMY89nHRBskB4mAERNBrqvSnk2Xcoo9HbOHrr4DY3waZqg2PgJpLXsBV6uQJMwl8jx185kapBhDnF5OupRSW1dIE1gLCdTgP97EesF2qvlZRhN8kRc9JUXy7w24JUuqgWfkbBphujGexkxygLfwjKYrRDWVzJV05wAGGCC0x57//5rXUySz2cDnOf3CE88xTEZD1cZ+K4ktZs6F0yTUZ2T0TQFFh54q+ARi0NBkujYiHAAAAAElFTkSuQmCC"
          onClick={() => {
            setShowUploadShowcasingArtworkForm(false);
          }}
        />
        <h2 className="form-title">Upload artwork</h2>
        <div className="user-info">
          <img
            src={user?.avatar ? user.avatar : defaultAvatar}
            className="user-info__avt "
          />

          <div className="user-info__name">
            <p className="user-info__name__fullname">{user?.username}</p>
            <p className="user-info__name__username">@{user?.username}</p>
          </div>
        </div>
        <div className="form-field description">
          <input
            type="text"
            className="form-field__input"
            name="description"
            onChange={handleChange}
            placeholder={`What's on your mind now, ${user.username}?`}
          />
          <i className="fa-regular fa-face-smile"></i>
          {/* <span ref={usernameErrRef} className="form-field__error"></span> */}
        </div>
        <div className="upload-artwork__btn-container">
          <select
            name="field"
            className="field-container upload-artwork__btn-item add-hashtag-btn"
            defaultValue={"DEFAULT"}
          >
            <option value="DEFAULT">Add field</option>
            {fields.map((field) => (
              <option value={field._id}>{field.name}</option>
            ))}
          </select>
          {/* <button
            className="upload-artwork__btn-item add-field-btn"
          >
            <i className="fa-regular fa-hashtag"></i> Add fields
            
          </button> */}

          <button className="upload-artwork__btn-item add-hashtag-btn">
            <i className="fa-regular fa-hashtag"></i> Add hashtags
          </button>
          <button className="upload-artwork__btn-item add-collection-btn">
            <i className="fa-regular fa-hashtag"></i> Add to collection
          </button>
        </div>

        <div className="form-field--upload">
          <i className="fa-regular fa-image"></i>
          <label htmlFor="fileInput" className="upload-artwork-btn">
            Upload files
          </label>
          <input
            type="file"
            id="fileInput"
            className="form-field__input"
            multiple
            accept="image/*"
            onChange={handleFileChange}
          />
          <p>Or drag and drop file</p>
          <p>Max size file: 50MB</p>
        </div>
        {/* Render selected files */}
        {files.length > 0 && (
          <div className="selected-file-container">
            {files.map((file, index) => (
              <div key={index} className="selected-file-item">
                <div className="selected-file-item--left">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview`}
                    className="selected-file-item__preview"
                  />
                  <div className="selected-file-item__details">
                    <p className="selected-file-item__name">{file.name}</p>
                    <p className="selected-file-item__size">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>

                <div className="selected-file-item--right">
                  <img
                    className="delete-selected-file-ic"
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAARNJREFUSEvt1DtKBEEURuFvUkFMlFEwEBF0DYMPUFNxG2IquBOZxEhwA+IKVIxUTH1grKGuQC6U0EhPVTnQmEyFTdV/7j11u3o6Xr2O800ARcP/rugYZ3gfUeoqNnA6qpVcB4c4wQs2WyAruMY89nHRBskB4mAERNBrqvSnk2Xcoo9HbOHrr4DY3waZqg2PgJpLXsBV6uQJMwl8jx185kapBhDnF5OupRSW1dIE1gLCdTgP97EesF2qvlZRhN8kRc9JUXy7w24JUuqgWfkbBphujGexkxygLfwjKYrRDWVzJV05wAGGCC0x57//5rXUySz2cDnOf3CE88xTEZD1cZ+K4ktZs6F0yTUZ2T0TQFFh54q+ARi0NBkujYiHAAAAAElFTkSuQmCC"
                    onClick={() => handleFileDelete(index)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="uploads"></div>
        <div className="form-field">
          <input
            type="submit"
            value="Upload artworks"
            className="form-field__input"
          />
        </div>
      </form>
    </>
  );
}
