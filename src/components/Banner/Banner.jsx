import React from 'react'
import './style.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"
import Slider from "react-slick"


const Banner = ({banners}) => {

    const stylesPrev = {
        position: 'absolute',
        alignItems: 'center',
        top: '50%',
        left: 0,
        width: '47px',
        height: '104px',
        backgroundColor: 'hsla(0,0%,100%,.98)',
        boxShadow: '0 1px 5px 0 rgb(0 0 0 / 20%)',
        zIndex: 10,
        borderBottomRightRadius: '4px',
        borderTopRightRadius: '4px',
        textAlign: 'center',
        lineHeight: '40px'
    }

    const stylesNext = {
        position: 'absolute',
        alignItems: 'center',
        top: '50%',
        right: 0,
        width: '47px',
        height: '104px',
        backgroundColor: 'hsla(0,0%,100%,.98)',
        boxShadow: '0 1px 5px 0 rgb(0 0 0 / 20%)',
        zIndex: 10,
        borderBottomLeftRadius: '4px',
        borderTopLeftRadius: '4px',
        textAlign: 'center',
        lineHeight: '40px'
    }
    function PrevArrow(props) {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{ ...style, ...stylesPrev}}
            onClick={onClick}
          >
              <svg width="14.6" height="27" viewBox="0 0 16 27" xmlns="http://www.w3.org/2000/svg" class=""><path d="M16 23.207L6.11 13.161 16 3.093 12.955 0 0 13.161l12.955 13.161z" fill="#000" class="FXox6K"></path></svg>
          </div>
        );
    }

    function NextArrow(props) {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{ ...style, ...stylesNext}}
            onClick={onClick}
          >
              <svg style={{transform: 'rotate(180deg)'}} width="14.6" height="27" viewBox="0 0 16 27" xmlns="http://www.w3.org/2000/svg" class="_2-wzdc"><path d="M16 23.207L6.11 13.161 16 3.093 12.955 0 0 13.161l12.955 13.161z" fill="#000" class="FXox6K"></path></svg>
          </div>
        );
    }

    
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        useCSS: true,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
    };
    return (
        <div className='slide_banner'>
            <Slider {...settings}>
                {banners.map((banner, index) => (
                    <img key={index} src={banner} alt=''/>
                ))}
            </Slider>
        </div>
    );
}

export default Banner;