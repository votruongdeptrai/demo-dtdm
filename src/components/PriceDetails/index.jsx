import React from "react";

const PriceDetails = (props) => {
    return (
        <div className="cartpage_price_details">
                        <div className="details_header">
                            <span>PRICE DETAILS</span>
                        </div>
                        <div className="details_content">
                            <div className="details_price">
                                <div className="details_price_item">
                                    <span>Price ({props.totalItem} items)</span>
                                    <span>${props.totalPrice}</span>
                                </div>
                                <div className="details_price_discount">
                                    <span>Discount</span>
                                    <span>− ${props.totalOffer.toFixed(2)}</span>
                                </div>
                                <div className="details_price_delivery">
                                    <span>Delivery Charges</span>
                                    <span>FREE</span>
                                </div>
                                <div className="details_price_fee">
                                    <span>Secured Packaging Fee</span>
                                    <span>$58</span>
                                </div>
                                <div className="details_price_total">
                                    <span>Total Amount</span>
                                    <span>${props.totalDiscount.toFixed(2)}</span>
                                </div>
                                <div className="details_price_total_discount">
                                    <span>You will save ${props.totalOffer.toFixed(2)} on this order</span>
                                </div>
                            </div>
                        </div>
                    </div>

        
    );
};

export default PriceDetails;