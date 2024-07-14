import React, { useEffect, useState } from "react";
import ProgressBar from "./layout/ProgressBar";
import Shopinfor from "./Shopinfor";

const Register = () => {
  const steps = [
    "shopInfor",
    "shippingMethod",
    "taxInfor",
    "identificationInfor",
    "finish",
  ];

  const [currentStepIndex, setCurrentStepIndex] = useState(() => {
    const savedStep = localStorage.getItem("currentStepIndex");
    return savedStep ? parseInt(savedStep, 10) : 0;
  });

  const [shopInfor, setShopInfor] = useState(() => {
    const savedShopInfor = localStorage.getItem("shopInfor");
    return savedShopInfor
      ? JSON.parse(savedShopInfor)
      : {
          shopName: "",
          email: "",
          phoneNumber: "",
          pickupAddress: "",
        };
  });

  useEffect(() => {
    localStorage.setItem("currentStepIndex", currentStepIndex.toString());
  }, [currentStepIndex]);

  const handleStepChange = (direction) => {
    if (direction === "next") {
      if (currentStepIndex === 0) {
        localStorage.setItem("shopInfor", JSON.stringify(shopInfor));
      }
    }

    setCurrentStepIndex((prevIndex) => {
      const newIndex = direction === "next" ? prevIndex + 1 : prevIndex - 1;
      return Math.max(0, Math.min(newIndex, steps.length - 1));
    });
  };

  return (
    <div className="shop-register-container">
      <ProgressBar step={steps[currentStepIndex]} />
      <Shopinfor shopInfor={shopInfor} setShopInfor={setShopInfor} />
      <button onClick={() => handleStepChange("back")}>Back</button>
      <button onClick={() => handleStepChange("next")}>Next</button>
    </div>
  );
};

export default Register;
