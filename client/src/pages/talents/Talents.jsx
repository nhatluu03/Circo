import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Talents.scss";
import FieldSlider from "../../components/fieldSlider/FieldSlider.jsx";
import defaultAvatar from "./../../assets/img/default_avt.png";

export default function Talents() {
  const [talents, setTalents] = useState([
    // {
    //   _id: "̃32892334",
    //   fullname: "Luu Quoc Nhat",
    //   username: "nhat_luu",
    //   images: [
    //     "data:image/jpeg;base64,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",
    //     "data:image/jpeg;base64,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",
    //     "data:image/jpeg;base64,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",
    //   ],
    //   badges: ["trusted", "featured"],
    //   followers: 1600,
    //   commissions: 148,
    //   rating: 4.5,
    // },
  ]);

  const [showFilterBar, setShowFilterBar] = useState(false);
  const [fields, setFields] = useState([]);
  const [filters, setFilters] = useState({
    creativeFields: {},
    badges: {
      trusted: false,
      topContributor: false,
      emerging: false,
    },
  });

  useEffect(() => {
    const fetchFields = async () => {
      try {
        const response = await axios.get("http://localhost:3000/fields");
        const initialCreativeFields = {};
        response.data.forEach((field) => {
          initialCreativeFields[field.name] = false;
        });

        setFields(response.data);
        setFilters({
          ...filters,
          creativeFields: initialCreativeFields,
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchFields();
  }, []);

  const handleCheckboxChange = (category, option) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [category]: {
        ...prevFilters[category],
        [option]: !prevFilters[category][option],
      },
    }));
  };

  const handleFilteringSubmit = () => {
    // Apply filters to talents array and update state
    const filteredTalents = talents.filter((talent) => {
      // Implement your filtering logic here based on the selected checkboxes
      // For simplicity, let's assume that if any option is selected, the talent is included
      return Object.values(filters).some((options) =>
        Object.values(options).some(Boolean)
      );
    });

    setTalents(filteredTalents);
  };

  useEffect(() => {
    const fetchTalents = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users");
        console.log(response.data);
        setTalents(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTalents();
  }, []);

  return (
    <div className="talents">
      <FieldSlider showFilterBar={showFilterBar} fields={fields} setShowFilterBar={setShowFilterBar}/>

      <div className="talents-content">
        <div
          className={`talents-content--left ${showFilterBar ? "stretch" : ""}`}
        >
          <div className="talents-content--left filter-bar-container">
            <div className="filter-bar-item">
              <h4 className="filter-bar-item__header">
                <i class="fa-solid fa-list"></i>Creative Fields
              </h4>
              <hr />
              <div className="filter-bar-item__option-container">
                {Object.entries(filters.creativeFields).map(
                  ([field, checked]) => (
                    <div className="form-field filter-bar-item__option-item">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() =>
                          handleCheckboxChange("creativeFields", field)
                        }
                        id={`filtering-${field}`}
                      />
                      <label htmlFor={`filtering-${field}`} key={field}>
                        {field}
                      </label>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="filter-bar-item">
              <h4 className="filter-bar-item__header">
                <i class="fa-solid fa-award"></i> Badges
              </h4>
              <hr />
              <div className="filter-bar-item__option-container">
                {/* <p className="filter-bar-item__option-item">Trusted</p>
                <p className="filter-bar-item__option-item">Top contributor</p>
                <p className="filter-bar-item__option-item">Emerging</p> */}
                {Object.entries(filters.badges).map(([badge, checked]) => (
                  <div className="form-field filter-bar-item__option-item">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => handleCheckboxChange("badges", badge)}
                      id={`filtering-${badge}`}
                    />
                    <label htmlFor={`filtering-${badge}`} key={badge}>
                      {badge}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleFilteringSubmit}
              className="filtering-submit-btn btn btn-3"
            >
              Apply Filters
            </button>
          </div>
        </div>

        <div
          className={`talents-content--right ${
            !showFilterBar ? "stretch" : ""
          }`}
        >
          <div className="talent-container">
            {talents.map((talent, index) => (
              <Link
                key={index}
                className="talent-item"
                to={`/talents/${talent.talent._id}`}
              >
                <div className="talent-item__bg-container" key={index}>
                  <img
                    src={
                      talent.top3Artworks.length >= 1
                        ? talent.top3Artworks[0].image
                        : "https://www.hobbycraft.co.uk/dw/image/v2/BHCG_PRD/on/demandware.static/-/Sites-hobbycraft-uk-master/default/dwb4e5319b/images/Ideas/art/main/ideas_main_how-to-create-a-large-scale-abstract-artwork.jpg?sw=680&q=85"
                    }
                    className="talent-item__bg-item"
                  />
                  <img
                    src={
                      talent.top3Artworks.length >= 1
                        ? talent.top3Artworks[1]?.image
                        : "https://www.hobbycraft.co.uk/dw/image/v2/BHCG_PRD/on/demandware.static/-/Sites-hobbycraft-uk-master/default/dwb4e5319b/images/Ideas/art/main/ideas_main_how-to-create-a-large-scale-abstract-artwork.jpg?sw=680&q=85"
                    }
                    className="talent-item__bg-item"
                  />
                  <img
                    src={
                      talent.top3Artworks.length >= 1
                        ? talent.top3Artworks[2]?.image
                        : "https://www.hobbycraft.co.uk/dw/image/v2/BHCG_PRD/on/demandware.static/-/Sites-hobbycraft-uk-master/default/dwb4e5319b/images/Ideas/art/main/ideas_main_how-to-create-a-large-scale-abstract-artwork.jpg?sw=680&q=85"
                    }
                    className="talent-item__bg-item"
                  />
                </div>

                <div className="user-info">
                  <img
                    src={talent.avatar ? talent.avatar : defaultAvatar}
                    className="user-info__avt "
                  />

                  <div className="user-info__name">
                    <p className="user-info__name__fullname">
                      {talent.talent.username}
                    </p>
                    <p className="user-info__name__username">
                      @{talent.talent.username}
                    </p>
                  </div>
                </div>

                <div className="talent-item__extra">
                  <span>{talent.talent.followers.length} followers</span>
                  &#x2022;
                  <span>{talent.commissions} commissions</span>&#x2022;
                  <span>
                    {talent.talent.rating}
                    <img
                      className="rating-ic"
                      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAjRJREFUSEu1lU9oE0EUxr+3iYKipMbZ2KMgIiIozeylYKEoVvwDHtRbURREPAid0CKoh1xaPHXXi6deVPQoqBQRVBSLB5vdai/Vk/SY7qYUi3pIsk+2aTVN0uyI7dxm93vfb2a+N7uEDR60wf7QBnC+N1lKfX8FonDnwvY+yr+t6CxOGxA42X4wPYxMGdxvKu/RugJ8W34m4GANgGlTuYfWDRDY2SMAva43ZDZ6zdzkuziI1hGVHDnOjJOrzfiZUN6Z/wb4jrWPmGeApobgZDKxp+P6x2/tIH92ENztOspMp4gpAyDDwC4iZMAwASTWMKmC4DNjjoAigDkGigQeF8p7E9X8BdhyEcC2uC1rvi8K5XY2Aq4BuKdp0E7GYFwSOff+KkA0KdnWZQaPtThvXe5PA3QurQovVgqauqjkyPPMeAwgqeu6rPNDGH0ZNfmpvq5lm87b1okQ/BTAJk3I10Q1PL5jcGq2Ub/mPQhsGeUR5RI7DEJPesCdaCVsA7A+ANwd674koNtCFYa1AbUv5+Iv3RwYmDCV26MNmHfk4ZDxXm/1S6pqpVJOdQ5N/9DKIHDkDTDuNIoZ5NR6mwea4XxWKO+JHmBUPgfhdJ14hjm8YOamCtEzf7TLIjKiVt67omFgzFTuFS2Ab0ufAAGgTODh9FYaoatuub6Y8wc2B6ktNwl8azmrWaHc3VqAwJYvAXSgioti0P3SLovAzu4HjAdAuCCUd0wL8A/hxkq1fjixLm0EvwGYQ7sZl7lmPgAAAABJRU5ErkJggg=="
                    />
                  </span>
                </div>

                <div className="talent-item__badge-container">
                  {["trusted", "featured"].map((badge) => {
                    return (
                      <div className="talent-item__badge-item">
                        {badge.charAt(0).toUpperCase() + badge.slice(1)}
                      </div>
                    );
                  })}
                </div>

                <button className="order-commission-btn btn-1">
                  Order commission
                </button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
