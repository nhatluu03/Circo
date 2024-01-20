import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Marketplace.scss";
import FieldSlider from "../../components/fieldSlider/FieldSlider.jsx";
import SellingArtwork from "../../components/sellingArtwork/SellingArtwork.jsx";

export default function Martketplace() {
  const [sellingArtworks, setSellingArtworks] = useState([]);

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

  return (
    <div className="marketplace">
      <FieldSlider
        showFilterBar={showFilterBar}
        fields={fields}
        setShowFilterBar={setShowFilterBar}
      />

      <div className="talents-content">
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
