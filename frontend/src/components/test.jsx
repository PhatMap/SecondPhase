import React, { Fragment, useState, useEffect } from "react";

const Test = () => {
  return (
    <div>
      <div className="">
        <div className="">
          <div className="">
            <div className="">

              <hr className="" />
              <div className="">
                <h4 className="">Categories</h4>
                <ul className="">
                  {categories.map((category) => (
                    <li
                      key={category}
                      onClick={() => handleCategoryClick(category)} // Sử dụng hàm handleCategoryClick khi nhấp vào danh mục
                    >
                      {category}
                    </li>
                  ))}
                </ul>
              </div>
              <hr className="" />
              <div className="">
                <h4 className="">Ratings</h4>
                <ul className="">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <li
                      style={{
                        cursor: "pointer",
                        listStyleType: "none",
                      }}
                      key={star}
                      onClick={() => setRating(star)}
                    >
                      <div className="rating-outer">
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
              <div className="">
                <hr />
                <h4 className="">Choose a color:</h4>
                <select
                  id="color-select"
                  value={color}
                  onChange={(e) => handleColorChange(e.target.value)}
                >
                  <option value="">Select a Color</option>
                  {colors.map((color, index) => (
                    <option key={index} value={color}>
                      {color}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Test;
