import { useState, useRef, useEffect } from "react";
import "./FieldSlider.scss";

export default function FieldSlider({ showFilterBar, fields, setShowFilterBar }) {
  const [showPrevButton, setShowPrevButton] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);

  const sliderRef = useRef(null);
  useEffect(() => {
    const container = sliderRef.current;

    const handleScroll = () => {
      // Check if there is content to scroll to the left
      setShowPrevButton(container.scrollLeft > 0);
      // Check if there is content to scroll to the right
      setShowNextButton(
        container.scrollLeft < container.scrollWidth - container.clientWidth
      );
    };

    container.addEventListener("scroll", handleScroll);

    // Initial check on component mount
    handleScroll();

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [fields]);

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: 200, // Adjust the scroll distance as needed
        behavior: "smooth",
      });
    }
  };

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -200, // Adjust the scroll distance as needed
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="field-slider-container">
      <div className="field-container" ref={sliderRef}>
        <button
          className="field-item fixed-item"
          onClick={() => {
            setShowFilterBar(!showFilterBar);
          }}
        >
          <i className="fa-solid fa-bars field-item__img"></i>
          <p className="field-item__title">Filter</p>
        </button>
        {fields.map((field) => {
          return (
            <button className="field-item" key={field._id}>
              <img src={field.image} className="field-item__img" />
              <p className="field-item__title">{field.name}</p>
            </button>
          );
        })}
      </div>
      {showPrevButton && (
        <i
          className="fa-solid fa-angle-left field__btn prev"
          onClick={scrollLeft}
        ></i>
      )}

      {showNextButton && (
        <i
          className="fa-solid fa-angle-right field__btn next"
          onClick={scrollRight}
        ></i>
      )}
    </div>
  );
}
