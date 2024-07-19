import React, { useEffect, useState } from "react";
import ProgressBar from "../layout/ProgressBar";
import ShopInfor from "./ShopInfor";
import ShippingMethod from "./ShippingMethod";
import TaxInfor from "./TaxInfor";
import IdentificationInfor from "./IdentificationInfor";
import Finish from "./Finish";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { newApplication } from "../../../actions/applicationActions";

const Register = () => {
  const { success, error, loading } = useSelector(
    (state) => state.newApplication
  );
  const dispatch = useDispatch();

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

  // const [formData, setFormData] = useState({
  //   user_id: "",
  //   shopInfor: {
  //     shopName: "",
  //     email: "",
  //     phoneNumber: "",
  //     pickupAddress: {
  //       fullName: "",
  //       phoneNumber: "",
  //       address: {
  //         province: "",
  //         district: "",
  //         ward: "",
  //         detailed: "",
  //       },
  //     },
  //   },
  //   shippingMethod: [
  //     { name: "express", active: false },
  //     { name: "fast", active: false },
  //     { name: "economical", active: false },
  //   ],
  //   taxInfor: {
  //     taxCode: "",
  //     billingEmail: "",
  //     businessAddress: {
  //       province: "",
  //       district: "",
  //       ward: "",
  //       detailed: "",
  //     },
  //   },
  //   identificationInfor: {
  //     citizenId: "",
  //     idCardImage: { public_id: "", url: "" },
  //     selfieWithId: { public_id: "", url: "" },
  //   },
  // });

  const [formData, setFormData] = useState(() => {
    const savedFormData = localStorage.getItem("applicationFormData");
    return savedFormData
      ? JSON.parse(savedFormData)
      : {
          user_id: "",
          shopInfor: {
            shopName: "",
            ownerName: "",
            email: "",
            primaryPhone: "",
            pickupAddress: {
              contactName: "",
              contactPhone: "",
              address: {
                province: "",
                district: "",
                ward: "",
                detailed: "",
              },
            },
          },
          shippingMethod: [
            { name: "express", active: false },
            { name: "fast", active: false },
            { name: "economical", active: false },
          ],
          taxInfor: {
            taxCode: "",
            billingEmail: "",
            businessAddress: {
              province: "",
              district: "",
              ward: "",
              detailed: "",
            },
          },
          identificationInfor: {
            citizenId: "",
            idCardImage: { public_id: "", url: "" },
            selfieWithId: { public_id: "", url: "" },
          },
        };
  });

  useEffect(() => {
    localStorage.setItem("currentStepIndex", currentStepIndex.toString());
    localStorage.setItem("applicationFormData", JSON.stringify(formData));
  }, [currentStepIndex]);

  const [isPending, setIsPending] = useState(false);
  const [pendingToastId, setPendingToastId] = useState(null);

  const handleStepChange = async (direction) => {
    const newIndex =
      direction === "next" ? currentStepIndex + 1 : currentStepIndex - 1;
    const nextStep = Math.max(0, Math.min(newIndex, steps.length - 1));
    if (nextStep !== 4) {
      setCurrentStepIndex(nextStep);
    } else {
      await checkFinsh(nextStep);
    }
  };

  const checkFinsh = async (step) => {
    if (step === 4) {
      const toastId = toast.loading("Đang xử lý...");
      setIsPending(true);
      setPendingToastId(toastId);
      await dispatch(newApplication(JSON.stringify(formData)));
    }
  };

  useEffect(() => {
    if (isPending && pendingToastId) {
      if (success) {
        toast.update(pendingToastId, {
          render: "Đã hoàn thành đăng ký",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        setCurrentStepIndex(4);
        setIsPending(false);
        setPendingToastId(null);
        localStorage.removeItem("currentStepIndex");
        localStorage.removeItem("applicationFormData");
      }

      if (error) {
        toast.update(pendingToastId, {
          render: error,
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
        setIsPending(false);
        setPendingToastId(null);
      }
    }
  }, [success, error, loading]);

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
        return <Finish />;
      default:
        return null;
    }
  };

  return (
    <div className="shop-register-container">
      <ToastContainer />
      <ProgressBar step={steps[currentStepIndex]} />
      {renderStep()}
      {currentStepIndex < steps.length - 1 && (
        <div className="shop-register-btn">
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
      )}
    </div>
  );
};

export default Register;
