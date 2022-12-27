import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCartItems, addOrder, login } from '../../actions'
import { getAddress } from '../../actions/user.action'
import Layout from '../../components/Layout'
import PriceDetails from '../../components/PriceDetails'
import { Anchor, Card, MaterialButton, MaterialInput } from '../../components/UI'
import CartPage from '../CartPage'
import AddressForm from './AddressForm'
import './style.css'
import PaypalButton from './PaypalButton'
import axios from '../../helpers/axios'

const CheckoutStep = (props) => {
    return (
        <div className="checkoutStep">
            <div
                onClick={props.onClick}
                className={`checkoutHeader ${props.active && "active"}`}
            >
                <div>
                    <span className="stepNumber">{props.stepNumber}</span>
                    <span className="stepTitle">{props.title}</span>
                </div>
            </div>
            {props.body && props.body}
        </div>
    );
};

const Address = ({ adr, selectAddress, enableAddressEditForm, confirmDeliveryAddress, onAddressSubmit }) => {
    return (
        <div className="flexRow addressContainer">
            <div>
                <input name="address" onClick={() => selectAddress(adr)} type="radio" />
            </div>
            <div className="flexRow sb addressinfo">
                {!adr.edit ? (
                    <div style={{ width: "100%" }}>
                        <div className="addressDetail">
                            <div>
                                <span className="addressName">{adr.name}</span>
                                <span className="addressType">{adr.addressType}</span>
                                <span className="addressMobileNumber">{adr.mobileNumber}</span>
                            </div>
                            {adr.selected && (
                                <Anchor
                                    name="EDIT"
                                    onClick={() => enableAddressEditForm(adr)}
                                    style={{
                                        fontWeight: "500",
                                        color: "#2874f0",
                                    }}
                                />
                            )}
                        </div>
                        <div className="fullAddress">
                            {adr.address} <br /> {`${adr.cityDistrictTown} - ${adr.pinCode}`}
                        </div>
                        {adr.selected && (
                            <MaterialButton
                                title="DELIVERY HERE"
                                onClick={() => confirmDeliveryAddress(adr)}
                                style={{
                                    width: "200px",
                                    margin: "10px 0",
                                }}
                            />
                        )}
                    </div>
                ) : (
                    <AddressForm
                        withoutLayout={true}
                        onSubmitForm={onAddressSubmit}
                        initialData={adr}
                        onCancel={() => { }}
                    />
                )}
            </div>
        </div>
    );
};

const CheckoutPage = (props) => {
    const user = useSelector((state) => state.user);
    const auth = useSelector((state) => state.auth);
    const cart = useSelector((state) => state.cart);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [newAddress, setNewAddress] = useState(false);
    const [address, setAddress] = useState([]);
    const [confirmAddress, setConfirmAddress] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [orderSummary, setOrderSummary] = useState(false);
    const [orderConfirmation, setOrderConfirmation] = useState(false);
    const [paymentOption, setPaymentOption] = useState(false);
    const [paymentType, setPaymentType] = useState('cod');
    const [confirmOrder, setConfirmOrder] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        auth.authenticate && dispatch(getAddress());
        auth.authenticate && dispatch(getCartItems());
    }, [auth.authenticate]);

    const onSubmitLogin = () => {
        dispatch(login({
            email, password
        }))
    }

    const onAddressSubmit = (addr) => {
        setSelectedAddress(addr);
        setConfirmAddress(true);
        setOrderSummary(true);
    };

    const selectAddress = (addr) => {
        //console.log(addr);
        const updatedAddress = address.map((adr) =>
            adr._id === addr._id
                ? { ...adr, selected: true }
                : { ...adr, selected: false }
        );
        setAddress(updatedAddress);
    };

    const confirmDeliveryAddress = (addr) => {
        setSelectedAddress(addr);
        setConfirmAddress(true);
        setOrderSummary(true);
    };

    const enableAddressEditForm = (addr) => {
        const updatedAddress = address.map((adr) =>
            adr._id === addr._id ? { ...adr, edit: true } : { ...adr, edit: false }
        );
        setAddress(updatedAddress);
    };

    const userOrderConfirmation = () => {
        setOrderConfirmation(true);
        setOrderSummary(false);
        setPaymentOption(true);
    };

    const onConfirmOrder = () => {
        const totalAmount = Object.keys(cart.cartItems).reduce((totalDiscount, key) => {
            const { discount, qty } = cart.cartItems[key];
            return totalDiscount + discount * qty;
        }, 0)
        const items = Object.keys(cart.cartItems).map((key) => ({
            productId: key,
            payablePrice: cart.cartItems[key].discount,
            purchasedQty: cart.cartItems[key].qty,
        }));
        const payload = {
            addressId: selectedAddress._id,
            totalAmount,
            items,
            paymentStatus: "pending",
            paymentType,
        };

        dispatch(addOrder(payload));
        setConfirmOrder(true);
    };


    useEffect(() => {
        const address = user.address.map((adr) => ({
            ...adr,
            selected: false,
            edit: false,
        }));
        setAddress(address);
    }, [user.address]);

    useEffect(() => {
        if (confirmOrder && user.placedOrderId) {
            props.history.push(`/order_details/${user.placedOrderId}`);
        }
    }, [user.placedOrderId]);

    const tranSuccess = async (payment) => {
            const { paymentID } = payment;
            await axios.post('/payment', { paymentID })
            setPaymentType('card')
    }
    return (
        <Layout>
            <div className="cartContainer" style={{ alignItems: "flex-start", display: 'flex', backgroundColor: "#f1f3f6", padding: '20px' }}>
                <div className="checkoutContainer">
                    <CheckoutStep
                        stepNumber={"1"}
                        title={"LOGIN"}
                        active={!auth.authenticate}
                        body={
                            auth.authenticate ? (
                                <div className="loggedInId">
                                    <span style={{ fontWeight: 500 }}>{auth.user.fullName}</span>
                                    <span style={{ margin: "0 5px" }}>{auth.user.email}</span>
                                </div>
                            ) : (
                                <div style={{ padding: '0 10px 4px 20px' }}>
                                    <MaterialInput onChange={(e) => setEmail(e.target.value)} label="Email" />
                                    <MaterialInput type='password' onChange={(e) => setPassword(e.target.value)} label="Password" />
                                    <MaterialButton
                                        title="CONTINUE"
                                        onClick={onSubmitLogin}
                                        style={{
                                            width: "250px",
                                            margin: "20px 0",
                                        }}
                                    />
                                </div>
                            )
                        }
                    />
                    <CheckoutStep
                        stepNumber={"2"}
                        title={"DELIVERY ADDRESS"}
                        active={!confirmAddress && auth.authenticate}
                        body={
                            <>
                                {confirmAddress ? (
                                    <div className="stepCompleted">{`${selectedAddress.name} ${selectedAddress.address} - ${selectedAddress.pinCode}`}</div>
                                ) : (
                                    address.map((adr) => (
                                        <Address
                                            selectAddress={selectAddress}
                                            enableAddressEditForm={enableAddressEditForm}
                                            confirmDeliveryAddress={confirmDeliveryAddress}
                                            onAddressSubmit={onAddressSubmit}
                                            adr={adr}
                                        />
                                    ))
                                )}
                            </>
                        }
                    />

                    {/* AddressForm */}
                    {confirmAddress ? null : newAddress ? (
                        <AddressForm onSubmitForm={onAddressSubmit} onCancel={() => { }} />
                    ) : auth.authenticate ? (
                        <CheckoutStep
                            stepNumber={"+"}
                            title={"ADD NEW ADDRESS"}
                            active={false}
                            onClick={() => setNewAddress(true)}
                        />
                    ) : null}

                    <CheckoutStep
                        stepNumber={"3"}
                        title={"ORDER SUMMARY"}
                        active={orderSummary}
                        body={
                            orderSummary ? (
                                <CartPage onlyCartItems={true} />
                            ) : orderConfirmation ? (
                                <div className="stepCompleted">
                                    {Object.keys(cart.cartItems).length} items
                                </div>
                            ) : null
                        }
                    />

                    {orderSummary && (
                        <Card
                            style={{
                                margin: "10px 0",
                            }}
                        >
                            <div
                                className="flexRow sb"
                                style={{
                                    padding: "20px",
                                    alignItems: "center",
                                }}
                            >
                                <p style={{ fontSize: "12px" }}>
                                    Order confirmation email will be sent to{" "}
                                    <strong>{auth.user.email}</strong>
                                </p>
                                <MaterialButton
                                    title="CONTINUE"
                                    onClick={userOrderConfirmation}
                                    style={{
                                        width: "200px",
                                    }}
                                />
                            </div>
                        </Card>
                    )}

                    <CheckoutStep
                        stepNumber={"4"}
                        title={"PAYMENT OPTIONS"}
                        active={paymentOption}
                        body={
                            paymentOption && (
                                <div>
                                    <div
                                        className="flexRow"
                                        style={{
                                            alignItems: "center",
                                            padding: "20px",
                                        }}
                                    >
                                        <div> 
                                            <div>
                                                <input style={{marginRight: 10}} id='cod' type='radio' checked={paymentType === 'cod'} onChange={() =>  setPaymentType('cod')} />
                                                <label htmlFor="cod">Cash</label>
                                                <div>Or</div>
                                            </div>
                                            <input style={{marginRight: 10}} type='radio' checked={paymentType === 'card'} />
                                            <PaypalButton
                                                total={Object.keys(cart.cartItems).reduce((totalDiscount, key) => {
                                                    const { discount, qty } = cart.cartItems[key];
                                                    return totalDiscount + discount * qty;
                                                }, 0)}
                                                tranSuccess={tranSuccess}
                                            />
                                        </div>
                                    </div>
                                    <MaterialButton
                                        title="CONFIRM ORDER"
                                        onClick={onConfirmOrder}
                                        style={{
                                            width: "200px",
                                            margin: "0 0 20px 20px",
                                        }}
                                    />
                                </div>
                            )
                        }
                    />
                </div>

                {/* Price Component */}
                <PriceDetails
                    totalItem={Object.keys(cart.cartItems).reduce(function (qty, key) {
                        return qty + cart.cartItems[key].qty;
                    }, 0)}
                    totalPrice={Object.keys(cart.cartItems).reduce((totalPrice, key) => {
                        const { price, qty } = cart.cartItems[key];
                        return totalPrice + price * qty;
                    }, 0)}
                    totalOffer={Object.keys(cart.cartItems).reduce((totalPrice, key) => {
                        const { price, qty, offer } = cart.cartItems[key];
                        return totalPrice + price * offer / 100 * qty;
                    }, 0)}
                    totalDiscount={Object.keys(cart.cartItems).reduce((totalDiscount, key) => {
                        const { discount, qty } = cart.cartItems[key];
                        return totalDiscount + discount * qty;
                    }, 0)}
                />
            </div>
        </Layout>
    );
};

export default CheckoutPage;