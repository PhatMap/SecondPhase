import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';

import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader';
import Sidebar from './Sidebar';

import { useDispatch, useSelector } from 'react-redux';

import { getAdminProducts } from '../../actions/productActions';
import { allOrders ,fetchOrderStats } from '../../actions/orderActions';
import { allUsers } from '../../actions/userActions';
import ChartComponent from '../Chart';
import OrderChart from '../OrderChart';
import { formatToVNDWithVND } from "../../utils/formatHelper";



const Dashboard = () => {

    const dispatch = useDispatch();

    const { products } = useSelector(state => state.products)
    const { users } = useSelector(state => state.allUsers)
    const { monthlyRevenue, monthlyOrderCount, orders, totalAmount, totalPaidAmount, totalPendingAmount, loading } = useSelector(state => state.allOrders);

    let outOfStock = 0;
    products.forEach(product => {
        if (product.stock === 0) {
            outOfStock += 1;
        }
    })
   
    useEffect(() => {
        dispatch(getAdminProducts());
        dispatch(fetchOrderStats());
        dispatch(allOrders());
        dispatch(allUsers());
       
    }, [dispatch])
    
    useEffect(() => {
        dispatch(fetchOrderStats());
       
    }, [dispatch])

        console.log("2monthlyRevenue", monthlyRevenue );
        console.log("2monthlyOrderCount", monthlyOrderCount);

    return (
        <Fragment>
            <div className="dashboard-container">
                <div className="row">
                    <div className="col-12 col-md-2">
                        <Sidebar />
                    </div>

                    <div className="col-12 col-md-10">
                        <h1 className="my-4" style={{ fontSize: '40px', fontWeight: 'bold', textAlign: 'center' }}>Quản Lí</h1>

                        {loading ? <Loader /> : (
                            <Fragment>
                                <MetaData title={'Admin Dashboard'} />

                                <div className="row pr-4">
                                    <div className="col-xl-4 col-sm-12 mb-3">
                                        <div className="card-custom text-white o-hidden h-100">
                                            <div className="card-body">
                                                <div className="image-container"style={{ backgroundImage: `url('../images/tải xuống (1).jpg')`, backgroundSize: 'cover', backgroundPosition: 'center', height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                <div className="text-overlay">
                                                    Tổng Cộng <br /> <b>{ formatToVNDWithVND(totalAmount)} VND</b>
                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-xl-4 col-sm-12 mb-3">
                                         <div className="card-custom">
                                            <div className="card-body">
                                              <div className="image-container" style={{ backgroundImage: `url('../images/images (6).jpg')`, backgroundSize: 'cover', backgroundPosition: 'center', height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                 <div className="overlay"></div>
                                                    <div className="text-overlay">
                                                       Đã Thanh Toán <br /> <b>{formatToVNDWithVND(totalPaidAmount) } VND</b>
                                                     </div>
                                                 </div>
                                             </div>
                                        </div>
                                    </div>

                                    <div className="col-xl-4 col-sm-12 mb-3">
                                    <div className="card-custom text-white o-hidden h-100">
                                        <div className="card-body">
                                            <div className="image-container" style={{ backgroundImage: `url('../images/tải xuống (2).jpg')`, backgroundSize: 'cover', backgroundPosition: 'center', height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                              <div className="text-overlay">
                                                 Chưa Thanh Toán <br /> <b>{formatToVNDWithVND(totalPendingAmount) } VND</b>
                                                </div>
                                             </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="row pr-4" style={{ marginLeft:'4rem' }}>
                                <ChartComponent monthlyRevenue={monthlyRevenue} />
                                </div> */}
                                 <Fragment>
                                    <div className="chart-wrapper">
                                        <ChartComponent monthlyRevenue={monthlyRevenue} />
                                    
                                        <OrderChart monthlyOrderCount={monthlyOrderCount} />
                                    </div>
                                    </Fragment>

                                <div className="row pr-4">
                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="image-container" style={{ 
                                        backgroundImage: `url('../images/images (3).jpg')`, 
                                        backgroundSize: 'cover', 
                                        backgroundPosition: 'center', 
                                        height: '200px', 
                                        display: 'flex', 
                                        flexDirection: 'column',
                                        justifyContent: 'space-between', 
                                        alignItems: 'center',
                                        padding: '10px'
                                    }}>
                                        <div className="card-body text-center" style={{ 
                                            color: 'white', 
                                            padding: '10px' 
                                        }}>
                                            <div className="card-font-size" style={{ 
                                                fontSize: '1.5rem', 
                                                fontWeight: 'bold',
                                                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)',
                                                marginTop: '2rem',
                                            }}>
                                                Sản Phẩm <br /> <b>{products && products.length}</b>
                                            </div>
                                        </div>
                                        <div className="card-body" style={{ 
                                            width: '100%' 
                                        }}>
                                            <div className="link-container text-center" style={{ 
                                                width: '100%' 
                                            }}>
                                                <Link className="card-footer btn btn-primary" to="/admin/products" style={{ 
                                                    width: '100%', 
                                                    display: 'block', 
                                                    textAlign: 'center',
                                                    marginBottom: '-1rem',
                                                }}>
                                                    Chi Tiết
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>




                                 <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="image-container" style={{ 
                                        backgroundImage: `url('../images/images (6).jpg')`, 
                                        backgroundSize: 'cover', 
                                        backgroundPosition: 'center', 
                                        height: '200px', 
                                        display: 'flex', 
                                        flexDirection: 'column',
                                        justifyContent: 'space-between', 
                                        alignItems: 'center',
                                        padding: '10px'
                                    }}>
                                        <div className="card-body text-center" style={{ 
                                            color: 'white', 
                                            padding: '10px' 
                                        }}>
                                            <div className="card-font-size" style={{ 
                                                fontSize: '1.5rem', 
                                                fontWeight: 'bold',
                                                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)',
                                                marginTop: '2rem',
                                            }}>
                                               Đơn Hàng <br /> <b>{orders && orders.length}</b>
                                            </div>
                                        </div>
                                        <div className="card-body" style={{ 
                                            width: '100%' 
                                        }}>
                                            <div className="link-container text-center" style={{ 
                                                width: '100%' 
                                            }}>
                                                <Link className="card-footer btn btn-primary"  to="/admin/orders" style={{ 
                                                    width: '100%', 
                                                    display: 'block', 
                                                    textAlign: 'center',
                                                    marginBottom: '-1rem',
                                                }}>
                                                    Chi Tiết
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="image-container" style={{ 
                                        backgroundImage: `url('../images/hinh-nen-den-22.jpg')`, 
                                        backgroundSize: 'cover', 
                                        backgroundPosition: 'center', 
                                        height: '200px', 
                                        display: 'flex', 
                                        flexDirection: 'column',
                                        justifyContent: 'space-between', 
                                        alignItems: 'center',
                                        padding: '10px'
                                    }}>
                                        <div className="card-body text-center" style={{ 
                                            color: 'white', 
                                            padding: '10px' 
                                        }}>
                                            <div className="card-font-size" style={{ 
                                                fontSize: '1.5rem', 
                                                fontWeight: 'bold',
                                                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)',
                                                marginTop: '2rem',
                                            }}>
                                               Khách Hàng <br /> <b>{users && users.length}</b>
                                            </div>
                                        </div>
                                        <div className="card-body" style={{ 
                                            width: '100%' 
                                        }}>
                                            <div className="link-container text-center" style={{ 
                                                width: '100%' 
                                            }}>
                                                <Link className="card-footer btn btn-primary"  to="/admin/users" style={{ 
                                                    width: '100%', 
                                                    display: 'block', 
                                                    textAlign: 'center',
                                                    marginBottom: '-1rem',
                                                }}>
                                                    Chi Tiết
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-3 col-sm-6 mb-3">
                                    <div className="image-container" style={{ 
                                        backgroundImage: `url('../images/tải xuống (3).jpg')`, 
                                        backgroundSize: 'cover', 
                                        backgroundPosition: 'center', 
                                        height: '200px', 
                                        display: 'flex', 
                                        flexDirection: 'column',
                                        justifyContent: 'space-between', 
                                        alignItems: 'center',
                                        padding: '10px'
                                    }}>
                                        <div className="card-body text-center" style={{ 
                                            color: 'white', 
                                            padding: '10px' 
                                        }}>
                                            <div className="card-font-size" style={{ 
                                                fontSize: '1.5rem', 
                                                fontWeight: 'bold',
                                                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)',
                                                marginTop: '2rem',
                                            }}>
                                              Hết Sản Phẩm <br /> <b>{outOfStock}</b>
                                            </div>
                                        </div>
                                       
                                    </div>
                                </div>
                                </div>
                            </Fragment>
                        )}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Dashboard;
