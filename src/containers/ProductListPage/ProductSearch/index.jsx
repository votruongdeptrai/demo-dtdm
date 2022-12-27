import React from 'react'
import { useSelector } from 'react-redux'
import Layout from '../../../components/Layout'
import './style.css'


const ProductSearch = (props) => {

    const { products } = useSelector(state => state.product)
    console.log(props)

    
    
    return (
        <Layout>
            <div className="container_pro_search">
                <div className="content_prod_search">
                    <div className="header_product_search">
                        <h3>Showing 1 – {products.length} of {products.length} results</h3>
                        <div className="header_sort_search">
                            <span className="filter-item-search">Sort By</span>
                            <span className="filter-item-search">Popularity</span>
                            <span className="filter-item-search">Price -- Low to High</span>
                            <span className="filter-item-search">Price -- High to Low</span>
                        </div>
                    </div>
                    <div className="body_prod_search">
                        <div className="body_prod_container">
                            {
                                products.length > 0 ? products.map((product, index) => (
                                    <div key={index} className="body_pro_item">
                                <div className="pro_img">
                                    <img src={product.productPictures[0].img} alt="" />
                                </div>
                                <p className='pro_name'>{product.name}</p>
                                <span style={{display: 'block'}}>Multicolor, Grip Case, Silicon</span>
                                <div className="prod_search_start">
                                    <span style={{ marginRight: 8, borderRadius: 4, padding: '3px 8px', alignItems: 'center', display: 'flex', background: '#388e3c', color: '#fff', fontSize: '12px' }}>
                                        <span>4</span>
                                        <i style={{ fontSize: 10, marginLeft: 3 }} class="fa-solid fa-star"></i>
                                    </span>
                                    <div className="prod_search_quantity">({product.quantity})</div>
                                    <img style={{ width: 77, height: 21, marginLeft: 8 }} alt='' src='https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png' />

                                </div>
                                <div className="prod_search_price">
                                    <div className="prod_search_price_sell">${product.discount ? product.discount : product.price}</div>
                                    <div className="prod_search_price_root">${product.price}</div>
                                    <div className="prod_search_price_offer">{product.offer}% off</div>
                                </div>
                                <div className="prod_search_delivery">Free delivery</div>
                            </div>
                                )) : ''
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default ProductSearch