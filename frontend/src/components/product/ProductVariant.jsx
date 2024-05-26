import React, { useState } from "react";

const ProductVariant = ({ variant }) => {
  const [mark, setMark] = useState(false);
  const handlerMark = () => {
    setMark(!mark);
  };
  return (
    <label onClick={() => handlerMark()}>
      <div className={`product-variant-form ${mark ? "active" : ""}`}>
        <img
          style={{ width: "50px" }}
          src={variant.image.url}
          alt={variant.name}
        />
        <div className={`separator ${mark ? "active" : ""}`} />

        <h3>{variant.name}</h3>
        <div className={`separator ${mark ? "active" : ""}`} />

        <p>{variant.stock}</p>
      </div>
    </label>
  );
};

export default ProductVariant;
