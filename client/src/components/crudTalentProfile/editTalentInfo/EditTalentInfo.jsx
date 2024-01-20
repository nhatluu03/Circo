import { useState, useEffect, useContext, useRef } from "react";
import "./EditTalentInfo.scss";
import { UserContext } from "../../../contexts/user.context.jsx";
import axios from "axios";

export default function EditTalentInfo({
  setShowEditTalentInfoForm,
  handleSubmitTalentInfo,
  profileInfoMutation,
}) {
  const [image, setImage] = useState(null);
  const { user, fetchUser } = useContext(UserContext);
  const [files, setFiles] = useState([]);
  const [update, setUpdate] = useState(false)
  const [fullname, setFullname] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const [bio, setBio] = useState('')
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", image);
    formData.append("fullname", fullname);
    formData.append("jobTitle", jobTitle);
    formData.append("bio", bio);
    const response = await axios.put(`http://localhost:3000/users/${user?._id}`, formData,{
      withCredentials: true
    })
    fetchUser()
    setBio(response.data.bio)
    setFullname(response.data.fullname)
    setJobTitle(response.data.jobTitle)
    window.location.reload()
    // const output = await handleUploadSellingArtwork(files, formData);
    // mutation.mutate(output);
  };
  console.log(fullname)
  console.log(jobTitle)
  console.log(bio)
  return (
    <>
      <div
        className="overlay"
        onClick={() => setShowEditTalentInfoForm(false)}
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
            setShowUploadSellingArtworkForm(false);
          }}
        />
        <h2 className="form-title">Edit profile information</h2>
        <div className="form-field">
          <label htmlFor="avatar" className="form-field__label avatar__label">
            {image ? <img className="avatarImg" src={URL.createObjectURL(image)} /> : "Change your avatar"}
          </label>
          <input
            id="avatar"
            type="file"
            className="form-field__input"
            style={{display:"none"}}
            name="avatar"
            onChange={(e) => setImage(e.target.files[0])}
          />
          {/* <span ref={usernameErrRef} className="form-field__error"></span> */}
        </div>
        <div className="form-field">
          <label htmlFor="fullname" className="form-field__label">
            Full name
          </label>
          <input
            type="text"
            className="form-field__input"
            name="fullname"
            placeholder="Enter your full name"
            onChange={(e) => setFullname(e.target.value)}
          />
          {/* <span ref={usernameErrRef} className="form-field__error"></span> */}
        </div>
        <div className="form-field">
          <label htmlFor="title" className="form-field__label">
            Job title
          </label>
          <input
            type="text"
            className="form-field__input"
            name="title"
            value={user.jobTitle || "Freelancer"}
            placeholder="Enter your job title"
            onChange={(e) => setJobTitle(e.target.value)}
          />
          {/* <span ref={usernameErrRef} className="form-field__error"></span> */}
        </div>
        <div className="form-field">
          <label htmlFor="bio" className="form-field__label">
            Biography
          </label>
          <input
            type="text"
            className="form-field__input"
            name="bio"
            placeholder="Tell ArtHub-er something about you"
            onChange={(e)=> setBio(e.target.value)}
          />
          {/* <span ref={usernameErrRef} className="form-field__error"></span> */}
        </div>
        <div className="form-field">
          <label htmlFor="creative-field" className="form-field__label">
            Creative Field
          </label>
          {fields.map((field) => {
            return (
              <>
                <div class="form-field__checkbox">
                  <input
                    type="checkbox"
                    name="fields"
                    id={field._id}
                    value={field._id}
                  />
                  <label for={field._id}>{field.name}</label>
                </div>
              </>
            );
          })}
          {/* <select
            name="fields[]"
            className="form-field__input field-container upload-artwork__btn-item add-hashtag-btn"
            defaultValue={"DEFAULT"}
            onChange={handleChange}
          >
            <option value="DEFAULT">Add field</option>
            {fields.map((field, index) => (
              <option key={index} value={field._id}>{field.name}</option>
            ))}
          </select> */}
          {/* <button
            className="upload-artwork__btn-item add-field-btn"
          >
            <i className="fa-regular fa-hashtag"></i> Add fields
          </button> */}
        </div>
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
