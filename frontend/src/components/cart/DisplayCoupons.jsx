import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getActiveCoupons } from '../../actions/couponActions';

const DisplayCoupons = ({ onClose }) => {
    const dispatch = useDispatch();
    const { coupons, loading, error } = useSelector(state => state.coupon);
    const [filteredCoupons, setFilteredCoupons] = useState([]);
    const [selectedCoupons, setSelectedCoupons] = useState([]);

    useEffect(() => {
        dispatch(getActiveCoupons());
    }, [dispatch]);

    useEffect(() => {
        if (coupons.length > 0) {
            const itemsToCoupon = JSON.parse(localStorage.getItem("itemsToCoupon")) || [];
            const categoryIds = [...new Set(itemsToCoupon.map(item => item.category))];

            const filtered = coupons.filter(coupon => {
                if (coupon.target.type === "category") {
                    return coupon.target.ids.some(id => categoryIds.includes(id));
                }
                return false;
            });

            setFilteredCoupons(filtered);
        }
    }, [coupons]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const handleCouponSelection = (coupon) => {
        setSelectedCoupons(prevSelected => {
            const isAlreadySelected = prevSelected.some(c => c._id === coupon._id);
            if (isAlreadySelected) {
                return prevSelected.filter(c => c._id !== coupon._id);
            } else {
                const sameCategory = prevSelected.find(c => c.target.ids[0] === coupon.target.ids[0]);
                if (sameCategory) {
                    return [...prevSelected.filter(c => c._id !== sameCategory._id), coupon];
                } else {
                    return [...prevSelected, coupon];
                }
            }
        });
    };

    const handleApplyCoupons = () => {
        if (selectedCoupons.length > 0) {
          console.log('Applied coupons:', selectedCoupons);
          onClose(selectedCoupons); // Pass the selected coupons back to the parent
        } else {
          onClose(); // Close without applying coupons
        }
      };

    return (
        <div className="coupon-modal-overlay">
            <div className="coupon-modal">
                <div className="coupon-modal-content">
                    <h1>Chọn Phiếu Giảm Giá</h1>
                    <div className="coupon-table">
                        {filteredCoupons.length > 0 ? (
                            filteredCoupons.map(coupon => (
                                <div 
                                    key={coupon._id} 
                                    className={`coupon-row ${selectedCoupons.some(c => c._id === coupon._id) ? 'selected' : ''}`}
                                    onClick={() => handleCouponSelection(coupon)}
                                >
                                    <div className="coupon-content">
                                        <div className="coupon-checkbox">
                                            <input 
                                                type="checkbox" 
                                                checked={selectedCoupons.some(c => c._id === coupon._id)}
                                                readOnly
                                            />
                                        </div>
                                        <div className="coupon-percentage">{coupon.percentage}%</div>
                                        <div className="coupon-details">
                                            <p className="coupon-description">{coupon.description}</p>
                                            <p className="coupon-type">Loại: {coupon.target.type}</p>
                                            <p className="coupon-quantity">Số lượng: {coupon.quantity}</p>
                                            <p className="coupon-expiry">Hạn sử dụng: {formatDate(coupon.expiry)}</p>
                                        </div>
                                    </div>
                                    <div className="coupon-code">COUPON</div>
                                </div>
                            ))
                        ) : (
                            <div className="no-coupons-message">
                                Không có phiếu giảm giá nào phù hợp với các sản phẩm đã chọn.
                            </div>
                        )}
                    </div>
                    <div className="button-group">
                        <button className="confirm-coupon-button" onClick={handleApplyCoupons}>
                            Áp dụng
                        </button>
                        <button className="close-coupon-button" onClick={onClose}>
                            Đóng
                        </button>
                    </div>
                    {loading && <p>Đang tải...</p>}
                    {error && <p>{error}</p>}
                </div>
            </div>
        </div>
    );
};

export default DisplayCoupons;