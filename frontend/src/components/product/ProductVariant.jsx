import { set } from "mongoose";
import React, { useState } from "react";

const ProductVariant = ({
  variant,
  index,
  setSelectedVariant,
  selectedVariant,
  product,
  setStock,
  setActiveImage,
  setInventory,
  setVariant,
  setVariantIndex,
}) => {
  const isSelected = index === selectedVariant;

  const handlerMark = () => {
    if (index !== selectedVariant) {
      setSelectedVariant(index);
      setInventory(variant.inventory);
      setStock(variant.totalStock);
      setVariant(variant);
      setVariantIndex(index);
    } else {
      setSelectedVariant("");
      setStock(product.totalStock);
      setActiveImage(product.images[0].url);
      setInventory("");
      setVariant("");
      setVariantIndex("");
    }
  };
  return (
    <label onClick={() => handlerMark()}>
      <div className={`product-variant-form ${isSelected ? "active" : ""}`}>
        <img
          style={{ width: "50px" }}
          src={variant?.images[0]?.url}
          alt={variant.name}
        />
        <div className={`separator ${isSelected ? "active" : ""}`} />

        <h3>{variant.name}</h3>
        <div className={`separator ${isSelected ? "active" : ""}`} />

        <p>{variant.totalStock}</p>
      </div>
    </label>
  );
};

export default ProductVariant;
