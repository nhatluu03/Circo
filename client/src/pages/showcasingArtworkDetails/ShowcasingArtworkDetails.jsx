import { useState, useEffect, useContext } from "react";
import "./ShowcasingArtworkDetails.scss";
import defaultAvatar from "../../assets/img/default_avt.png";
import { timeAgo } from "../../assets/js/timeFormatter.js";
import axios from "axios";
import { UserContext } from "../../contexts/user.context.jsx";

const showcasingArtworkDetails = ({
  showcasingArtwork,
  closeArtwork,
  nextArtwork,
  prevArtwork,
}) => {
  // const [showAllReplies, setShowAllReplies] = useState(false);
  const [inputs, setInputs] = useState(null);
  const handleCommentChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };
  const { user } = useContext(UserContext);

  const handleCommentSubmit = async (event) => {
    event.preventDefault();

    try {
      inputs.userId = user._id;
      console.log(inputs);
      const response = await axios.put(
        `http://localhost:3000/artworks/${showcasingArtwork._id}/comment`,
        inputs,
        { withCredentials: true }
      );

      console.log(response.data);
    } catch (error) {
      console.error("Error submitting comment:", error);
      // Handle error scenarios
    }
  };

  return (
    <div className="overlay">
      <div className="artwork-content">
        <div className="artwork-content--left">
          <img
            className="artwork-content__img"
            src={`../../public/uploads/artworks/${showcasingArtwork.images[0]}`}
          />
        </div>
        <div className="artwork-content--right">
          <div className="artwork-content__talent-info">
            <div className="user-info">
              <img
                className="avt-m"
                src="https://www.imagelighteditor.com/img/bg-after.jpg"
                alt={`Avatar of ${showcasingArtwork.talent.username}`}
              />
              <div className="user-info__name">
                <p className="user-info__name__fullname">
                  {showcasingArtwork.talent.fullname
                    ? showcasingArtwork.talent.fullname
                    : "Luu Quoc Nhat"}
                </p>
                <span className="user-info__name__username">
                  @{showcasingArtwork.talent.username}
                </span>
              </div>
            </div>

            {(user._id == showcasingArtwork.talent) && (
              <i class="fa-solid fa-ellipsis form-edit-ic"></i>
            )}
            <i
              class="fa-solid fa-xmark form-close-ic"
              onClick={closeArtwork}
            ></i>
          </div>
          <p className="artwork-content__desc">
            {showcasingArtwork.description}
          </p>
          <div className="artwork-content__interaction-container">
            <div className="artwork-content__interaction-container--left">
              <div className="artwork-content__interaction-item">
                <i class="fa-regular fa-heart"></i>{" "}
                {showcasingArtwork.reacts.length}
              </div>
              <div className="artwork-content__interaction-item">
                <i class="fa-regular fa-message"></i>{" "}
                {showcasingArtwork.comments.length}
              </div>
            </div>
            <div className="artwork-content__interaction-container--right">
              <div className="artwork-content__interaction-item">
                <i class="fa-regular fa-bookmark"></i>
              </div>
            </div>
          </div>
          <hr />
          <div className="artwork-content__comment-container">
            {showcasingArtwork.comments.length > 0 ? (
              showcasingArtwork.comments.map((comment) => {
                return (
                  <div className="artwork-content__comment-item">
                    <div className="user-info">
                      <img
                        className="avt-s"
                        src={`${
                          comment.user.avatar
                            ? "../../public/uploads/users/" +
                              comment.user.avatar
                            : defaultAvatar
                        }`}
                        alt={`Avatar of ${showcasingArtwork.talent.username}`}
                      />
                    </div>
                    <div className="artwork-content__comment-item__content">
                      <div className="artwork-content__comment-item__content__details">
                        <p>{comment.user.username}</p>
                        <p>{comment.content}</p>
                      </div>
                      <div className="artwork-content__comment-item__content__extra">
                        <span>{timeAgo(comment.created_at)}</span>
                        <span>Love</span>
                        <span>Reply</span>
                        <span>
                          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAH9JREFUSEvt07EJQmEMhdHzprAQBHEgl7FxA3EgxxEFC0ewU5RU4k9I8SqTKlySe+Ejmcxc08z+OiAl3Ij+FNEWBzyxwyk4VPXP2q8rumEZpmdsor9jUdCHAVeswuiCdfRVfRjwRnHEA/svRBV9GJCeXmWgPzml1YgaUUogHXgBgiQeGSYuyzUAAAAASUVORK5CYII=" />
                        </span>
                        <br />
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="extra-msg gray">
                Let's add your first comment on this masterpiece
              </p>
            )}

            <div className="new-comment">
              <hr />
              <form className="comment-form">
                <div className="form-field">
                  <input
                    type="text"
                    className="form-field__input"
                    name="content"
                    placeholder="Share your thoughts"
                    onChange={handleCommentChange}
                  />
                </div>
                <i
                    class="fa-regular fa-paper-plane"
                    onClick={handleCommentSubmit}
                  ></i>
              </form>
            </div>
          </div>
        </div>
      </div>
      <img
        className="prev-artwork-btn"
        onClick={prevArtwork}
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAALxJREFUSEvt0jFqAmEQhuHHQwRMn4hnEMFbCKmFXCdYC97FCLmDjb2QQ4SBLAQLZ343Cxa77b+878w338TA32RgvlGQJvyQEU3xho90fJqPHPBPvOIdu0zSElHAj3jBGQtc/kvwhK9f+AmrCjzklQ0CHrHMEfAlvrPJu/dM0Ate2WBwQQzRS5JF1EV5feTyHaqCEP2tablJLYJOcsAMG+yzNrUKgveMNbYZvNKiCuPmP/ds0CQdBWlcg0f0A4wQHhnVdK5sAAAAAElFTkSuQmCC"
      />
      <img
        className="next-artwork-btn"
        onClick={nextArtwork}
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAALpJREFUSEvt08EJwkAQBdCXHgTvXuxBQdsRr4KdiHfBQgSxBkELEAVrkAWFKMTsBAMekvNk3s6f3ULLX9Fyfx1Qm/BfRbTEBpfaY5cKcieYY4UTJhEkF+jjgAHOGOGWM0kukHqVkeNzklokAryQHYbIQqJAQnrYl5Ax7lVx/QJIS6+MKgp8nv5r8zRVBEhLDuUfARrdoAgww/p5c6a45ryBCJBqF9hGXnEUyD30W11kyR3QKIHan1rfwQMvRiIZKJbEUwAAAABJRU5ErkJggg=="
      />
    </div>
  );
};

export default showcasingArtworkDetails;
