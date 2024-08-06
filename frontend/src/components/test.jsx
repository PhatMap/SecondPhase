import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getActiveCoupons } from '../../actions/couponActions';

const DisplayCoupons = ({ onClose }) => {
    const dispatch = useDispatch();
  const { coupons, loading, error } = useSelector(state => state.coupon);
  const [selectedCoupon, setSelectedCoupon] = useState('');
  const [filteredCoupons, setFilteredCoupons] = useState([])
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    useEffect(() => {
        dispatch(getActiveCoupons());
    }, [dispatch]);

    const handleApplyCoupon = () => {
        if (selectedCoupon) {
            console.log(`Coupon applied: ${selectedCoupon}`);
            onClose();
        }
    };


    useEffect(() => {
        const itemsToCheckout = JSON.parse(localStorage.getItem("itemsToCheckout")) || [];
        
        // Filter coupons based on selected items
        const filtered = coupons.filter(coupon => {
          if (coupon.target.type === "category") {
            return itemsToCheckout.some(item => 
              coupon.target.ids.includes(item.category)
            );
          }
          // Add more conditions for other types if needed
          return true;
        });
    
        setFilteredCoupons(filtered);
      }, [coupons]);
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
                            ))
                        ) : (
                            <div className="no-coupons-message">
                                Không có phiếu giảm giá nào phù hợp với các sản phẩm đã chọn.
                            </div>
                        )}
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