import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { getProductsBySlug } from '../../../actions'
import Loading from '../../../components/Loading'
import './style.css'

const ProductStore = (props) => {
    const dispatch = useDispatch()
    const products = useSelector(state => state.product)
    const history = useHistory()

    
    const { match } = props
    useEffect(() => {
        dispatch(getProductsBySlug(match.params.slug))
    }, [])
    
    useEffect(() => {
        if (products.loading) {
            return <Loading />
        }
    })
    
    return (
        <div className='product_content'>
            {
                Object.keys(products.productsByPrice).map((key, index) => {
                    return (
                        <div key={index} className="product-container">
                            <div className="cart-product-container">
                                <div className="cart-header">
                                    <h2>{products.categoryName} mobile {key}</h2>
                                    <span onClick={() => history.push(`${match.params.slug}/mode-viewall`)}>VIEW ALL</span>
                                </div>
                                <div className="cart-content">
                                    {
                                        products.productsByPrice[key].map((prod, index) => {
                                            return (
                                                <div key={index} className="cart-product-item">
                                                    <div className="product-img">
                                                        <Link to={`/${prod.slug}/${prod._id}/p`}><img src={prod.productPictures[0].img} /></Link>
                                                    </div>
                                                    <div className="product-name">
                                                        <Link to={`/${prod.slug}/${prod._id}/p`} style={{ textDecoration: 'none', color: "#212121" }}>{prod.name}</Link>
                                                    </div>
                                                    <div className="product-start">
                                                        <span>
                                                            <span style={{ color: '#fff' }}>4.4</span>
                                                            <i style={{ color: '#fff', margin: '2px', fontSize: 8 }} className="fa-solid fa-star"></i>
                                                        </span>
                                                        <span style={{ color: "#878787", marginLeft: 8 }}>({prod.quantity})</span>
                                                    </div>
                                                    <div className="product-price">
                                                        {prod.offer ? <span className="product-price-root">${prod.discount}</span> : null}
                                                        <span className={prod.offer ? "product-price-sell" : "product-price-root"}>${prod.price}</span>
                                                        {prod.offer ? <span className="product-price-sell-off">{prod.offer}% off</span> : null}
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ProductStore