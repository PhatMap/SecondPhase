import { set } from "mongoose";
import React, { Fragment, useEffect, useState } from "react";

const SectionOption = ({ setOption, shop, categories, setIndex }) => {
  const [activeSection, setActiveSection] = useState(null);

  const categoryMap = categories.reduce((acc, category) => {
    acc[category._id] = category.vietnameseName;
    return acc;
  }, {});

  const toggleSection = (index) => {
    setActiveSection(activeSection === index ? null : index);
  };

  return (
    <Fragment>
      <div className="option-form">
        <div className="option-btns">
          <label className={`option-add-btn `}>
            <button onClick={() => setOption("add")} hidden />
            <i className="fa fa-plus-circle" aria-hidden="true"></i>
            <p>
              <strong>Thêm mục </strong>
            </p>
          </label>
          {shop &&
            shop.sections &&
            shop.sections.length > 0 &&
            shop.sections.map((section, index) => (
              <label key={index} className={`option-section`}>
                <img width={50} height={50} src={section.images[0].url}></img>
                <p className="name" title={section.name}>
                  <strong>Tên mục:</strong> {section.name}
                </p>
                <p title={categoryMap[section.categoryId]}>
                  <strong>Danh mục liên kết:</strong>{" "}
                  {categoryMap[section.categoryId]}
                </p>
                <div className="gear-icon-container">
                  <i
                    className="fa fa-gear"
                    aria-hidden="true"
                    onClick={() => toggleSection(index)}
                  ></i>
                  {activeSection === index && (
                    <div className="option-menu">
                      <p
                        onClick={() => {
                          setIndex(index);
                          setOption("fix");
                        }}
                      >
                        Chỉnh sửa
                      </p>
                      <p
                        onClick={() => {
                          setIndex(index);
                          setOption("delete");
                        }}
                      >
                        Xóa
                      </p>
                    </div>
                  )}
                </div>
              </label>
            ))}
        </div>
      </div>
    </Fragment>
  );
};

export default SectionOption;
