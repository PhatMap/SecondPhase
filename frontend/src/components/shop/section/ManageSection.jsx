import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Section from "./Section";
import SectionOption from "./SectionOption";

const ManageSection = ({ onClose, shop, categories }) => {
  const [option, setOption] = useState("choose");

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
          />
        );
      case "add":
        return <Section setOption={setOption} categories={categories} />;
      default:
        return null;
    }
  };

  return (
    <div className="section-overlay" onClick={handleOverlayClick}>
      <ToastContainer />
      {renderStep()}
    </div>
  );
};

export default ManageSection;
