import React from 'react'
import { useHistory } from 'react-router-dom'
import './style.css'

const SubHeader = () => {
    const history = useHistory()
  return (
    <>
        <div className="sub_header_container">
                <div className="sub_header_list">
                    <div className="sub_header_item">
                        <div className="sub_header_img">
                            <img src="https://res.cloudinary.com/de4aiajqg/image/upload/v1652491013/Category/f15c02bfeb02d15d_j5a12q.jpg" alt="" />
                        </div>
                        <div className="sub_header_name">
                            <span>Top Offers</span>
                        </div>
                    </div>
                    <div className="sub_header_item">
                        <div className="sub_header_img">
                            <img src="https://res.cloudinary.com/de4aiajqg/image/upload/v1652490928/Category/07a6a78f185d549a_eymdmh.jpg" alt="" />
                        </div>
                        <div className="sub_header_name">
                            <span>Grocery</span>
                        </div>
                    </div>
                    <div onClick={() => history.push('/mobiles')} className="sub_header_item">
                        <div className="sub_header_img">
                            <img src="https://res.cloudinary.com/de4aiajqg/image/upload/v1652490929/Category/19b17ff8cf6d89b6_weoh7e.jpg" alt="" />
                        </div>
                        <div className="sub_header_name">
                            <span>Mobiles</span>
                        </div>
                    </div>
                    <div className="sub_header_item">
                        <div className="sub_header_img">
                            <img src="https://res.cloudinary.com/de4aiajqg/image/upload/v1652490929/Category/6ec8de1d47fc9ec9_sxbchk.jpg" alt="" />
                        </div>
                        <div className="sub_header_name">
                            <span>Fashion</span>
                        </div>
                    </div>
                    <div className="sub_header_item">
                        <div className="sub_header_img">
                            <img src="https://res.cloudinary.com/de4aiajqg/image/upload/v1652490929/Category/52e3aff0b20ad632_srnox5.jpg" alt="" />
                        </div>
                        <div className="sub_header_name">
                            <span>Electronics</span>
                        </div>
                    </div>
                    <div className="sub_header_item">
                        <div className="sub_header_img">
                            <img src="https://res.cloudinary.com/de4aiajqg/image/upload/v1652490928/Category/2a284788d550ac21_mfljx8.jpg" alt="" />
                        </div>
                        <div className="sub_header_name">
                            <span>Home</span>
                        </div>
                    </div>
                    <div className="sub_header_item">
                        <div className="sub_header_img">
                            <img src="https://res.cloudinary.com/de4aiajqg/image/upload/v1652490929/Category/042f2a5ff93aa6f2_ixqz3j.jpg" alt="" />
                        </div>
                        <div className="sub_header_name">
                            <span>Appliances</span>
                        </div>
                    </div>
                    <div className="sub_header_item">
                        <div className="sub_header_img">
                            <img src="https://res.cloudinary.com/de4aiajqg/image/upload/v1652490929/Category/ef8622152adb332f_clbokc.jpg" alt="" />
                        </div>
                        <div className="sub_header_name">
                            <span>Travel</span>
                        </div>
                    </div>
                    <div className="sub_header_item">
                        <div className="sub_header_img">
                            <img src="https://res.cloudinary.com/de4aiajqg/image/upload/v1652490928/Category/13e8cd793e692f23_xsxptd.jpg" alt="" />
                        </div>
                        <div className="sub_header_name">
                            <span>Beaty, Toys & More</span>
                        </div>
                    </div>
                </div>
        </div>
    </>
  )
}

export default SubHeader