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
  setImages,
  setInventory,
  setVariant,
  setPrice,
  setSize,
}) => {
  const isSelected = index === selectedVariant;

  const handlerMark = () => {
    setSize("");
    if (index !== selectedVariant) {
      setSelectedVariant(index);
      setInventory(variant.inventory);
      setStock(variant.totalStock);
      setPrice(product.price);
      setVariant(variant);
      setActiveImage(variant.images[0].url);
      setImages(variant.images);
    } else {
      setSelectedVariant("");
      setStock(product.totalStock);
      setPrice(product.price);
      setActiveImage(product.images[0].url);
      setInventory("");
      setVariant("");
      setImages(product.images);
      product.variants.map((variant, index) => {
        variant.images.map((image) => {
          setImages((prev) => [...prev, image]);
        });
      });
    }
  };
  return (
    <label onClick={() => handlerMark()}>
      <div className={`product-variant-form ${isSelected ? "active" : ""}`}>
        <img
          style={{ width: "35px", height: "40px"}}
          src={variant?.images[0]?.url}
          alt={variant.name}
        />
        <div className={`separator ${isSelected ? "active" : ""}`} />

        <h3>{variant.name}</h3>
        <div className={`separator ${isSelected ? "active" : ""}`} />

        <p>Tổng số lượng: {variant.totalStock}</p>
      </div>
    </label>
  );
};

export default ProductVariant;
