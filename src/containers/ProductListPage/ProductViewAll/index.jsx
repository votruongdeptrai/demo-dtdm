import React from 'react'
import Layout from '../../../components/Layout'
import ProductPage from '../ProductPage'

const ProductViewAll = (props) => {
  return (
    <Layout>
        <ProductPage {...props}/>
    </Layout>
  )
}

export default ProductViewAll