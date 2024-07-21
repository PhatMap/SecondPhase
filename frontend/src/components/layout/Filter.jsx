import React, { Fragment, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getProducts } from "../../actions/productActions";
import { useNavigate } from "react-router-dom";
import { getCategoryAll } from "../../actions/categoryActions";

const Filter = ({
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

  const { loading: productLoading, products } = useSelector((state) => state.products);
  const { loading: categoryLoading, error: categoryError, categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getCategoryAll());
  }, [dispatch]);

  useEffect(() => {
    if (categoryError) {
      toast.error(categoryError);
      dispatch(clearErrors());
    }
  }, [categoryError, dispatch]);

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
  }, [setMinPrice]);

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
  }, [setMaxPrice]);

  const handleSelectedCategory = useCallback((e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
  }, [setSelectedCategory]);

  const handleSelectedStar = useCallback((star) => {
    if (selectedStar === star) {
      setSelectedStar(0);
    } else {
      setSelectedStar(star);
    }
  }, [selectedStar, setSelectedStar]);

  const clearFilter = useCallback(() => {
    setSelectedCategory("");
    setSelectedStar(0);
    setMinPrice("");
    setMaxPrice("");
  }, [setSelectedCategory, setSelectedStar, setMinPrice, setMaxPrice]);

  const handleFiltering = useCallback(() => {
    if (maxPrice !== "" && minPrice !== "") {
      if (minPrice > maxPrice) {
        toast.error("Giá thấp nhất phải nhỏ hơn giá cao nhất");
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
  }, [dispatch, history, keyword, maxPrice, minPrice, selectedCategory, selectedStar, setCurrentPage]);

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
              onChange={(e) => handleMinPrice(e)}
            />
            <p style={{ display: "flex", alignItems: "center", fontSize: "20px" }}>
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
              onChange={(e) => handleMaxPrice(e)}
            />
            <p style={{ display: "flex", alignItems: "center", fontSize: "20px" }}>
              .000 VNĐ
            </p>
          </div>
        </div>
      </div>

            <div className="shop-filter-categories">
        <style>
          {`
            .shop-filter-categories {
              margin-bottom: 20px;
            }
            .shop-filter-categories h4 {
              margin-bottom: 10px;
            }
            .filter-form-control {
              width: 100%; /* Adjust the width as needed */
              padding: 10px; /* Adjust the padding as needed */
              margin-left: 10px; /* Adjust the left margin as needed */
              border: 1px solid #ccc;
              border-radius: 4px;
              font-size: 16px;
            }
          `}
        </style>
        <h4>Danh Mục</h4>
        <select
          className="filter-form-control"
          value={selectedCategory}
          onChange={handleSelectedCategory}
        >
          <option value="">Chọn một danh mục</option>
          {categories && categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.vietnameseName}
            </option>
          ))}
        </select>
      </div>


      <div className="shop-filter-ratings">
        <h4>Xếp Hạng</h4>
        <ul className="shop-filter-rating">
          {[5, 4, 3, 2, 1].map((star, index) => (
            <li key={index} onClick={() => handleSelectedStar(star)}>
              <div
                className={`rating-outer ${star === selectedStar ? "selected-rating" : "base-form"}`}
              >
                <div
                  className="rating-inner"
                  style={{ width: `${star * 20}%` }}
                ></div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="shop-filter-btn-container">
        <button className="shop-filter-btn" onClick={handleFiltering}>
          Lọc
        </button>
        <button className="shop-filter-btn" onClick={clearFilter}>
          Xóa bộ lọc
        </button>
      </div>
    </div>
  );
};

export default Filter;
