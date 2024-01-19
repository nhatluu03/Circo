import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import AddFeedback from "../../components/crudFeedback/addFeedback/AddFeedback.jsx";
import axios from "axios";
import { Outlet } from "react-router-dom";
import defaultBackground from "./../../assets/img/default_bg_02.png";
import { UserContext } from "../../contexts/user.context.jsx";
import { useQuery, useMutation, useQueryClient } from "react-query";
import "../../assets/scss/profile.scss";
import "./Client.scss";

export default function ClientProfile() {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const queryClient = useQueryClient();

  //Toggle active buttons
  const [activeButton, setActiveButton] = useState("artworks");
  const [showUploadArtworkBtn, setShowUploadArtworkBtn] = useState(true);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    if (buttonName == "artworks") {
      setShowUploadArtworkBtn(true);
      setShowUploadArtworkBtn(false);
    } else if (buttonName == "commissions") {
      // setShowAddCommissionBtn(true);
      setShowUploadArtworkBtn(false);
    }
  };

  const fetchClientInfo = async () => {
    try {
      if (id) {
        console.log(id);
        console.log(user?._id);
        const response = await axios.get(`http://localhost:3000/users/${id}`, {
          widthCredentials: true,
        });
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // useQuery for fetch talent info
  const { data: talent } = useQuery({
    queryKey: ["fetchClientInfo"],
    queryFn: fetchClientInfo,
  });


  return (
    <>
      <div className="talent-profile">
        <div className="talent-profile--left">
          <Sidebar talent={talent}/>
        </div>

        <div className="talent-profile--right">
          <div className="talent-profile__button-container">
            <div className="talent-profile__button-container--left">
              <Link to={`clients/${talent?._id}`}>
                <button
                  className={`talent-profile__button-item ${
                    activeButton === "artworks" ? "active" : ""
                  }`}
                  onClick={() => handleButtonClick("artworks")}
                >
                  <i className="bx bx-palette"></i>
                  About
                </button>
              </Link>
              <Link to={`clients/${talent?._id}/order-history`}>
                <button
                  className={`talent-profile__button-item ${
                    activeButton === "commissions" ? "active" : ""
                  }`}
                  onClick={() => handleButtonClick("commissions")}
                >
                  <i className="bx bx-cart"></i>
                  Order History
                </button>
              </Link>
            </div>
          </div>
          <Outlet talentId={id}/>
        </div>
      </div>
    </>
  );
}
