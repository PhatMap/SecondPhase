import axios from "axios";
import React, { useEffect, useState } from "react";

const BusinessAddress = ({
  onClose,
  businessAddress,
  setBusinessAddress,
}) => {
  const [location, setLocation] = useState([]);

  const [formData, setFormData] = useState(
    businessAddress || {
      province: "",
      district: "",
      ward: "",
      detailed: "",
    }
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
        );
        setLocation(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const handleSave = () => {
    setBusinessAddress(formData);
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "province") {
      setFormData((prev) => ({
        ...prev,
        province: value,
        district: "",
        ward: "",
      }));
    } else if (name === "district") {
      setFormData((prev) => ({
        ...prev,
        district: value,
        ward: "",
      }));
    } else if (name === "ward" || name === "detailed") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const selectedCity = location.find((city) => city.Name === formData.province);

  const selectedDistrict = selectedCity?.Districts.find(
    (district) => district.Name === formData.district
  );

  return (
    <div className="pickup-address-overlay">
      <div className="pickup-address-modal">
        <div className="shop-infor-form">
          <label>Tỉnh/Thành phố</label>
          <select
            value={formData.province}
            name="province"
            onChange={(e) => handleChange(e)}
          >
            <option value="">Chọn Tỉnh/Thành phố</option>
            {location.map((city) => (
              <option key={city.Id} value={city.Name}>
                {city.Name}
              </option>
            ))}
          </select>
          <label>Quận/Huyện</label>
          <select
            value={formData.district}
            name="district"
            onChange={(e) => handleChange(e)}
          >
            <option value="">Chọn Quận/Huyện</option>
            {selectedCity?.Districts.map((district) => (
              <option key={district.Id} value={district.Name}>
                {district.Name}
              </option>
            ))}
          </select>
          <label>Phường/Xã</label>
          <select
            value={formData.ward}
            name="ward"
            onChange={(e) => handleChange(e)}
          >
            <option value="">Chọn Phường/Xã</option>
            {selectedDistrict?.Wards.map((ward) => (
              <option key={ward.Id} value={ward.Name}>
                {ward.Name}
              </option>
            ))}
          </select>
          <label>Số nhà/Số đường</label>
          <input
            type="text"
            name="detailed"
            value={formData.detailed}
            onChange={(e) => handleChange(e)}
          />
          <button
            onClick={() => {
              handleSave();
            }}
          >
            Lưu
          </button>
          <button onClick={onClose}>Đóng</button>
        </div>
      </div>
    </div>
  );
};

export default BusinessAddress;
