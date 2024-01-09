import { useState } from "react";
import "./Reviews.scss";
import SampleArtwork01 from "../../assets/img/artwork_01.png";
import SampleArtwork02 from "../../assets/img/artwork_02.png";

export default function Reviews() {
  const [reviews, setReviews] = useState([
    {
      fullname: "Jam Circo",
      username: "jam_circo",
      avatar: "https://i.pinimg.com/564x/a4/6c/9f/a46c9ffb4349eb54f937d7d256a126c9.jpg",
      rating: 5,
      content:
        "Nice artwork. The experience was over my expectations. Highly recommend others to order his services.",
      created_at: "Dec 26, 2023 at 17:28 pm",
      items: ["https://i.pinimg.com/564x/4f/be/08/4fbe087415eb5dda65d0c045450a7a0b.jpg", "https://i.pinimg.com/564x/cf/97/f3/cf97f3213e836ebfe25678072b16cc32.jpg", "https://i.pinimg.com/736x/f2/fe/9c/f2fe9cf4472e4d328075a3e89cdd7778.jpg"],
    },
    {
        fullname: "Derca Chen",
        username: "derca_ch",
        avatar: "https://i.pinimg.com/564x/89/ea/f7/89eaf735bfb3004056da924fcd98efe4.jpg",
        rating: 5,
        content:
          "Incredible talent and a true pleasure to work with! The commissioned artwork exceeded my wildest dreams. If you're looking for a skilled artist who brings visions to life, look no further!",
        created_at: "Dec 26, 2023 at 17:30 pm",
        items: [SampleArtwork01, SampleArtwork02, SampleArtwork02],
      },
      {
        fullname: "Wissam El",
        username: "wiss_el",
        avatar: "https://i.pinimg.com/736x/05/4f/f8/054ff86c53ab83db8e0e53c3f2a856c9.jpg",
        rating: 5,
        content:
          "An absolute joy to collaborate with! The artist's unique style and dedication to capturing my vision resulted in a stunning piece. I wholeheartedly recommend their services to anyone seeking top-notch artistry.",
        created_at: "Dec 26, 2023 at 17:36 pm",
        items: ["https://i.pinimg.com/736x/d2/49/97/d24997a81e40231808cfa6f80d77c398.jpg", "https://i.pinimg.com/736x/f9/9d/9b/f99d9b6c672f881d4667a54a791fcb07.jpg"],
      },
      {
        fullname: "Ruby Nguyen",
        username: "ruby_art",
        avatar: "https://i.pinimg.com/564x/de/25/f4/de25f4e191334ed939452c43423ece9a.jpg",
        rating: 5,
        content:
          "Exceptional work that speaks volumes! The artist not only delivered a visually striking piece but also made the entire process seamless and enjoyable. I can't recommend their services enough – a true professional!",
        created_at: "Dec 26, 2023 at 17:38 pm",
        items: ["https://i.pinimg.com/564x/b3/ed/b4/b3edb4815572282b932f1a335879b3d4.jpg", "https://i.pinimg.com/564x/ef/78/7d/ef787dc87d706f6ce8d0cdf425e0427b.jpg", "https://i.pinimg.com/564x/d7/e2/20/d7e22008c3f1f154b2809185f394580c.jpg"],
      },
  ]);

  return (
    <div class="reviews">
      <h3 className="profile-page__header">Reviews</h3>
      <div className="rating">
        {/* <span className="rating__count">(100 reviews) </span> */}
        <span className="rating__score">5.0</span>
        <span className="rating__star">
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
          <i class="fa-solid fa-star"></i>
        </span>
      </div>

      <div className="review-category-container">
        <button className="review-category-item btn btn-3">All (4)</button>
        <button className="review-category-item btn btn-1">5 stars (4)</button>
        <button className="review-category-item btn btn-1">4 stars (0)</button>
        <button className="review-category-item btn btn-1">3 stars (0)</button>
        <button className="review-category-item btn btn-1">2 stars (0)</button>
        <button className="review-category-item btn btn-1">1 star (0)</button>
      </div>
      <div className="review-container">
        {reviews.map((review) => {
          return (
            <div className="review-item">
              <div className="review-item--left">
                <div className="user-info">
                  <img
                    src={review.avatar}
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
                  {review.created_at}
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
