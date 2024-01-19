import { useState, useEffect, useContext, useRef } from "react";
import "./AddCommission.scss";
import { UserContext } from "../../../contexts/user.context.jsx";
import axios from "axios";

export default function AddCommission({
  setShowAddCommissionForm,
  handleAddCommission,
  mutation,
}) {
  const { user, login } = useContext(UserContext);
  const [files, setFiles] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedFields, setSelectedFields] = useState([]);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === "fields") {
      if (checked) {
        // If checkbox is checked, add the value to the selectedMaterials array
        setSelectedFields((prevFields) => [...prevFields, value]);
      } else {
        // If checkbox is unchecked, remove the value from the selectedMaterials array
        setSelectedFields((prevFields) =>
          prevFields.filter((field) => field !== value)
        );
      }
    } else if (name === "materials") {
      if (checked) {
        // If checkbox is checked, add the value to the selectedMaterials array
        setSelectedMaterials((prevMaterials) => [...prevMaterials, value]);
      } else {
        // If checkbox is unchecked, remove the value from the selectedMaterials array
        setSelectedMaterials((prevMaterials) =>
          prevMaterials.filter((material) => material !== value)
        );
      }
    } else {
      setInputs((values) => ({ ...values, [name]: value }));
    }
  };

  // Dropdown list of art materials
  const [materials, setMaterials] = useState([]);
  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await axios.get("http://localhost:3000/materials");
        console.log(response.data);
        setMaterials(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMaterials();
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert("Handle submit in child component");
    console.log(files);
    console.log(inputs);
    inputs.fields = selectedFields
    inputs.materials = selectedMaterials
    const output = await handleAddCommission(files, inputs);
    mutation.mutate(output);
  };

  return (
    <>
      <div
        className="overlay"
        onClick={() => setShowAddCommissionForm(false)}
      ></div>
      <form
        className="form modal-form upload-selling-artwork-form"
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
        <h2 className="form-title">Add commission service</h2>
        <div className="form-field">
          <label htmlFor="title" className="form-field__label">
            Title
          </label>
          <input
            type="text"
            className="form-field__input"
            name="title"
            placeholder="Enter the title of your commissions service"
            onChange={handleChange}
          />
          {/* <span ref={usernameErrRef} className="form-field__error"></span> */}
        </div>
        <div className="">
          <label htmlFor="creative-field" className="form-field__label">
            Materials
          </label>
          {materials.map((material) => {
            return (
              <>
                <div class="form-field__checkbox">
                  <input
                    type="checkbox"
                    name="materials"
                    id={material._id}
                    value={material._id}
                  />
                  <label for={material._id}>{material.name}</label>
                </div>
              </>
            );
          })}
          {/* <button
            className="upload-artwork__btn-item add-field-btn"
          >
            <i className="fa-regular fa-hashtag"></i> Add fields
          </button> */}
        </div>
        <div className="form-field">
          <div className="form-field__child">
            <label htmlFor="price-from" className="form-field__label">
              Price from ($)
            </label>
            <input
              type="number"
              className="form-field__input"
              name="priceFrom"
              placeholder="Enter the minimum price per unit of this commission service ($)"
              onChange={handleChange}
            />
          </div>
          <div className="form-field__child">
            <label htmlFor="price-to" className="form-field__label">
              Price to ($)
            </label>
            <input
              type="number"
              className="form-field__input"
              name="priceTo"
              placeholder="Enter the maximum price per unit of this commission service ($)"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-field">
          <label htmlFor="price" className="form-field__label">
            Additional notes
          </label>
          <input
            type="text"
            className="form-field__input"
            name="note"
            placeholder="Enter additional notes for the customers (price variation, etc)"
            onChange={handleChange}
          />
          {/* <span ref={usernameErrRef} className="form-field__error"></span> */}
        </div>
        <div className="">
          <label htmlFor="creative-field" className="form-field__label">
            Creative Fields
          </label>
          {fields.map((field) => {
            return (
              <>
                <div className="form-field__checkbox">
                  <input
                    type="checkbox"
                    name="fields"
                    id={field._id}
                    value={field._id}
                    onChange={handleChange}
                  />
                  <label for={field._id}>{field.name}</label>
                </div>
              </>
            );
          })}
        </div>

        <div className="form-field--upload">
          <i className="fa-regular fa-image"></i>
          <label htmlFor="fileInput" className="upload-artwork-btn">
            Upload files
          </label>
          <input
            type="file"
            accept="image/png, image/gif, image/jpeg"
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
