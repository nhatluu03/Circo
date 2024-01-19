import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Marketplace.scss";
import FieldSlider from "../../components/fieldSlider/FieldSlider.jsx";

export default function Martketplace() {
  const [items, setItems] = useState([]);

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
    <div className="marketplace">
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
          <div className="selling-container">
            <div className="selling-item">
              <div className="selling-item__image-container">
                <div className="selling-item__image-container--left">
                  <img
                    src="https://via.placeholder.com/300"
                    className="selling-item__image-item"
                  />
                </div>
                <div className="selling-item__image-container--right">
                  <img
                    src="https://via.placeholder.com/300"
                    className="selling-item__image-item"
                  />
                  <img
                    src="https://via.placeholder.com/300"
                    className="selling-item__image-item"
                  />
                </div>
              </div>
              <div className="selling-item__category-container">
                <span>Watercolor</span>
                <span>Illustration</span>
              </div>
              <h4 className="selling-item__title">[Free Ship] Cloudy Night Sky A5</h4>
              <div className="selling-item__price">
                {/* <span className="selling-item__price--from">$16.20</span>
                <span className="selling-item__price--to">$25.30</span> */}
                <span className="selling-item__price--discount">$16.20</span>
                <span className="selling-item__price--original">$25.40</span>
              </div>
              <button className="btn btn-1">Add to Cart</button>
            </div>
            <div className="selling-item">
              <div className="selling-item__image-container">
                <div className="selling-item__image-container--left">
                  <img
                    src="https://via.placeholder.com/300"
                    className="selling-item__image-item"
                  />
                </div>
                <div className="selling-item__image-container--right">
                  <img
                    src="https://via.placeholder.com/300"
                    className="selling-item__image-item"
                  />
                  <img
                    src="https://via.placeholder.com/300"
                    className="selling-item__image-item"
                  />
                </div>
              </div>
              <div className="selling-item__category-container">
                <span>Watercolor</span>
                <span>Illustration</span>
              </div>
              <h4 className="selling-item__title">[Free Ship] Cloudy Night Sky A5</h4>
              <div className="selling-item__price">
                {/* <span className="selling-item__price--from">$16.20</span>
                <span className="selling-item__price--to">$25.30</span> */}
                <span className="selling-item__price--discount">$16.20</span>
                <span className="selling-item__price--original">$25.40</span>
              </div>
              <button className="btn btn-1">Add to Cart</button>
            </div>
            <div className="selling-item">
              <div className="selling-item__image-container">
                <div className="selling-item__image-container--left">
                  <img
                    src="https://via.placeholder.com/300"
                    className="selling-item__image-item"
                  />
                </div>
                <div className="selling-item__image-container--right">
                  <img
                    src="https://via.placeholder.com/300"
                    className="selling-item__image-item"
                  />
                  <img
                    src="https://via.placeholder.com/300"
                    className="selling-item__image-item"
                  />
                </div>
              </div>
              <div className="selling-item__category-container">
                <span>Watercolor</span>
                <span>Illustration</span>
              </div>
              <h4 className="selling-item__title">[Free Ship] Cloudy Night Sky A5</h4>
              <div className="selling-item__price">
                {/* <span className="selling-item__price--from">$16.20</span>
                <span className="selling-item__price--to">$25.30</span> */}
                <span className="selling-item__price--discount">$16.20</span>
                <span className="selling-item__price--original">$25.40</span>
              </div>
              <button className="btn btn-1">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
