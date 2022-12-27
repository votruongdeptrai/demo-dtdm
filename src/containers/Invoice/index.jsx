import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getOrder } from '../../actions';
import './style.css'

const Invoice = (props) => {
    const dispatch = useDispatch()

    const orderDetails = useSelector((state) => state.user.orderDetails);
    useEffect(() => {
        const payload = {
            orderId: props.match.params.orderId,
        };
        dispatch(getOrder(payload));
    }, []);

    console.log('1',orderDetails)

    const formatDate = (date) => {
        if (date) {
            const d = new Date(date);
            return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
        }
        return "";
    };


    return (
        <>
            <div className="invoice-box">
                <table>
                    <tr className="top">
                        <td colspan="2">
                            <table>
                                <tr>
                                    <td className="title">
                                        <img src="https://res.cloudinary.com/de4aiajqg/image/upload/v1648442669/Img/PV-removebg-preview_fo9dmi.png" alt="Company logo" style={{ width: '100%', maxWidth: '150px', marginTop: "-30px" }} />
                                    </td>

                                    <td>
                                        Invoice #: {orderDetails._id}<br />
                                        Created: {formatDate(orderDetails.createdAt)}<br />
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <tr className="information">
                        <td colspan="2">
                            <table>
                                <tr>
                                    <td>
                                        {orderDetails.address ? orderDetails.address.address : ''}.<br />
                                        {orderDetails.address ? orderDetails.address.name : ''}<br />
                                        {orderDetails.address ? orderDetails.address.cityDistrictTown : ''}, {orderDetails.address ? orderDetails.address.mobileNumber : ''}
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <tr className="heading">
                        <td>Payment Method</td>

                        <td>Check #</td>
                        <td>Note</td>
                    </tr>

                    <tr className="details">
                        <td>{orderDetails.paymentType}</td>

                        <td>Checked</td>
                        <td>N/N</td>
                    </tr>

                    <tr className="heading">
                        <td>Item</td>

                        <td>Price</td>
                        <td>Quantity</td>
                    </tr>

                    {
                        orderDetails.items ? orderDetails.items.map((item, index) => (
                            <tr key={index} className="item">
                                <td>{item.productId.name}</td>

                                <td>${item.payablePrice}</td>
                                <td>{item.purchasedQty}</td>
                            </tr>
                        )) : ''
                    }

                    <tr className="total">
                        <td></td>

                        <td>Total: ${orderDetails.totalAmount}</td>
                    </tr>
                </table>
            </div>
        </>
    )
}

export default Invoice