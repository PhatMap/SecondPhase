import React, { useEffect, useState } from "react";
import ProgressBar from "../layout/ProgressBar";
import ShopInfor from "./ShopInfor";
import ShippingMethod from "./ShippingMethod";
import TaxInfor from "./TaxInfor";
import IdentificationInfor from "./IdentificationInfor";
import Finish from "./Finish";

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

  const [formData, setFormData] = useState(() => {
    const savedFormData = localStorage.getItem("applicationFormData");
    return savedFormData
      ? JSON.parse(savedFormData)
      : {
          user_id: "",
          shopInfor: {
            shopName: "",
            email: "",
            phoneNumber: "",
            pickupAddress: {
              fullName: "",
              phoneNumber: "",
              address: {
                province: "",
                district: "",
                ward: "",
                detail: "",
              },
            },
          },
          shippingMethod: [],
          taxInfor: {
            taxCode: "",
            billingEmail: "",
            businessAddress: {
              province: "",
              district: "",
              ward: "",
              detail: "",
            },
          },
          identificationInfor: {
            citizenId: "",
            cardImage: { public_id: "", url: "" },
            selfieWithCard: { public_id: "", url: "" },
          },
        };
  });

  useEffect(() => {
    localStorage.setItem("currentStepIndex", currentStepIndex.toString());
    localStorage.setItem("applicationFormData", JSON.stringify(formData));
  }, [currentStepIndex, formData]);

  const handleStepChange = (direction) => {
    setCurrentStepIndex((prevIndex) => {
      const newIndex = direction === "next" ? prevIndex + 1 : prevIndex - 1;
      return Math.max(0, Math.min(newIndex, steps.length - 1));
    });
  };

  const renderStep = () => {
    switch (currentStepIndex) {
      case 0:
        return (
          <ShopInfor
            shopInfor={formData.shopInfor}
            setShopInfor={(shopInfor) =>
              setFormData({ ...formData, shopInfor })
            }
          />
        );
      case 1:
        return (
          <ShippingMethod
            shippingMethod={formData.shippingMethod}
            setShippingMethod={(shippingMethod) =>
              setFormData({ ...formData, shippingMethod })
            }
          />
        );
      case 2:
        return (
          <TaxInfor
            taxInfor={formData.taxInfor}
            setTaxInfor={(taxInfor) => setFormData({ ...formData, taxInfor })}
          />
        );
      case 3:
        return (
          <IdentificationInfor
            identificationInfor={formData.identificationInfor}
            setIdentificationInfor={(identificationInfor) =>
              setFormData({ ...formData, identificationInfor })
            }
          />
        );
      case 4:
        return <Finish formData={formData} />;
      default:
        return null;
    }
  };

  return (
    <div className="shop-register-container">
      <ProgressBar step={steps[currentStepIndex]} />
      {renderStep()}
      <button
        onClick={() => handleStepChange("back")}
        disabled={currentStepIndex === 0}
      >
        Back
      </button>
      <button
        onClick={() => handleStepChange("next")}
        disabled={currentStepIndex === steps.length - 1}
      >
        Next
      </button>
    </div>
  );
};

export default Register;
