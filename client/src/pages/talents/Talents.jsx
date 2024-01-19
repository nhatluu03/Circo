import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Talents.scss";
import FieldSlider from "../../components/fieldSlider/FieldSlider.jsx";
import defaultAvatar from "./../../assets/img/default_avt.png";

export default function Talents() {
  const [talents, setTalents] = useState([]);

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

  // const handleFilteringSubmit = () => {
  //   // Get selected creative fields
  //   const selectedCreativeFields = Object.entries(filters.creativeFields)
  //     .filter(([field, checked]) => checked)
  //     .map(([field]) => field);
  
  //   // Apply filters to talents array and update state
  //   const filteredTalents = talents.filter((talent) => {
  //     const talentCreativeFields = talent.creativeFields?.map((field) => field.name) || [];
  //     return selectedCreativeFields.some((selectedField) =>
  //       talentCreativeFields.includes(selectedField)
  //     );
  //   });
  
  //   setTalents(filteredTalents);
  // };  
  const handleFilteringSubmit = () => {
    // Get selected creative fields
    const selectedCreativeFields = Object.entries(filters.creativeFields)
      .filter(([field, checked]) => checked)
      .map(([field]) => field);
  
    // Get selected badges
    const selectedBadges = Object.entries(filters.badges)
      .filter(([badge, checked]) => checked)
      .map(([badge]) => badge);
  
    // Apply filters to talents array and update state
    const filteredTalents = talents.filter((talent) => {
      const talentCreativeFields = talent.creativeFields?.map((field) => field.name) || [];
      const talentBadges = talent.badges || [];
  
      const creativeFieldsMatch = selectedCreativeFields.length === 0 ||
        selectedCreativeFields.some((selectedField) => talentCreativeFields.includes(selectedField));
  
      const badgesMatch = selectedBadges.length === 0 ||
        selectedBadges.every((selectedBadge) => talentBadges.includes(selectedBadge));
  
      return creativeFieldsMatch && badgesMatch;
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
      <FieldSlider
        showFilterBar={showFilterBar}
        fields={fields}
        setShowFilterBar={setShowFilterBar}
      />

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
