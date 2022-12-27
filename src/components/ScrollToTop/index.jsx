import React, { useEffect, useState } from 'react'
import './style.css'

const ScrollToTop = ({ scrollY }) => {

    const styles = {
        position: 'fixed',
        zIndex: 8,
        right: '45%',
        fontWeight: 500,
        top: 64,
        cursor: 'pointer',
        transform: 'translateY(0)',
        visibility: 'visible',
        boxShadow: '0 3px 16px 0 rgb(0 0 0 / 11%)',
        borderRadius: 4,
        border: '1px solid #e0e0e0',
        width: 120,
        height: 40,
        textAlign: 'center',
        paddingTop: 10,
        fontSize: 13,
        backgroundColor: '#fff',
        color: '#2874f0'
    }

    const handleScrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    return (
        <>
            {scrollY ? <span onClick={handleScrollUp} style={{ ...styles }}>
                <i className="fa-solid fa-angle-up"></i>
                <span style={{ marginLeft: 4 }}>Back to top</span>
            </span> : null}
        </>
    )
}

export default ScrollToTop