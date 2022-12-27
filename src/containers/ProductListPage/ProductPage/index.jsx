import React, { useEffect, useMemo, useState } from 'react'
import './style.css'
import { Link, useLocation } from 'react-router-dom'
import Pagination from '../../../components/Pagination'
import { useDispatch, useSelector } from 'react-redux'
import { getProductFilter, getProductsBySlug, getProductFilterRange } from '../../../actions'
import Loading from '../../../components/Loading'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'


const ProductPage = (props) => {
    const createSliderWithTooltip = Slider.createSliderWithTooltip;
    const Range = createSliderWithTooltip(Slider.Range);
    const [price, setPrice] = useState([1, 50000])
    const [active, setActive] = useState(1)
    const [type, setType] = useState('createAt')
    const sortElements = document.querySelectorAll('.productpage_product-filter-sort')
    const activeElement = sortElements ? Array.from(sortElements).find((e, i) => i === active) : null
    const inActiveElement = sortElements ? Array.from(sortElements).filter((e, i) => i !== active) : null

    useEffect(() => {
        activeElement && activeElement.classList.add('active')
        inActiveElement && inActiveElement.forEach(item => item.classList.remove('active'))
    }, [activeElement])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const dispatch = useDispatch()

    useEffect(() => {
        const { match } = props
        dispatch(getProductsBySlug(match.params.slug))
    }, [])

    if (loading) {
        return <Loading />
    }

    const { products, countProducts, categoryName, categoryParent, priceRange, loading } = useSelector(state => state.product)
    const perPage = 5

    const renderProducts = (item, index) => {
        return (
            <div key={index} className="productpage_product-content">
                <Link to={`/${item.slug}/${item._id}/p`} className="productpage_product-content-img">
                    <img src={item.productPictures[0].img} alt="" />
                </Link>
                <div className="productpage_product-content-about">
                    <div className="productpage_product-content-header">
                        <Link style={{ textDecoration: 'none' }} to={`/${item.slug}/${item._id}/p`}><h2>{item.name}</h2></Link>
                        <div style={{ display: 'flex', marginBottom: 10 }}>
                            <span style={{ marginRight: 10, borderRadius: 2, display: 'inline-flex', alignItems: 'center', backgroundColor: '#388e3c', color: '#fff', }}>
                                <span style={{ fontSize: 12, paddingLeft: 6 }}>4.2</span>
                                <i className="fa-solid fa-star"></i>
                            </span>
                            <span style={{ color: '#878787' }}>3,633 Ratings & 256 Reviews</span>
                        </div>
                    </div>
                    <div className="productpage_product-content-des">
                        <ul className='productpage_product-content-des-list'>
                            <li className='productpage_product-content-des-item'>
                                <i className="fa-solid fa-circle-small"></i>
                                For in-box accessories including batteries
                            </li>
                            <li className='productpage_product-content-des-item'>2 GB RAM | 32 GB ROM | Expandable Upto 512 GB</li>
                            <li className='productpage_product-content-des-item'>16.59 cm (6.53 inch) HD+ Display</li>
                            <li className='productpage_product-content-des-item'>13MP Rear Camera | 5MP Front Camera</li>
                            <li className='productpage_product-content-des-item'>5000 mAh Battery</li>
                            <li className='productpage_product-content-des-item'>MediaTek Helio G25 Processor</li>
                            <li className='productpage_product-content-des-item'>1 year manufacturer warranty for device and 6 months manufacturer warranty for in-box accessories including batteries from the date of purchase</li>
                        </ul>
                    </div>
                </div>
                <div style={{ display: 'flex' }} className="productpage_product-content-price">
                    <div>
                        <div className="productpage_product-content-price-root">${item.offer ? item.discount : item.price}</div>
                        <div className="productpage_product-content-price-discount">
                            {item.offer ? <span>${item.price}</span> : null}
                            {item.offer ? <span>{item.offer}% off</span> : null}
                        </div>
                        <div className="productpage_product-content-price-delivery">Free Delivery</div>
                        <div className="productpage_product-content-price-offer">Bank offer</div>
                    </div>
                    <div style={{ marginTop: 6, marginLeft: 10 }}>
                        <img style={{ height: 21 }} src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png" alt="" />
                    </div>
                </div>

            </div>
        )
    }

    const sortMode = [
        {
            id: 1,
            name: 'Population',
        },
        {
            id: 2,
            name: 'Price -- Low to High',
            type: 'discount'
        },
        {
            id: 3,
            name: 'Price -- High to Low',
            type: '-discount'
        },
        {
            id: 4,
            name: 'Newest First',
        },
    ]

    const handleFilter = (item) => {
        setActive(item.id)
        setType(item.type)
    }

    useEffect(() => {
        const { match } = props
        const payload = {
            type,
            slug: match.params.slug
        }
        dispatch(getProductFilter(payload))
    }, [active, type])

    useEffect(() => {
        if (price[0] > 1 ||price[1] < 5000) {
            const { match } = props
            const payload = {
                type,
                slug: match.params.slug,
                min: price[0],
                max: price[1]
            }
            dispatch(getProductFilterRange(payload))
        }
    }, [price[0], price[1], type])

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
                        <div className="price_range">
                            <span>Min $</span>
                            <input onChange={(e) => setPrice([e.target.value, price[1]])} type='text' value={price[0]} />
                            <span>-</span>
                            <span>Max $</span>
                            <input onChange={(e) => setPrice([price[0], e.target.value])} type='text' value={price[1]} />
                        </div>
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
                            value={price}
                            onChange={price => setPrice(price)}
                        />
                    </div>

                    <div className="productpage_sidebar-link">
                        <div className="productpage_sidebar-header">RAM</div>
                        <div className='productpage-checkbox'>
                            <input type="checkbox" name="" id="" />
                            <label>
                                <span>4GB</span>
                            </label>
                        </div>
                        <div className='productpage-checkbox'>
                            <input type="checkbox" name="" id="" />
                            <label>
                                <span>3GB</span>
                            </label>
                        </div>
                        <div className='productpage-checkbox'>
                            <input type="checkbox" name="" id="" />
                            <label>
                                <span>2GB</span>
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
                                {
                                    sortMode.map((item, index) => (
                                        <span onClick={() => handleFilter(item)} key={index} className="productpage_product-filter-sort">{item.name}</span>
                                    ))
                                }
                            </div>
                        </div>

                        <Pagination perPage={perPage} data={products} renderData={renderProducts} />

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductPage