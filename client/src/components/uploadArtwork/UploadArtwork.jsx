import { useState, useEffect, useContext, useRef } from "react";
import "./UploadArtwork.scss";
import { UserContext } from "../../contexts/user.context.jsx";
import defaultAvatar from "../../assets/img/default_avt.png";
import axios from "axios";
import Cookies from "universal-cookie";

export default function UploadArtwork({ setShowUploadArtworkForm }) {
  const { user, login } = useContext(UserContext);
  const [files, setFiles] = useState([]);
  const cookies = new Cookies();

  // Dropdown list of art categories
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:3000/categories");
        console.log(response.data);
        setCategories(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
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

    // formData.append('description', inputs.description);
    // let images = []
    // for (const file of files) {
    //   images.push(file)
    // }

    // console.log(formData.get("images"))
    // const data = {
    //   images: images,
    // }

    try {
      // Upload images
      const images_response = await fetch({
        method: 'POST',
        url: 'http://localhost:3000/artworks/images',
      })
      // const formData = new FormData();
      // formData.append("abc", "def");
      // const response = axios.post("http://localhost:3000/artworks/", formData, {
      //   withCredentials: true,
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      //   transformRequest: (data, headers) => {
      //     return formData;
      //   },
      // });
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        className="overlay"
        onClick={() => setShowUploadArtworkForm(false)}
      ></div>
      <form
        className="form upload-artwork-form"
        onSubmit={handleSubmit}
        type="multipart/form-data"
      >
        <img
          className="form-close-ic"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAARNJREFUSEvt1DtKBEEURuFvUkFMlFEwEBF0DYMPUFNxG2IquBOZxEhwA+IKVIxUTH1grKGuQC6U0EhPVTnQmEyFTdV/7j11u3o6Xr2O800ARcP/rugYZ3gfUeoqNnA6qpVcB4c4wQs2WyAruMY89nHRBskB4mAERNBrqvSnk2Xcoo9HbOHrr4DY3waZqg2PgJpLXsBV6uQJMwl8jx185kapBhDnF5OupRSW1dIE1gLCdTgP97EesF2qvlZRhN8kRc9JUXy7w24JUuqgWfkbBphujGexkxygLfwjKYrRDWVzJV05wAGGCC0x57//5rXUySz2cDnOf3CE88xTEZD1cZ+K4ktZs6F0yTUZ2T0TQFFh54q+ARi0NBkujYiHAAAAAElFTkSuQmCC"
          onClick={() => {
            setShowUploadArtworkForm(false);
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
            placeholder={`What's on your mind now, ${user.username}?`}
          />
          <i className="fa-regular fa-face-smile"></i>
          {/* <span ref={usernameErrRef} className="form-field__error"></span> */}
        </div>
        <div className="upload-artwork__btn-container">
          <select
            name="category"
            className="category-container upload-artwork__btn-item add-hashtag-btn"
            defaultValue={"DEFAULT"}
          >
            <option value="DEFAULT">Add category</option>
            {categories.map((category) => (
              <option value={category._id}>{category.title}</option>
            ))}
          </select>
          {/* <button
            className="upload-artwork__btn-item add-category-btn"
          >
            <i className="fa-regular fa-hashtag"></i> Add categories
            
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
