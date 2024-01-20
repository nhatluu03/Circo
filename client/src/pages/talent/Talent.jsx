import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar.jsx";
import ProfileShowcasingArtworks from "../../pages/profileshowcasingArtworks/ProfileShowcasingArtworks.jsx";
// import AddCommission from "../../components/addCommission/AddCommission.jsx";
import EditCover from "../../components/crudTalentProfile/editCover/EditCover.jsx";
import AddCollection from "../../components/addCollection/AddCollection.jsx";
import axios from "axios";
import { Outlet } from "react-router-dom";
import defaultBackground from "./../../assets/img/default_bg_02.png";
import { UserContext } from "../../contexts/user.context.jsx";
import { useQuery, useMutation, useQueryClient } from "react-query";
import "./Talent.scss";

export default function Talent({showNewConversation}) {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const queryClient = useQueryClient();
  const [showCreatedConversation, setShowCreatedConversation] = useState(null)

  // // Toggle display add-commssion-form
  // const [showAddCommissionForm, setShowAddCommissionForm] = useState(false);

  // Toggle display edit-cover-form
  const [showEditCoverForm, setShowEditCoverForm] = useState(false);

  //Toggle active buttons
  const [activeButton, setActiveButton] = useState("artworks");
  const [showUploadArtworkBtn, setShowUploadArtworkBtn] = useState(true);
  // const [showAddCommissionBtn, setShowAddCommissionBtn] = useState(false);

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

  const fetchTalent = async () => {
    try {
      if (id) {
        // console.log(id);
        // console.log(user?._id);
        const response = await axios.get(`http://localhost:3000/users/${id}`, {
          widthCredentials: true,
        });
        return response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCoverPhoto = async () => {
    try {
      if (id) {
        console.log(id);
        console.log(user?._id);
        const response = await axios.get(`http://localhost:3000/users/${id}`, {
          widthCredentials: true,
        });
        console.log("Fetched new cover photo");
        return response.data.bg;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Use Query for edit cover photo
  const { data: coverPhoto } = useQuery({
    queryKey: ["fetchCoverPhoto"],
    queryFn: fetchCoverPhoto,
  });

  const handleUploadCoverPhoto = async (file) => {
    try {
      // Step 2: Post image to url2
      const uploadFile = async () => {
        let fd = new FormData();
        fd.append("file", file);
        console.log(fd.get("file"));
        const res1 = await axios.put(
          `http://localhost:3000/users/${id}/editCover`,
          fd,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(res1);
        console.log(res1.data.url);
        return res1.data.url;
      };

      const uploadFileAndUpdateUserInfo = async () => {
        try {
          let fd = new FormData();
          const coverPhoto = await uploadFile();

          const res2 = await axios.put(
            `http://localhost:3000/users/${id}`,
            { bg: coverPhoto },
            {
              withCredentials: true,
            }
          );

          console.log("Updated cover photo:", res2.data.bg);
          return res2.data.bg;
        } catch (error) {
          console.error("Error:", error);
          // Handle the error as needed
        }
      };

      // Await the result of uploadFilesAndCreateArtwork
      const response = await uploadFileAndUpdateUserInfo();
      console.log("Response", response);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const coverPhotoMutation = useMutation({
    mutationFn: handleUploadCoverPhoto,
    onSuccess: async () => {
      // Invalidate and refetch
      alert("Handle submit in parent component");
      await queryClient.invalidateQueries({ queryKey: ["fetchCoverPhoto"] });
    },
  });

  // useQuery for fetch talent info
  const { data: talent } = useQuery({
    queryKey: ["fetchTalent"],
    queryFn: fetchTalent,
  });

  const handleSubmitTalentInfo = async (file, inputs) => {
    return { abc: "abc" };
    // try {
    //   // Step 2: Post image to url2
    //   const uploadFile = async () => {
    //     let fd = new FormData();
    //     fd.append("file", file);
    //     console.log(fd.get("file"));
    //     const res1 = await axios.put(
    //       `http://localhost:3000/users/${id}/editAvatar`,
    //       fd,
    //       {
    //         withCredentials: true,
    //         headers: {
    //           "Content-Type": "multipart/form-data",
    //         },
    //       }
    //     );
    //     console.log(res1);
    //     console.log(res1.data.url);
    //     return res1.data.url;
    //   };

    //   const uploadFileAndUpdateUserInfo = async () => {
    //     try {
    //       inputs.avatar = await uploadFile();

    //       const res2 = await axios.put(
    //         `http://localhost:3000/users/${id}`,
    //         inputs,
    //         {
    //           withCredentials: true,
    //         }
    //       );

    //       console.log("Updated user info:", res2.data);
    //       return res2.data;
    //     } catch (error) {
    //       console.error("Error:", error);
    //       // Handle the error as needed
    //     }
    //   };

    //   // Await the result of uploadFilesAndCreateArtwork
    //   const response = await uploadFileAndUpdateUserInfo();
    //   console.log("Response", response);
    //   return response;
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const talentInfoMutation = useMutation({
    mutationFn: handleSubmitTalentInfo,
    onSuccess: async () => {
      // Invalidate and refetch
      alert("Handle submit in parent component");
      await queryClient.invalidateQueries({ queryKey: ["editTalentInfo"] });
    },
  });

  const handleChildEvent = (data) =>{
    setShowCreatedConversation(data)
    showNewConversation(data)
  }

  return (
    <>
      <div className="talent-profile">
        <div className="talent-profile--left">
          <Sidebar showCreatedConversation={handleChildEvent} talent={talent} talentInfoMutation={talentInfoMutation} handleSubmitTalentInfo={handleSubmitTalentInfo}/>
        </div>

        <div className="talent-profile--right">
          <div className="talent-profile__bg">
            <img
              //
              src={
                coverPhoto
                  ? `../../public/uploads/users/${coverPhoto}`
                  : defaultBackground
              }
              className="talent-profile__bg-img"
            />
            {user?._id === id && (
              <button
                className="talent-profile__bg-btn edit-cover-btn"
                onClick={() => {
                  setShowEditCoverForm(true);
                }}
              >
                <i className="fa-solid fa-image"></i> Edit cover photo
              </button>
            )}
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
              {/* 
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
              </Link> */}

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

              <Link to={`talents/${talent?._id}/order-dashboard`}>
                <button
                  className={`talent-profile__button-item ${
                    activeButton === "order-dashboard" ? "active" : ""
                  }`}
                  onClick={() => handleButtonClick("order-dashboard")}
                >
                  <i className="bx bx-info-circle"></i>
                  Orders
                </button>
              </Link>

              <Link to={`talents/${talent?._id}/feedbacks`}>
                <button
                  className={`talent-profile__button-item ${
                    activeButton === "feedbacks" ? "active" : ""
                  }`}
                  onClick={() => handleButtonClick("feedbacks")}
                >
                  <i className="bx bx-star"></i>
                  Reviews
                </button>
              </Link>
            </div>

            {/* <div className="talent-profile__button-container--right">
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
            </div> */}
          </div>
          <hr />
          <Outlet talentId={id} />
        </div>

        {/* {showAddCommissionForm && (
          <AddCommission setShowAddCommissionForm={setShowAddCommissionForm} />
        )} */}

        {showEditCoverForm && (
          <EditCover
            setShowEditCoverForm={setShowEditCoverForm}
            handleUploadCoverPhoto={handleUploadCoverPhoto}
            fetchTalent={fetchTalent}
            coverPhotoMutation={coverPhotoMutation}
          />
        )}
      </div>
    </>
  );
}
