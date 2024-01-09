import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import ShowcasingArtwork from "../../pages/showcasingArtwork/ShowcasingArtwork.jsx";
import UploadArtwork from "../../components/uploadArtwork/UploadArtwork.jsx";
import AddCommission from "../../components/addCommission/AddCommission.jsx";
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

  // Toggle display add-commssion-form
  const [showAddCommissionForm, setShowAddCommissionForm] = useState(false);

  // Toggle display edit-cover-form
  const [showEditCoverForm, setShowEditCoverForm] = useState(false);

  //Toggle active buttons
  const [activeButton, setActiveButton] = useState("artworks");
  const [showUploadArtworkBtn, setShowUploadArtworkBtn] = useState(true);
  const [showAddCommissionBtn, setShowAddCommissionBtn] = useState(false);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    if (buttonName == "artworks") {
      setShowUploadArtworkBtn(true);
      setShowUploadArtworkBtn(false);
    } else if (buttonName == "commissions") {
      setShowAddCommissionBtn(true);
      setShowUploadArtworkBtn(false);
    }
  };

  useEffect(() => {
    const fetchTalent = async () => {
      try {
        if (id) {
          console.log(id);
          console.log(user?._id);
          const response = await axios.get(
            `http://localhost:3000/users/${id}?userId=${user?._id}`,
            {
              widthCredentials: true,
            }
          );
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
              // src={talent?.bg ? talent.bg : defaultBackground}
              src="https://i.pinimg.com/564x/95/cf/0b/95cf0b39d3c0d8d54d3a9d02b03b8833.jpg"
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
                <button
                  className={`talent-profile__button-item ${
                    activeButton === "artworks" ? "active" : ""
                  }`}
                  onClick={() => handleButtonClick("artworks")}
                >
                  <i className="bx bx-palette"></i>
                  Artworks
                </button>
              </Link>

              <Link to={`talents/${talent?._id}/about`}>
                <button
                  className={`talent-profile__button-item ${
                    activeButton === "about" ? "active" : ""
                  }`}
                  onClick={() => handleButtonClick("about")}
                >
                  <i className="bx bx-info-circle"></i>
                  About
                </button>
              </Link>

              <Link to={`talents/${talent?._id}/store`}>
                <button
                  className={`talent-profile__button-item ${
                    activeButton === "store" ? "active" : ""
                  }`}
                  onClick={() => handleButtonClick("store")}
                >
                  <i className="bx bx-info-circle"></i>
                  Store
                </button>
              </Link>

              <Link to={`talents/${talent?._id}/commissions`}>
                <button
                  className={`talent-profile__button-item ${
                    activeButton === "commissions" ? "active" : ""
                  }`}
                  onClick={() => handleButtonClick("commissions")}
                >
                  <i className="bx bx-cart"></i>
                  Commissions
                </button>
              </Link>

              <Link to={`talents/${talent?._id}/reviews`}>
                <button
                  className={`talent-profile__button-item ${
                    activeButton === "reviews" ? "active" : ""
                  }`}
                  onClick={() => handleButtonClick("reviews")}
                >
                  <i className="bx bx-star"></i>
                  Reviews
                </button>
              </Link>
            </div>

            <div className="talent-profile__button-container--right">
              {talent?._id == user?._id && showUploadArtworkBtn && (
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
              {talent?._id == user?._id && showAddCommissionBtn && (
                <button
                  className="talent-profile__button-item active mg-0"
                  onClick={() => {
                    setShowAddCommissionForm(true);
                  }}
                >
                  <i className="bx bx-palette"></i>
                  Add commission
                </button>
              )}
            </div>
          </div>
          <hr />
          <Outlet talentId={id} showUploadArtworkForm={showUploadArtworkBtn} />
        </div>

        {showAddCommissionForm && (
          <AddCommission setShowAddCommissionForm={setShowAddCommissionForm} />
        )}

        {showEditCoverForm && (
          <EditCover setShowEditCoverForm={setShowEditCoverForm} />
        )}
      </div>
    </>
  );
}
