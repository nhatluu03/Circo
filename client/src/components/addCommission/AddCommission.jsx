import { useState, useEffect, useContext, useRef } from "react";
import "./AddCommission.scss";
import { UserContext } from "../../contexts/user.context.jsx";
import defaultAvatar from "../../assets/img/default_avt.png";
import axios from "axios";
import { makeRequest } from "../../axios.js";

export default function AddCommission({ setShowAddCommissionForm }) {
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
      const res1 = await axios.post(
        "http://localhost:3000/artworks/upload",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(user);

      const imgUrl = res1.data.url;
      console.log(imgUrl);

      // Step 1: Post artwork data to url1
      inputs.images = [imgUrl];
      console.log(inputs);
      console.log(inputs);
      const res2 = await axios.post("http://localhost:3000/artworks/", inputs, {
        withCredentials: true,
      });
      console.log("Artwork Data:", res2.data);

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
        onClick={() => setShowAddCommissionForm(false)}
      ></div>
      <form
        className="form upload-artwork-form"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <img
          className="form-close-ic"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAARNJREFUSEvt1DtKBEEURuFvUkFMlFEwEBF0DYMPUFNxG2IquBOZxEhwA+IKVIxUTH1grKGuQC6U0EhPVTnQmEyFTdV/7j11u3o6Xr2O800ARcP/rugYZ3gfUeoqNnA6qpVcB4c4wQs2WyAruMY89nHRBskB4mAERNBrqvSnk2Xcoo9HbOHrr4DY3waZqg2PgJpLXsBV6uQJMwl8jx185kapBhDnF5OupRSW1dIE1gLCdTgP97EesF2qvlZRhN8kRc9JUXy7w24JUuqgWfkbBphujGexkxygLfwjKYrRDWVzJV05wAGGCC0x57//5rXUySz2cDnOf3CE88xTEZD1cZ+K4ktZs6F0yTUZ2T0TQFFh54q+ARi0NBkujYiHAAAAAElFTkSuQmCC"
          onClick={() => {
            setShowAddCommissionForm(false);
          }}
        />
        <h2 className="form-title">Add commission</h2>
        <div className="form-field">
          <label htmlFor="add-commission-title" className="form-field__label">
            Title
          </label>
          <input
            type="text"
            id="add-commission-title"
            className="form-field__input"
            placeholder="Enter the title of the commission service"
          />
        </div>
        <div className="form-field">
          <label htmlFor="add-commission-styles" className="form-field__label">
            Styles
          </label>
          <input
            type="text"
            id="add-commission-styles"
            className="form-field__input"
            placeholder="Describe your drawing styles"
          />
        </div>
        <div className="form-field">
          <label
            htmlFor="add-commission-price-from"
            className="form-field__label"
          >
            Price from
          </label>

          <input
            type="number"
            id="add-commission-price-from"
            className="form-field__input"
            placeholder="Enter the minimum amount"
          />

          <label
            htmlFor="add-commission-price-to"
            className="form-field__label"
          >
            Price to
          </label>
          <input
            type="number"
            id="add-commission-price-to"
            className="form-field__input"
            placeholder="Enter the maximum amount"
          />
        </div>
        <div className="form-field">
          <label htmlFor="add-commission-Notes" className="form-field__label">
            Notes
          </label>
          <input
            type="text"
            id="add-commission-Notes"
            className="form-field__input"
            placeholder="Enter additional notes for the customers"
          />
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
            value="Add commission"
            className="form-field__input"
          />
        </div>
      </form>
    </>
  );
}
