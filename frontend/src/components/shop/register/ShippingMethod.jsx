import React from "react";

const ShippingMethod = ({ shippingMethod, setShippingMethod }) => {
  const handleChange = (method) => {
    const updatedMethods = shippingMethod.map((m) =>
      m.name === method.name ? { ...m, active: !m.active } : m
    );
    setShippingMethod(updatedMethods);
  };
  return (
    <div className="box-container">
      <div className="shipping-method-form">
        {shippingMethod.map((method, index) => (
          <div key={index}>
            <label>{method.name}</label>
            <input
              type="checkbox"
              name={method}
              checked={method.active}
              onChange={() => handleChange(method)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShippingMethod;
