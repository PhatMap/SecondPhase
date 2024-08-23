import React, { Fragment, useEffect, useState } from "react";

const SectionOption = ({ setOption }) => {
  return (
    <Fragment>
      <div className="option-form">
        <div className="option-btns">
          <button className="confirm" onClick={() => setOption("add")}>
            Thêm mục
          </button>
          <button className="cancel">Chỉnh sửa mục</button>
        </div>
      </div>
    </Fragment>
  );
};

export default SectionOption;
