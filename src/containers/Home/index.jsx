import React from 'react'
import Banner from '../../components/Banner/Banner'
import CardProducts from '../../components/CardProducts'
import Header from '../../components/Header'
import Layout from '../../components/Layout'
import SubHeader from '../../components/SubHeader'
import { productDataDeal, menFootwear, summer, electronic, menClothing, topPick, kitchen, banners } from '../../data'

const Home = () => {
    return (
        <>
            <Layout subheader>
                <SubHeader />
                <div style={{ backgroundColor: '#f1f3f6', padding: 8 }} className="home_container">
                    <Banner banners={banners}/>
                    <CardProducts data={productDataDeal} dealtime title='Deals of the Day' />
                    <CardProducts data={menFootwear} title="Men's Footwear" />
                    <CardProducts data={summer}title="Summer '22 Essentials" />
                    <CardProducts data={electronic}title='Best of Electronics' />
                    <CardProducts data={topPick} title="Season's top picks" />
                    <CardProducts data={menClothing} title="Men's Clothing" />
                    <CardProducts data={kitchen} title='Kitchen Appliances' />
                    <CardProducts title='Top Fashion Styles' />
                    <CardProducts title='Home Furnishing Range' />
                </div>
            </Layout>
        </>
    )
}

export default Home