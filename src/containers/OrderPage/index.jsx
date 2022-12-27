import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getOrders } from '../../actions'
import Layout from '../../components/Layout'
import './style.css'

const OrderPage = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const [orders, setOrders] = useState(user.orders)
    const [orderItem, setOrderItem] = useState(user.orders.items)
    useEffect(() => {
        dispatch(getOrders())
    }, [orders, orderItem])

    return (
        <Layout>
            <div className="order_page_container">
                <div className="order_page_nav">
                    <div className="productpage_product-link">
                        <span><Link style={{ textDecoration: 'none', color: '#878787' }} to='/'>Home</Link></span>
                        <i className="productpage_pro_icon fa-solid fa-angle-right"></i>
                        <span>Orders</span>
                    </div>
                </div>
                <div className="order_page_content">
                    {user.orders.map(order => {
                        return order.items.map((item, index) => (
                            <Link style={{textDecoration: 'none'}} to={`/order_details/${order._id}`} className="order_page_item">
                                <div className="order_page_img">
                                    <img src={item ? item.productId.productPictures[0].img : ''} alt="" />
                                </div>
                                <div className="order_page_name">
                                    <span>{item ? item.productId.name : ''}</span>
                                    <span>Seller: Phong Vi</span>
                                </div>
                                <div className="order_page_price">
                                    <span>{item ? item.payablePrice : ''}$</span>
                                    <span><i class="fa-brands fa-bitcoin"></i>10$</span>
                                </div>

                                <div className="order_page_delivery">
                                    <div className="order_page_confirm">
                                        <i class="fa-solid fa-circle"></i>
                                        <span>{order.paymentStatus ? order.paymentStatus : ''}</span>
                                    </div>
                                    <div className="order_page_noitice">
                                        <span>Your item has been delivered</span>
                                    </div>
                                    <div className="order_page_rate">
                                        <i class="fa-solid fa-star"></i>
                                        <span>RATE & REVIEW PRODUCT</span>
                                    </div>
                                </div>
                            </Link>
                        ))
                    })}
                </div>
            </div>
        </Layout>
    )
}

export default OrderPage