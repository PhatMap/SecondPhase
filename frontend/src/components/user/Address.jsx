import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Address = ({ handleAddressChange }) => {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [wards, setWards] = useState([]);
  const [selectedWard, setSelectedWard] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
        );
        setCities(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const handleCityChange = (event) => {
    const selectedCityId = event.target.value;
    setSelectedCity(selectedCityId);

    const selectedCityData = cities.find((city) => city.Id === selectedCityId);
    setDistricts(selectedCityData ? selectedCityData.Districts : []);

    handleAddressChange('province', selectedCityData ? selectedCityData.Name : '');
  };

  const handleDistrictChange = (event) => {
    const selectedDistrictId = event.target.value;
    setSelectedDistrict(selectedDistrictId);

    const selectedCityData = cities.find((city) => city.Id === selectedCity);
    const selectedDistrictData = selectedCityData
      ? selectedCityData.Districts.find((district) => district.Id === selectedDistrictId)
      : null;
    setWards(selectedDistrictData ? selectedDistrictData.Wards : []);

    handleAddressChange('district', selectedDistrictData ? selectedDistrictData.Name : '');
  };

  const handleWardChange = (event) => {
    const selectedWardId = event.target.value;
    setSelectedWard(selectedWardId);

    const selectedDistrictData = districts.find((district) => district.Id === selectedDistrict);
    const selectedWardData = selectedDistrictData
      ? selectedDistrictData.Wards.find((ward) => ward.Id === selectedWardId)
      : null;

    handleAddressChange('town', selectedWardData ? selectedWardData.Name : '');
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);

    handleAddressChange('location', event.target.value);
  };

  return (
    <div>
      <div className="register-form-group">
        <label htmlFor="city">Tỉnh/Thành phố</label>
        <select
          className="register-form-control"
          id="city"
          value={selectedCity}
          onChange={handleCityChange}
        >
          <option value="">Chọn tỉnh thành</option>
          {cities.map((city) => (
            <option key={city.Id} value={city.Id}>
              {city.Name}
            </option>
          ))}
        </select>
      </div>
      <div className="register-form-group">
        <label htmlFor="district">Quận/Huyện</label>
        <select
          className="register-form-control"
          id="district"
          value={selectedDistrict}
          onChange={handleDistrictChange}
        >
          <option value="">Chọn quận/huyện</option>
          {districts.map((district) => (
            <option key={district.Id} value={district.Id}>
              {district.Name}
            </option>
          ))}
        </select>
      </div>
      <div className="register-form-group">
        <label htmlFor="ward">Phường/Xã</label>
        <select
          className="register-form-control"
          id="ward"
          value={selectedWard}
          onChange={handleWardChange}
        >
          <option value="">Chọn phường/xã</option>
          {wards.map((ward) => (
            <option key={ward.Id} value={ward.Id}>
              {ward.Name}
            </option>
          ))}
        </select>
      </div>
      <div className="register-form-group">
        <label htmlFor="location">Nhập địa chỉ cụ thể</label>
        <input
          className="register-form-control"
          type="text"
          id="location"
          value={location}
          onChange={handleLocationChange}
        />
      </div>
    </div>
  );
};

export default Address;