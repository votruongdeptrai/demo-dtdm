import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { addToCart, getProductDetailsById } from '../../../actions'
import Layout from '../../../components/Layout'
import './style.css'

const ProductDetails = (props) => {
    const [selectedImg, setSelectedImg] = useState('')
    const dispatch = useDispatch();
    const product = useSelector((state) => state.product);
    const history = useHistory()


    const { productDetails } = product

    useEffect(() => {
        const { productId } = props.match.params;
        const payload = {
            params: {
                productId,
            },
        };
        dispatch(getProductDetailsById(payload));
    }, []);

    useEffect(() => {
        if (selectedImg) {
            const fullImg = document.querySelector('#prod_primary > img')
            fullImg.src = selectedImg.src
        }

    }, [selectedImg])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])


    if (Object.keys(product.productDetails).length === 0) {
        return null;
    }

    const handleAddToCart = () => {
        const { _id, name, price, discount, offer, slug} = product.productDetails;
        const img = product.productDetails.productPictures[0].img;
        dispatch(addToCart({ _id, name, price, img, discount, offer, slug }));
        props.history.push(`/cart`);
    }

    return (
        <Layout>
            <div className="product_detail_container">
                <div className="product_detail_content">
                    <div className="product_detail_prod">
                        <div className="product_detail_img">
                            <div className="product_img_container">
                                <ul className="product_img_list">
                                    {productDetails && productDetails.productPictures.map((item, index) => (
                                        <li key={index} id={index} onMouseOver={() => setSelectedImg(document.querySelector(`li[id='${index}']`).querySelector(`img[id='${index}']`))} className='product_img_item'>
                                            <img id={index} alt='' src={item.img} />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div id='prod_primary' className="product_img_primary">
                                <div id='lens'></div>
                                <img id='prod_pri' src={productDetails.productPictures[0].img} alt="" />
                            </div>
                        </div>
                        <div className="product_add_order">
                            <button onClick={handleAddToCart} className="product_add_to_cart">
                                <i className='fa-solid fa-cart-shopping'></i>
                                <span>ADD TO CART</span>
                            </button>
                            <button className="product_order">
                                <i className="fa-solid fa-bolt-lightning"></i>
                                <span>ORDER IT</span>
                            </button>
                        </div>
                    </div>
                    <div className="product_detail_description">
                        <div className="product_details_sub_nav">
                            <span>Home
                                <i style={{ marginLeft: 8 }} class="fa-solid fa-angle-right"></i>
                            </span>
                            <span>Home
                                <i style={{ marginLeft: 8 }} class="fa-solid fa-angle-right"></i>
                            </span>
                            <span>Home
                                <i style={{ marginLeft: 8 }} class="fa-solid fa-angle-right"></i>
                            </span>

                        </div>
                        <div className="product_detail_name">
                            <span>{productDetails.name}</span>
                        </div>
                        <div className="product_detail_rating">
                            <span>
                                4.2
                                <i style={{ marginLeft: 4, fontSize: 10 }} className="fa-solid fa-star"></i>
                            </span>
                            <span style={{ color: '#878787', fontSize: 13, marginRight: 10 }}>4,484 Ratings & 334 Reviews</span>
                            <span><img style={{ width: 77, height: 21 }} src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png" alt="" srcset="" /></span>
                        </div>
                        <div className="product_detail_price">
                            <span className="product_details_sell">{productDetails.offer ? `$${productDetails.discount}` : `$${productDetails.price}`}</span>
                            <span className="product_details_root">{productDetails.offer ? `$${productDetails.price}` : ''}</span>
                            <span className="product_details_off">{productDetails.offer ? `${productDetails.offer}% off` : ''}</span>
                        </div>
                        <div className="product_detail_offer">
                            <span>Available offers</span>
                            <ul className="product_detail_offer_list">
                                <li className="product_detail_offer_item">
                                    <i class="fa-solid fa-bell"></i>
                                    <span>Bank Offer </span>
                                    <span>10% off on Citi Credit/Debit Cards, up to $1500. On orders of $3000 and above</span>
                                </li>
                                <li className="product_detail_offer_item">
                                    <i class="fa-solid fa-bell"></i>
                                    <span>Bank Offer </span>
                                    <span>10% off on Citi Credit/Debit Cards, up to $1500. On orders of $3000 and above</span>
                                </li>
                                <li className="product_detail_offer_item">
                                    <i class="fa-solid fa-bell"></i>
                                    <span>Bank Offer </span>
                                    <span>10% off on Citi Credit/Debit Cards, up to $1500. On orders of $3000 and above</span>
                                </li>
                                <li className="product_detail_offer_item">
                                    <i class="fa-solid fa-bell"></i>
                                    <span>Bank Offer </span>
                                    <span>10% off on Citi Credit/Debit Cards, up to $1500. On orders of $3000 and above</span>
                                </li>
                            </ul>
                        </div>
                        <div className="product_detail_highlight">
                            <span>Highlights</span>
                            <ul className="highlight_list">
                                <li className="highlight_item">2 GB RAM | 32 GB ROM | Expandable Upto 512 GB</li>
                                <li className="highlight_item">16.59 cm (6.53 inch) HD+ Display</li>
                                <li className="highlight_item">13MP Rear Camera | 5MP Front Camera</li>
                                <li className="highlight_item">5000 mAh Battery</li>
                            </ul>
                        </div>
                        <div className="product_detail_des">
                            <span>Description</span>
                            <p className="product_detail_des_para">
                                {productDetails.description}
                            </p>
                        </div>
                        <div className="product_detail_buy_together">
                            <span>Buy together and save upto 10%</span>
                            <div className="buy_together_prod">
                                <div className="buy_together_item">
                                    <div className="buy_together_img">
                                        <img src="https://rukminim2.flixcart.com/image/312/312/ku5ufm80/mobile/8/b/1/sport-9a-redmi-original-imag7chjvhxdhhyh.jpeg?q=70" alt="" srcset="" />
                                    </div>
                                    <div className="buy_together_name">
                                        <span>Redmi 9A Sport (Carbon Black, 32 GB)</span>
                                    </div>
                                    <div className="product_detail_rating">
                                        <span>
                                            4.2
                                            <i style={{ marginLeft: 4, fontSize: 10 }} className="fa-solid fa-star"></i>
                                        </span>
                                        <span style={{ color: '#878787', fontSize: 13 }}>(4.484)</span>
                                    </div>
                                    <div className="buy_together_price">
                                        <span className="buy_together_sell">$10</span>
                                        <span className="buy_together_root">$10</span>
                                        <span className="buy_together_off">4% off</span>
                                    </div>
                                </div>
                                <div className="buy_together_plus">
                                    <i class="fa-solid fa-plus"></i>
                                </div>
                                <div className="buy_together_item">
                                    <div className="buy_together_img">
                                        <img src="https://rukminim2.flixcart.com/image/312/312/ku5ufm80/mobile/8/b/1/sport-9a-redmi-original-imag7chjvhxdhhyh.jpeg?q=70" alt="" srcset="" />
                                    </div>
                                    <div className="buy_together_name">
                                        <span>Redmi 9A Sport (Carbon Black, 32 GB)</span>
                                    </div>
                                    <div className="product_detail_rating">
                                        <span>
                                            4.2
                                            <i style={{ marginLeft: 4, fontSize: 10 }} className="fa-solid fa-star"></i>
                                        </span>
                                        <span style={{ color: '#878787', fontSize: 13 }}>(4.484)</span>
                                    </div>
                                    <div className="buy_together_price">
                                        <span className="buy_together_sell">$10</span>
                                        <span className="buy_together_root">$10</span>
                                        <span className="buy_together_off">4% off</span>
                                    </div>
                                </div>
                                <div className="buy_together_plus">
                                    <i class="fa-solid fa-plus"></i>
                                </div>
                                <div className="buy_together_item">
                                    <div className="buy_together_img">
                                        <img src="https://rukminim2.flixcart.com/image/312/312/ku5ufm80/mobile/8/b/1/sport-9a-redmi-original-imag7chjvhxdhhyh.jpeg?q=70" alt="" srcset="" />
                                    </div>
                                    <div className="buy_together_name">
                                        <span>Redmi 9A Sport (Carbon Black, 32 GB)</span>
                                    </div>
                                    <div className="product_detail_rating">
                                        <span>
                                            4.2
                                            <i style={{ marginLeft: 4, fontSize: 10 }} className="fa-solid fa-star"></i>
                                        </span>
                                        <span style={{ color: '#878787', fontSize: 13 }}>(4.484)</span>
                                    </div>
                                    <div className="buy_together_price">
                                        <span className="buy_together_sell">$10</span>
                                        <span className="buy_together_root">$10</span>
                                        <span className="buy_together_off">4% off</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="rating_review">
                            <span>Ratings & Reviews</span>
                            <div className="rating_review_content">
                                <div className="rating_review_avg">
                                    <span style={{ display: 'flex', alignItems: 'center' }}>
                                        <span>4.2</span>
                                        <i className="fa-solid fa-star"></i>
                                    </span>
                                    <span>4,484 Ratings &</span>
                                    <span>334 Reviews</span>
                                </div>
                                <div className="rating_review_star">
                                    <ul className="rating_list">

                                        <li className="rating_item">
                                            <span>
                                                <span>5</span>
                                                <i className="fa-solid fa-star"></i>
                                            </span>
                                            <div className='rating_item_start'><span className='start start_100'></span></div>
                                            <span>2.599</span>
                                        </li>

                                        <li className="rating_item">
                                            <span>
                                                <span>4</span>
                                                <i className="fa-solid fa-star"></i>
                                            </span>
                                            <div className='rating_item_start'><span className='start start_80_100'></span></div>
                                            <span>2.599</span>
                                        </li>

                                        <li className="rating_item">
                                            <span>
                                                <span>3</span>
                                                <i className="fa-solid fa-star"></i>
                                            </span>
                                            <div className='rating_item_start'><span className='start start_50_80'></span></div>
                                            <span>2.599</span>
                                        </li>

                                        <li className="rating_item">
                                            <span>
                                                <span>2</span>
                                                <i className="fa-solid fa-star"></i>
                                            </span>
                                            <div className='rating_item_start'><span className='start start_30_50'></span></div>
                                            <span>2.599</span>
                                        </li>

                                        <li className="rating_item">
                                            <span>
                                                <span>1</span>
                                                <i className="fa-solid fa-star"></i>
                                            </span>
                                            <div className='rating_item_start'><span className='start start_0_30'></span></div>
                                            <span>2.599</span>
                                        </li>

                                    </ul>
                                </div>
                                <div className="rating_detail">
                                    <div className="rating_detail_item">
                                        <div className="rating_detaik_item_per">
                                            <svg class="HTdwVj" viewBox="0 0 100 100"><path class="MN4M6g" d="M50,4 A 46,46,0,1,1,49.9999,4" stroke-width="8" fill-opacity="0"></path><path class="_1KaZLR" d="M50,4 A 46,46,0,1,1,4.814786466480328,58.61954047094337" stroke-width="8" fill-opacity="0"></path><text class="_2Ix0io" x="40" y="58">3.6</text></svg>
                                        </div>
                                        <span style={{ fontSize: 13, marginLeft: 18 }}>Camera</span>
                                    </div>

                                    <div className="rating_detail_item">
                                        <div className="rating_detaik_item_per">
                                            <svg class="HTdwVj" viewBox="0 0 100 100"><path class="MN4M6g" d="M50,4 A 46,46,0,1,1,49.9999,4" stroke-width="8" fill-opacity="0"></path><path class="_1KaZLR" d="M50,4 A 46,46,0,1,1,4.814786466480328,58.61954047094337" stroke-width="8" fill-opacity="0"></path><text class="_2Ix0io" x="40" y="58">3.9</text></svg>
                                        </div>
                                        <span style={{ fontSize: 13, marginLeft: 18 }}>Battery</span>
                                    </div>

                                    <div className="rating_detail_item">
                                        <div className="rating_detaik_item_per">
                                            <svg class="HTdwVj" viewBox="0 0 100 100"><path class="MN4M6g" d="M50,4 A 46,46,0,1,1,49.9999,4" stroke-width="8" fill-opacity="0"></path><path class="_1KaZLR" d="M50,4 A 46,46,0,1,1,4.814786466480328,58.61954047094337" stroke-width="8" fill-opacity="0"></path><text class="_2Ix0io" x="40" y="58">3.4</text></svg>
                                        </div>
                                        <span style={{ fontSize: 13, marginLeft: 18 }}>Display</span>
                                    </div>

                                    <div className="rating_detail_item">
                                        <div className="rating_detaik_item_per">
                                            <svg class="HTdwVj" viewBox="0 0 100 100"><path class="MN4M6g" d="M50,4 A 46,46,0,1,1,49.9999,4" stroke-width="8" fill-opacity="0"></path><path class="_1KaZLR" d="M50,4 A 46,46,0,1,1,4.814786466480328,58.61954047094337" stroke-width="8" fill-opacity="0"></path><text class="_2Ix0io" x="40" y="58">3.1</text></svg>
                                        </div>
                                        <span style={{ fontSize: 13, marginLeft: 18 }}>RAM</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="interested_product">
                <div className="interested_prod_header">
                    <p>You might be interested in</p>
                </div>
                <div className="interested_prod_content">
                    <div className="interested_prod_item">
                        <div className="interested_prod_img">
                            <img src="https://rukminim2.flixcart.com/image/280/336/kr0ynbk0/smart-glass/h/o/i/vcb00307-ringtel-original-imag4xfyqyeuehh2.jpeg?q=90" alt="" />
                        </div>
                        <div className="interested_prod_shopnow">
                            <div className="interested_prod_shopnow_name">Smart Glasses</div>
                            <div className="interested_prod_shopnow_sell">Min. 40% Off</div>
                            <div className="interested_prod_shopnow_buy"><span>Shop Now</span></div>
                        </div>
                    </div>

                    <div className="interested_prod_item">
                        <div className="interested_prod_img">
                            <img src="https://rukminim2.flixcart.com/image/280/336/kxz0pe80/memory-card/microsdxc/i/o/q/mb-mc64ka-in-samsung-original-imagab3xh8bax3gm.jpeg?q=90" alt="" />
                        </div>
                        <div className="interested_prod_shopnow">
                            <div className="interested_prod_shopnow_name">Memory Cards</div>
                            <div className="interested_prod_shopnow_sell">Min. 40% Off</div>
                            <div className="interested_prod_shopnow_buy"><span>Shop Now</span></div>
                        </div>
                    </div>

                    <div className="interested_prod_item">
                        <div className="interested_prod_img">
                            <img src="https://rukminim2.flixcart.com/image/280/336/l31x2fk0/speaker-mobile-mod/w/j/c/1-minia9-super-ultra-mini-boost-wireless-portable-bluetooth-original-image8q345fndypq.jpeg?q=90" alt="" />
                        </div>
                        <div className="interested_prod_shopnow">
                            <div className="interested_prod_shopnow_name">Speaker</div>
                            <div className="interested_prod_shopnow_sell">Min. 40% Off</div>
                            <div className="interested_prod_shopnow_buy"><span>Shop Now</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default ProductDetails