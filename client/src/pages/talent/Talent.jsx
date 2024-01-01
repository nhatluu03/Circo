import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import Artpieces from "../../pages/artpieces/Artpieces.jsx";
import UploadArtwork from "../../components/uploadArtwork/UploadArtwork.jsx";
import EditCover from "../../components/editCover/EditCover.jsx";
import AddCollection from "../../components/addCollection/AddCollection.jsx";
import axios from "axios";
import { Outlet } from "react-router-dom";
import defaultBackground from "./../../assets/img/default_bg_02.png";
import { UserContext } from "../../contexts/user.context.jsx";
import "./Talent.scss";

export default function Talent() {
  const { id } = useParams();
  const [talent, setTalent] = useState(null);
  const { user } = useContext(UserContext);

  // Toggle display upload-artwork-form
  const [showUploadArtworkForm, setShowUploadArtworkForm] = useState(false);

  // Toggle display edit-cover-form
  const [showEditCoverForm, setShowEditCoverForm] = useState(false);

  useEffect(() => {
    const fetchTalent = async () => {
      try {
        if(id){
          const response = await axios.get("http://localhost:3000/users/" + id);
          console.log(response.data);
          setTalent(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchTalent();
  }, []);

  return (
    <>
      <div className="talent-profile">
        <div className="talent-profile--left">
          <Sidebar talent={talent} />
        </div>

        <div className="talent-profile--right">
          <div className="talent-profile__bg">
            <img
              src={talent?.bg ? talent.bg : defaultBackground}
              className="talent-profile__bg-img"
            />
            <button
              className="talent-profile__bg-btn edit-cover-btn"
              onClick={() => {
                setShowEditCoverForm(true);
              }}
            >
              <i className="fa-solid fa-image"></i> Edit cover photo
            </button>
          </div>

          <div className="talent-profile__button-container">
            <div className="talent-profile__button-container--left">
              <Link to={`talents/${talent?._id}`}>
                <button className="talent-profile__button-item active">
                  <i className="bx bx-palette"></i>
                  Artworks
                </button>
              </Link>

              <Link to={`talents/${talent?._id}/about`}>
                <button className="talent-profile__button-item">
                  <i className="bx bx-info-circle"></i>
                  About
                </button>
              </Link>

              <Link to={`talents/${talent?._id}/commissions`}>
                <button className="talent-profile__button-item">
                  <i className="bx bx-cart"></i>
                  Commissions
                </button>
              </Link>

              <Link to={`talents/${talent?._id}/reviews`}>
                <button className="talent-profile__button-item">
                  <i className="bx bx-star"></i>
                  Reviews
                </button>
              </Link>
            </div>

            <div className="talent-profile__button-container--right">
              {talent?._id == user?._id && (
                <button
                  className="talent-profile__button-item active mg-0"
                  onClick={() => {
                    setShowUploadArtworkForm(true);
                  }}
                >
                  <i className="bx bx-palette"></i>
                  Upload artwork
                </button>
              )}
            </div>
          </div>
          <hr />
          <Outlet talentId={id} />
        </div>

        {/* Modal forms */}
        {showUploadArtworkForm && (
          <UploadArtwork setShowUploadArtworkForm={setShowUploadArtworkForm} />
        )}

        {showEditCoverForm && (
         <EditCover setShowEditCoverForm={setShowEditCoverForm}/>
        )}
      </div>
    </>
  );
}
