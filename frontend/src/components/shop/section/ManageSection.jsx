import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import Section from "./Section";
import SectionOption from "./SectionOption";
import UpdateSection from "./UpdateSection";
import DeleteSection from "./DeleteSection";

const ManageSection = ({ onClose, shop, categories }) => {
  const [option, setOption] = useState("choose");
  const [index, setIndex] = useState(null);

  const handleOverlayClick = (event) => {
    if (event.target.className === "section-overlay") {
      onClose();
    }
  };

  const renderStep = () => {
    switch (option) {
      case "choose":
        return (
          <SectionOption
            setOption={setOption}
            shop={shop}
            categories={categories}
            setIndex={setIndex}
          />
        );
      case "add":
        return (
          <Section setOption={setOption} categories={categories} setIndex />
        );
      case "fix":
        return (
          <UpdateSection
            setOption={setOption}
            categories={categories}
            section={shop.sections[index]}
            index={index}
          />
        );
      case "delete":
        return (
          <DeleteSection
            setOption={setOption}
            index={index}
            section={shop.sections[index]}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="section-overlay" onClick={handleOverlayClick}>
      {renderStep()}
    </div>
  );
};

export default ManageSection;
