import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { addItemsSave, addToCart, moveToCart } from '../../../actions'

const CartItem = (props) => {
    const [_qty, setQty] = useState(props.cartItem.qty)
    const { _id, name, slug, price, img, discount, offer, qty } = props.cartItem

    const dispatch = useDispatch()

    const onQuantityIncrement = () => {
        setQty(_qty + 1);
        props.onQuantityInc(_id, _qty + 1);
    };

    const onQuantityDecrement = () => {
        if (_qty <= 1) return;
        setQty(_qty - 1);
        props.onQuantityDec(_id, _qty - 1);
    };

    const handleChangeQty = (e) => {
        setQty(e.target.value)
        if (+e.target.value > qty) {
            props.onQuantityInc(_id, +e.target.value + qty)
        }

        if (+e.target.value < qty) {
            props.onQuantityInc(_id, (-+e.target.value + qty))
        }
    }

    const handleSaveItem = () => {
        dispatch(addItemsSave({_id, _qty}))
    }

    const handleAddToCart = () => {
        const payload = {
            productId: _id
        }
        dispatch(addToCart({ _id, name, price, img, discount, offer, slug }, qty))
        dispatch(moveToCart({payload}))
    }
    return (
        <>
            <div className="cartpage_item">
                <div className="cartpage_item_content">
                    <div className="cartpage_img">
                        <Link to={`/${slug}/${_id}/p`}>
                            <img src={img} alt="" />
                        </Link>
                    </div>
                    <div className="cartpage_item_info">
                        <div className="cartpage_item_name">
                            <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/${slug}/${_id}/p`}>
                                <span>{name}</span>
                            </Link>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }} className="cartpage_item_seller">
                            <span>Seller: Phong Vi</span>
                            <img style={{ height: 15 }} src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png" alt="" />
                        </div>
                        <div className="cartpage_item_price">
                            <span>${discount}</span>
                            <span>${price}</span>
                            <span>{offer}% off</span>
                        </div>
                        <div className="item_package">
                            <span>+ $29 Secured Packaging Fee</span>
                        </div>
                    </div>
                    <div className="cartpage_item_delivery">
                        <span>Delivery by Fri May 27</span>
                        <span>7 Days Replacement Policy</span>
                    </div>
                </div>
                <div className="cartpage_item_buy">
                    <div className="cartpage_item_quantity">
                        <button style={props.disabled && {cursor: 'auto'}} disabled={props.disabled} onClick={onQuantityDecrement} className="dec">-</button>
                        <div className="cartpage_item_quan">
                            <input disabled={props.disabled} onChange={handleChangeQty} value={_qty} type="text" className="item_quantity" />
                        </div>
                        <button style={props.disabled && {cursor: 'auto' }} disabled={props.disabled} onClick={onQuantityIncrement} className="inc">+</button>
                    </div>
                    {props.moveToCart ? (<div onClick={handleAddToCart} className="cartpage_item_save">
                        <span>MOVE TO CART</span>
                    </div>) : (<div onClick={handleSaveItem} className="cartpage_item_save">
                        <span>SAVE FOR LATER</span>
                    </div>)}

                    <div className="cartpage_item_remove">
                        <span onClick={() => props.onRemoveCartItem(_id)}>REMOVE</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartItem