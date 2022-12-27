import React, { useEffect, useMemo, useState } from 'react'
import './style.css'
import { Link, useLocation } from 'react-router-dom'
import Pagination from '../../../components/Pagination'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsBySlug } from '../../../actions'
import Loading from '../../../components/Loading'
import { Range } from 'rc-slider'


const Clothing = (props) => {

    const dispatch = useDispatch()
    const category = useSelector(state => state.category)

    const [active, setActive] = useState(false)

    useEffect(() => {
        const { match } = props
        dispatch(getProductsBySlug(match.params.slug))
    }, [])

    const { products, countProducts, categoryName, categoryParent, priceRange, loading } = useSelector(state => state.product)
    const perPage = 20

    

    return (
        <div className="productpage_container">
            <div className="productpage_content">
                <div className="productpage_sidebar">
                    <div className="productpage_sidebar-header-filter">Filters</div>
                    <div className="productpage_sidebar-link">
                        <div className="productpage_sidebar-header">CATEGORIES</div>
                        <div className="productpage_sidebar-link-category">
                            <i style={{ marginRight: 8, fontSize: 13 }} className="fa-solid fa-angle-left"></i>
                            {categoryParent}
                        </div>
                        <div className="productpage_sidebar-link-product">{categoryName}</div>
                    </div>

                    <div className="productpage_sidebar-link">
                        <div className="productpage_sidebar-header">PRICE</div>
                        <div>
                        <Range
                            marks={{
                                1: `$1`,
                                50000: '$50000'
                            }}
                            min={1}
                            max={50000}
                            defaultValue={[1, 50000]}
                            tipFormatter={value => `$${value}`}
                            tipProps={{
                                placement: 'top',
                                visible: true
                            }}
                        />
                        </div>
                    </div>

                    <div className="productpage_sidebar-link">
                        <div className="productpage_sidebar-header">BRAND</div>
                        <div className='productpage-checkbox'>
                            <input type="checkbox" name="" id="" />
                            <label>
                                <span>T-Shirt</span>
                            </label>
                        </div>
                    </div>


                    <div className="productpage_sidebar-link">
                        <div className="productpage_sidebar-header">CUSTOMER RATINGS</div>
                        <div className="sidebar_filter-rating-content">
                            <div className="productpage-checkbox">
                                <input type="checkbox" name="" id="" />
                                <label htmlFor="">
                                    <span>4</span>
                                    <i style={{ margin: '0 4px', fontSize: 10 }} className="fa-solid fa-star"></i>
                                    <span>& above</span>
                                </label>
                            </div>
                            <div className="productpage-checkbox">
                                <input type="checkbox" name="" id="" />
                                <label htmlFor="">
                                    <span>3</span>
                                    <i style={{ margin: '0 4px', fontSize: 10 }} className="fa-solid fa-star"></i>
                                    <span>& above</span>
                                </label>
                            </div>
                            <div className="productpage-checkbox">
                                <input type="checkbox" name="" id="" />
                                <label htmlFor="">
                                    <span>2</span>
                                    <i style={{ margin: '0 4px', fontSize: 10 }} className="fa-solid fa-star"></i>
                                    <span>& above</span>
                                </label>
                            </div>
                            <div className="productpage-checkbox">
                                <input type="checkbox" name="" id="" />
                                <label htmlFor="">
                                    <span>1</span>
                                    <i style={{ margin: '0 4px', fontSize: 10 }} className="fa-solid fa-star"></i>
                                    <span>& above</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="productpage_sidebar-content"></div>
                </div>
                <div className="productpage_product">

                    <div className="productpage_product-filter">
                        <div className="productpage_product-filter-head">
                            <div className="productpage_product-link">
                                <span><Link style={{ textDecoration: 'none', color: '#878787' }} to='/'>Home</Link></span>
                                {categoryParent && <><i className="productpage_pro_icon fa-solid fa-angle-right"></i>
                                    <span>{categoryParent}</span></>}
                                <i className="productpage_pro_icon fa-solid fa-angle-right"></i>
                                <span>{categoryName}</span>
                            </div>
                            <div className="productpage_product-category">
                                <span className="productpage_product-category-name">{categoryName}</span>
                                <span className="productpage_product-category-quantity">(Showing 1 – {perPage} products of {countProducts} products)</span>
                            </div>
                            <div className="productpage_product-filter">
                                <span className={`productpage_product-filter-sort`}>Sort By</span>
                                <span className={`productpage_product-filter-sort active`}>Popularity</span>
                                <span className={`productpage_product-filter-sort`}>Price -- Low to High</span>
                                <span className={`productpage_product-filter-sort`}>Price -- High to Low</span>
                                <span className={`productpage_product-filter-sort`}>Newest First</span>
                            </div>
                        </div>
                        <div className="clothing_list">
                            {
                                products.map((item, index) => {
                                    return (
                                        <div className="clothing_item">
                                            <Link to={`/${item.slug}/${item._id}/p`} className="clothing_img">
                                                <img src={item.productPictures[0].img} alt="" />
                                            </Link>
                                            <div className="clothing_inf">
                                                <div className="clothing_name">
                                                    <Link style={{textDecoration: 'none', color: 'inherit'}} to={`/${item.slug}/${item._id}/p`}><span>{item.name}</span></Link>
                                                    <img src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png" alt="" />
                                                </div>
                                                <div className="clothing_price">
                                                    <span className="clothing_sell">{item.offer ? item.discount : item.price}$</span>
                                                    <span className="clothing_root">{item.offer ? item.price : ''}</span>
                                                    <span className="clothing_off">{item.offer}% off</span>
                                                </div>
                                                <div className="clothing_size">
                                                    <span>Size</span>
                                                    <span style={{ fontSize: 12 }}>M, L, XL, XXL</span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>

                        {/* <Pagination perPage={perPage} data={products} renderData={renderProducts} /> */}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Clothing