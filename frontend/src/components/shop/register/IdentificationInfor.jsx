import React, { useState } from "react";

const IdentificationInfor = ({
  identificationInfor,
  setIdentificationInfor,
}) => {
  const [previewAvatar, setPreviewAvatar] = useState([
    identificationInfor.idCardImage.url || "",
    identificationInfor.selfieWithId.url || "",
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "citizenId") {
      setIdentificationInfor({ ...identificationInfor, [name]: value });
    } else if (name === "idCardImage" || name === "selfieWithId") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setIdentificationInfor({
            ...identificationInfor,
            [name]: { public_id: "", url: reader.result },
          });
          setPreviewAvatar((prev) => ({
            ...prev,
            [name === "idCardImage" ? 0 : 1]: reader.result,
          }));
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="box-container">
      <div className="shop-infor-form">
        <label>Số CCCD/CMND:</label>
        <input
          type="text"
          name="citizenId"
          value={identificationInfor.citizenId}
          onChange={(e) => handleChange(e)}
        />
        <label htmlFor="customFile">Ảnh thẻ CCCD/CMND:</label>
        <div>
          <input
            type="file"
            name="idCardImage"
            id="customFile"
            accept="image/*"
            onChange={(e) => handleChange(e)}
          />
          <img src={previewAvatar[0]} alt="idCardImage" className="id-image" />
        </div>
        <label htmlFor="customFile">Ảnh chụp cùng thẻ CCCD/CMND:</label>
        <div>
          <input
            type="file"
            name="selfieWithId"
            id="customFile"
            accept="image/*"
            onChange={(e) => handleChange(e)}
          />
          <img src={previewAvatar[1]} alt="selfieWithId" className="id-image" />
        </div>
      </div>
    </div>
  );
};

export default IdentificationInfor;
