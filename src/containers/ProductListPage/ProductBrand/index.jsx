import React from 'react'
import Banner from '../../../components/Banner/Banner'
import Layout from '../../../components/Layout'
import { brands } from '../../../data'
import './style.css'

const ProductBrand = () => {
    const banners = [
        'https://rukminim2.flixcart.com/flap/844/140/image/f608296a79fac9a6.jpg?q=50',
        'https://rukminim2.flixcart.com/flap/844/140/image/21da86c5763784d6.jpg?q=50',
        'https://rukminim2.flixcart.com/flap/844/140/image/0c367788eb71b31f.jpg?q=50',
        'https://rukminim2.flixcart.com/flap/844/140/image/4464375511addb4d.jpg?q=50'
    ]
    return (
        <Layout>
            <div className="product_brand_container">
                <div className="product_brand_content">
                    <div className="product_brand_list">
                        {brands.map((brand, index) => {
                            return (
                                <div key={index} className="product_brand_item">
                                    <div className="product_brand_img">
                                        <img src={brand} alt="" />
                                    </div>
                                    <div className="product_brand_buy">
                                        <span>Shop Now</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <Banner banners={banners} />
                <div className="product_banner">
                    <img src="https://rukminim2.flixcart.com/flap/844/140/image/ff1a5494e3ba1dca.jpg?q=50" alt="" />
                </div>
                <div className="product_banner">
                    <img src="https://rukminim2.flixcart.com/flap/844/140/image/0c367788eb71b31f.jpg?q=50" alt="" />
                </div>
                <div className="product_banner">
                    <img src="https://rukminim2.flixcart.com/flap/844/140/image/b90e41d95dc21455.jpg?q=50" alt="" />
                </div>
                <div className="product_banner">
                    <img src="https://rukminim2.flixcart.com/flap/844/140/image/18b5ed60e22d056f.jpg?q=50" alt="" />
                </div>

                <div className="product_banner">
                    <img src="https://rukminim2.flixcart.com/flap/844/140/image/d893d2a4dbed5be7.jpg?q=50" alt="" />
                </div>

                <div className="product_banner">
                    <img src="https://rukminim2.flixcart.com/flap/844/140/image/903e19be50825d46.jpg?q=50" alt="" />
                </div>

                <div className="product_banner">
                    <img src="https://rukminim2.flixcart.com/flap/844/140/image/a83d4aecf5c741ae.jpg?q=50" alt="" />
                </div>
            </div>
        </Layout>
    )
}

export default ProductBrand