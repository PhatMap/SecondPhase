import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createCoupon, clearErrors } from '../../actions/couponActions';
import { CREATE_COUPON_RESET } from '../../constants/couponConstants';

const NewCoupon = () => {
    const [percentage, setPercentage] = useState(0);
    const [role, setRole] = useState('');
    const [description, setDescription] = useState('');
    const [targetType, setTargetType] = useState('');
    const [targetIds, setTargetIds] = useState([]);
    const [quantity, setQuantity] = useState(0);
    const [expiry, setExpiry] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, success } = useSelector(state => state.coupon);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            toast.success('Coupon created successfully');
            navigate('/admin/coupons');
            dispatch({ type: CREATE_COUPON_RESET });
        }
    }, [dispatch, error, success, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = {
            percentage,
            role,
            description,
            target: {
                type: targetType,
                ids: targetIds
            },
            quantity,
            expiry
        };

        dispatch(createCoupon(formData));
    };

    return (
        <Fragment>
            <div className="container container-fluid">
                <div className="wrapper my-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-4">Create New Coupon</h1>

                        <div className="form-group">
                            <label htmlFor="percentage_field">Percentage</label>
                            <input
                                type="number"
                                id="percentage_field"
                                className="form-control"
                                value={percentage}
                                onChange={(e) => setPercentage(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="role_field">Role</label>
                            <input
                                type="text"
                                id="role_field"
                                className="form-control"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description_field">Description</label>
                            <textarea
                                id="description_field"
                                className="form-control"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            ></textarea>
                        </div>

                        <div className="form-group">
                            <label htmlFor="target_type_field">Target Type</label>
                            <input
                                type="text"
                                id="target_type_field"
                                className="form-control"
                                value={targetType}
                                onChange={(e) => setTargetType(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="target_ids_field">Target IDs (comma-separated)</label>
                            <input
                                type="text"
                                id="target_ids_field"
                                className="form-control"
                                value={targetIds}
                                onChange={(e) => setTargetIds(e.target.value.split(','))}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="quantity_field">Quantity</label>
                            <input
                                type="number"
                                id="quantity_field"
                                className="form-control"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="expiry_field">Expiry Date</label>
                            <input
                                type="date"
                                id="expiry_field"
                                className="form-control"
                                value={expiry}
                                onChange={(e) => setExpiry(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            id="create_button"
                            type="submit"
                            className="btn btn-block py-3"
                            disabled={loading ? true : false}
                        >
                            CREATE
                        </button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default NewCoupon;
