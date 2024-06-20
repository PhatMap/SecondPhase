import React, { Fragment, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getProducts } from "../../actions/productActions";
import { useNavigate } from "react-router-dom";

const Filter = ({
  category,
  keyword,
  currentPage,
  setCurrentPage,
  selectedStar,
  setSelectedStar,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  selectedCategory,
  setSelectedCategory,
}) => {
  const dispatch = useDispatch();
  const history = useNavigate();

  const { loading, products } = useSelector((state) => state.products);

  const categories = ["Trousers", "Shirt", "Dress", "Shoe"];
  const categoriesVietnamese = {
    Trousers: "Quần Nam Nữ",
    Shirt: "Áo Nam Nữ",
    Dress: "Váy Nữ",
    Shoe: "Giày Nam Nữ",
  };

  const handleMinPrice = useCallback((e) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, "");

    if (inputValue !== "") {
      const numericValue = parseInt(inputValue, 10);
      if (!isNaN(numericValue)) {
        const actualValue = Math.max(numericValue, 1) * 1000;
        setMinPrice(actualValue);
      }
    } else {
      setMinPrice("");
    }
  });

  const handleMaxPrice = useCallback((e) => {
    const inputValue = e.target.value.replace(/[^0-9]/g, "");

    if (inputValue !== "") {
      const numericValue = parseInt(inputValue, 10);
      if (!isNaN(numericValue)) {
        const actualValue = Math.max(numericValue, 1) * 1000;
        setMaxPrice(actualValue);
      }
    } else {
      setMaxPrice("");
    }
  });

  const hanldeSelectedCategory = useCallback((category) => {
    if (selectedCategory === category) {
      setSelectedCategory("");
    } else {
      setSelectedCategory(category);
    }
  });

  const hanldeSelectedStar = useCallback((star) => {
    if (selectedStar === star) {
      setSelectedStar(0);
    } else {
      setSelectedStar(star);
    }
  });

  const clearFilter = useCallback(() => {
    setSelectedCategory("");
    setSelectedStar(0);
    setMinPrice("");
    setMaxPrice("");
  });

  const handleFiltering = useCallback(() => {
    if (maxPrice != "" && minPrice != "") {
      if (minPrice > maxPrice) {
        toast.error("Giá thấp nhất phải nhỏ hơn giá cao nhất");
        return;
      }
      if (maxPrice < minPrice) {
        toast.error("Giá cao nhất phải lớn hơn giá thấp nhất");
        return;
      }
    }
    setCurrentPage(1);

    history("/shop");

    dispatch(
      getProducts(
        keyword ? keyword : "",
        1,
        [minPrice ? minPrice : 0, maxPrice ? maxPrice : 1000000000],
        selectedCategory ? selectedCategory : "",
        selectedStar ? selectedStar : 0
      )
    );
  });

  return (
    <div className="shop-filter">
      <div className="shop-filter-prices">
        <h4>Giá Sản Phẩm</h4>
        <div className="shop-filter-price">
          <label htmlFor="min_price">Giá Thấp Nhất</label>
          <div style={{ display: "flex" }}>
            <input
              type="text"
              id="min_price"
              className="filter-form-control"
              placeholder="Lowest"
              value={minPrice ? (minPrice / 1000).toLocaleString("vi-VN") : ""}
              onChange={(e) => {
                handleMinPrice(e);
              }}
            />
            <p
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "20px",
              }}
            >
              .000 VNĐ
            </p>
          </div>

          <label htmlFor="max_price">Giá Cao Nhất</label>
          <div style={{ display: "flex" }}>
            <input
              type="text"
              id="max_price"
              className="filter-form-control"
              placeholder="Highest"
              value={maxPrice ? (maxPrice / 1000).toLocaleString("vi-VN") : ""}
              onChange={(e) => {
                handleMaxPrice(e);
              }}
            />
            <p
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "20px",
              }}
            >
              .000 VNĐ
            </p>
          </div>
        </div>
      </div>
      <div className="shop-filter-categories">
        <h4>Danh Mục</h4>
        <ul className="shop-filter-category">
          {categories.map((category, index) => (
            <li
              className={
                selectedCategory === category ? "filter-category" : "base-form"
              }
              key={index}
              onClick={() => hanldeSelectedCategory(category)}
            >
              {categoriesVietnamese[category]}
            </li>
          ))}
        </ul>
      </div>
      <div className="shop-filter-ratings">
        <h4>Xếp Hạng</h4>
        <ul className="shop-filter-rating">
          {[5, 4, 3, 2, 1].map((star, index) => (
            <li key={index} onClick={() => hanldeSelectedStar(star)}>
              <div
                className={`rating-outer ${
                  star === selectedStar ? "selected-rating" : "base-form"
                }`}
              >
                <div
                  className="rating-inner"
                  style={{
                    width: `${star * 20}%`,
                  }}
                ></div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="shop-filter-btn-container">
        <button className="shop-filter-btn" onClick={() => handleFiltering()}>
          Lọc
        </button>
        <button className="shop-filter-btn" onClick={() => clearFilter()}>
          Xóa bộ lọc
        </button>
      </div>
    </div>
  );
};

export default Filter;
