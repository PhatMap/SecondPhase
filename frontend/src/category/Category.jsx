import React, { Fragment, useState, useEffect } from "react";

const Category = ({ category }) => {
  return (
    <Fragment>
      <div className="category-container">
        <img src={category.image?.url} alt={category.categoryName} />
        <p>{category.vietnameseName}</p>
      </div>
    </Fragment>
  );
};

export default Category;
