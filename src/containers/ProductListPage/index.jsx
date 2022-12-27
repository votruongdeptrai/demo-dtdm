import React from 'react'
import Layout from '../../components/Layout'
import getParams from '../../utils/getParams'
import Clothing from './Clothing'
import ProductBrand from './ProductBrand'
import ProductPage from './ProductPage'
import ProductStore from './ProductStore/index'

const ProductListPage = (props) => {


    const renderProduct = () => {
        const params = getParams(props.location.search)
        let content = null;
        switch (params.type) {
            case "store":
                content = <ProductStore {...props} />;
                break;
            case "product":
                content = <ProductBrand {...props} />;
                break;
            case "page":
                content = <ProductPage {...props} />
                break;
            default: 
                content = <Clothing {...props} />
        }

        return content;
    }

    return (
        <>
            <Layout>
                {renderProduct()}
            </Layout>
        </>
    )
}

export default ProductListPage