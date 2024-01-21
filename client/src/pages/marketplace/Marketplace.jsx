import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Marketplace.scss";
import FieldSlider from "../../components/fieldSlider/FieldSlider.jsx";
import SellingArtwork from "../../components/sellingArtwork/SellingArtwork.jsx";

export default function Martketplace() {
  const [sellingArtworks, setSellingArtworks] = useState([]);

  const [showFilterBar, setShowFilterBar] = useState(false);
  const [fields, setFields] = useState([]);

  const fromRef = useRef();
  const toRef = useRef();
  const descendingRef = useRef();
  const ascendingRef = useRef();

  useEffect(() => {
    const fetchFields = async () => {
      try {
        const response = await axios.get("http://localhost:3000/fields");
        const initialCreativeFields = {};
        response.data.forEach((field) => {
          initialCreativeFields[field.name] = false;
        });

        setFields(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFields();
  }, []);

  useEffect(() => {
    const fetchSellingArtworks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/artworks?forSelling=true"
        );
        console.log(response.data);
        setSellingArtworks(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSellingArtworks();
  }, []);
  const apply = async () => {
    try {
      let sortOrder = "asc";
      if (descendingRef.current.checked) {
        sortOrder = "desc";
      }
      if (fromRef.current || toRef.current) {
        const response = await axios.get(
          `http://localhost:3000/artworks?forSelling=true&from=${fromRef.current.value}&to=${toRef.current.value}`
        );
        let sortedArtworks = [...response.data];
        sortedArtworks.sort((a, b) => {
          const valueA = a.price;
          const valueB = b.price;

          if (sortOrder === "asc") {
            return valueA - valueB;
          } else {
            return valueB - valueA;
          }
        });
        setSellingArtworks(sortedArtworks);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
                <i class="fa-solid fa-award"></i> Price range
              </h4>
              <hr />
              <div className="filter-bar-item__option-container">
                {/* <p className="filter-bar-item__option-item">Trusted</p>
                <p className="filter-bar-item__option-item">Top contributor</p>
                <p className="filter-bar-item__option-item">Emerging</p> */}
                {/* {Object.entries(filters.badges).map(([badge, checked]) => (
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
                ))} */}
                <input type="number" placeholder="From" ref={fromRef} />
                <input type="number" placeholder="To" ref={toRef} />
              </div>
            </div>
            <div className="filter-bar-item">
              <h4 className="filter-bar-item__header">
                <i class="fa-solid fa-award"></i> Sort by
              </h4>
              <hr />
              <div className="filter-bar-item__option-container">
                <div className="filter-bar-item__option-item">
                  <input
                    id="ascending"
                    ref={ascendingRef}
                    value="ascending"
                    type="checkbox"
                  />
                  <label id="descending">Ascending</label>
                </div>
                <div className="filter-bar-item__option-item">
                  <input
                    id="ascending"
                    ref={descendingRef}
                    value="descending"
                    type="checkbox"
                  />
                  <label htmlFor="descending">Descending</label>
                </div>
              </div>
            </div>

            <button onClick={apply} className="filtering-submit-btn btn btn-3">
              Apply Filters
            </button>
          </div>
        </div>

        <div
          className={`talents-content--right ${
            !showFilterBar ? "stretch" : ""
          }`}
        >
          <div className="selling-artwork-container">
            {sellingArtworks.map((sellingArtwork) => {
              return <SellingArtwork sellingArtwork={sellingArtwork} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
