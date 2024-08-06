import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductCategories } from '../../actions/productActions';
import { getActiveCoupons } from '../../actions/couponActions';

const DisplayCoupons = ({ onClose }) => {
    const dispatch = useDispatch();
    const { categories } = useSelector(state => state.productCategories);
    const { coupons, loading, error } = useSelector(state => state.coupon);
    const [filteredCoupons, setFilteredCoupons] = useState([]);
    const [selectedCoupon, setSelectedCoupon] = useState('');

    useEffect(() => {
        const itemsToCoupon = JSON.parse(localStorage.getItem("itemsToCoupon")) || [];
        console.log("Items to coupon:", itemsToCoupon);
        const productIds = itemsToCoupon.map(item => item.product);
        dispatch(getProductCategories(productIds));
        dispatch(getActiveCoupons());
    }, [dispatch]);

    console.log("categories", categories);
    console.log("coupons", coupons);

    useEffect(() => {
        if (categories.length > 0 && coupons.length > 0) {
            const itemsToCoupon = JSON.parse(localStorage.getItem("itemsToCoupon")) || [];
            
            const filtered = coupons.filter(coupon => {
                if (coupon.target.type === "category") {
                    return itemsToCoupon.some(item => {
                        const itemCategory = item.category || (item.product && item.product.category);
                        if (coupon.target.ids.includes(itemCategory)) {
                            return true;
                        }
                        return false;
                    });
                } else if (coupon.target.type === "product") {
                    return itemsToCoupon.some(item => {
                        const itemId = item.id || (item.product && item.product.id);
                        if (coupon.target.ids.includes(itemId)) {
                            return true;
                        }
                        return false;
                    });
                }
                return false;
            });

            setFilteredCoupons(filtered);
        }
    }, [categories, coupons]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const handleApplyCoupon = () => {
        if (selectedCoupon) {
            console.log(`Coupon applied: ${selectedCoupon}`);
            onClose();
        }
    };

    return (
        <div className="coupon-modal-overlay">
            <div className="coupon-modal">
                <div className="coupon-modal-content">
                    <h2>Chọn Phiếu Giảm Giá</h2>
                    <div className="coupon-table">
                        {filteredCoupons.map(coupon => (
                            <div 
                                key={coupon._id} 
                                className={`coupon-row ${selectedCoupon === coupon._id ? 'selected' : ''}`}
                                onClick={() => setSelectedCoupon(coupon._id)}
                            >
                                <div className="coupon-content">
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
                        ))}
                    </div>
                    <div className="button-group">
                        <button className="confirm-coupon-button" onClick={handleApplyCoupon}>
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