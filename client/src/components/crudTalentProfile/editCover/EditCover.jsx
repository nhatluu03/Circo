import {useState, useContext} from "react";
import './EditCover.scss';
import { UserContext } from "../../../contexts/user.context.jsx";
import axios from "axios";

export default function EditCover({setShowEditCoverForm, handleUploadCoverPhoto, coverPhotoMutation}) {
  const [selectedCoverPhoto, setSelectedCoverPhoto] = useState(null);
  const { user } = useContext(UserContext);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedCoverPhoto(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert("Handle submit in child component");
    const response = await handleUploadCoverPhoto(selectedCoverPhoto);
    coverPhotoMutation.mutate(response);
  };


  return (
    <>
      <div
        className="overlay"
        onClick={() => setShowEditCoverForm(false)}
      ></div>

      <form className="form edit-cover-form" onSubmit={handleSubmit}>
        <img
          className="form-close-ic"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAARNJREFUSEvt1DtKBEEURuFvUkFMlFEwEBF0DYMPUFNxG2IquBOZxEhwA+IKVIxUTH1grKGuQC6U0EhPVTnQmEyFTdV/7j11u3o6Xr2O800ARcP/rugYZ3gfUeoqNnA6qpVcB4c4wQs2WyAruMY89nHRBskB4mAERNBrqvSnk2Xcoo9HbOHrr4DY3waZqg2PgJpLXsBV6uQJMwl8jx185kapBhDnF5OupRSW1dIE1gLCdTgP97EesF2qvlZRhN8kRc9JUXy7w24JUuqgWfkbBphujGexkxygLfwjKYrRDWVzJV05wAGGCC0x57//5rXUySz2cDnOf3CE88xTEZD1cZ+K4ktZs6F0yTUZ2T0TQFFh54q+ARi0NBkujYiHAAAAAElFTkSuQmCC"
          onClick={() => {
            setShowEditCoverForm(false);
          }}
        />
        <h2 className="form-title">Change cover artwork</h2>
        <div className="form-field">
          <label htmlFor="edit-cover" className="form-field__label">Cover photo</label>
          <input type="file" id="edit-cover" onChange={handleFileChange} name="bg" className="form-field__input" accept="image/*" required/>
        </div>
        <div className="form-field">
          <input type="submit" value="Confirm" className="form-field__input"/>
        </div>
      </form>
    </>
  );
}
