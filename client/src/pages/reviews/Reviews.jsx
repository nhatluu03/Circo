import { useState } from "react";
import "./Reviews.scss";
import SampleArtwork01 from "../../assets/img/artwork_01.png";
import SampleArtwork02 from "../../assets/img/artwork_02.png";

export default function Reviews() {
  const [reviews, setReviews] = useState([
    {
      fullname: "Jam Circo",
      username: "jam_circo",
      rating: 4,
      content:
        "Nice artwork. The experience was over my expectations. Highly recommend others to order his services.",
      created_at: "Jan 26, 2023 at 16:40 pm",
      items: [SampleArtwork01, SampleArtwork02, SampleArtwork02],
    },
    {
        fullname: "Jam Circo",
        username: "jam_circo",
        rating: 4,
        content:
          "Nice artwork. The experience was over my expectations. Highly recommend others to order his services.",
        created_at: "Jan 26, 2023 at 16:40 pm",
        items: [SampleArtwork01, SampleArtwork02, SampleArtwork02],
      },
      {
        fullname: "Jam Circo",
        username: "jam_circo",
        rating: 4,
        content:
          "Nice artwork. The experience was over my expectations. Highly recommend others to order his services.",
        created_at: "Jan 26, 2023 at 16:40 pm",
        items: [SampleArtwork01, SampleArtwork02, SampleArtwork02],
      },
      {
        fullname: "Jam Circo",
        username: "jam_circo",
        rating: 4,
        content:
          "Nice artwork. The experience was over my expectations. Highly recommend others to order his services.",
        created_at: "Jan 26, 2023 at 16:40 pm",
        items: [SampleArtwork01, SampleArtwork02, SampleArtwork02],
      },
  ]);

  return (
    <div class="reviews">
      <h3 className="profile-page__header">Reviews</h3>
      <div className="rating">
        {/* <span className="rating__count">(100 reviews) </span> */}
        <span className="rating__score">4.5</span>
        <span className="rating__star">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
        </span>
      </div>

      <div className="review-category-container">
        <button className="review-category-item btn btn-3">All (78)</button>
        <button className="review-category-item btn btn-1">5 stars (78)</button>
        <button className="review-category-item btn btn-1">4 stars (78)</button>
        <button className="review-category-item btn btn-1">3 stars (78)</button>
        <button className="review-category-item btn btn-1">2 stars (78)</button>
        <button className="review-category-item btn btn-1">1 star (78)</button>
      </div>
      <div className="review-container">
        {reviews.map((review) => {
          return (
            <div className="review-item">
              <div className="review-item--left">
                <div className="user-info">
                  <img
                    src={SampleArtwork01}
                    alt=""
                    className="user-info__avt"
                  />
                  <div className="user-info__name">
                    <p className="user-info__name__fullname">
                      {review.fullname}
                    </p>
                    <p className="user-info__name__username">
                      @{review.username}
                    </p>
                  </div>
                </div>
                <div className="rating__star">
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                </div>
                <div className="review-item__details">
                  <p className="review-item__details__content">
                    {review.content}
                  </p>
                  <span className="review-item__details__timestamp">
                    Jan 26, 2023 at 16:40 pm
                  </span>
                </div>
              </div>
              <div className="review-item--right">
                <div className="review-item__artwork-container">
                  {review.items?.map((item) => {
                    return (
                      <img
                        src={item}
                        alt=""
                        className="review-item__artwork-item"
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
