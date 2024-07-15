import React from "react";

const ShippingMethod = ({ shippingMethod, setShippingMethod }) => {
  const methodList = ["express", "fast", "economical"];

  return (
    <div className="box-container">
      <div className="shipping-method-form">
        {methodList.map((method) => (
          <div key={method}>
            <label>{method}</label>
            <input
              type="checkbox"
              name={method}
              checked={shippingMethod[method]}
              onChange={(e) =>
                setShippingMethod({
                  ...shippingMethod,
                  [method]: e.target.checked,
                })
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShippingMethod;
