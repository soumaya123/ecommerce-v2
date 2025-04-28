import React, { useState, useEffect } from 'react';
import { Orders } from '../../services';
import Modal from 'react-bootstrap/Modal';
import { Apis } from '../../services/Api/config';
import i18n from '../../i18n';

// import { Link } from 'react-router-dom'
const ModalOrders = (props) => {

    const [show, setShow] = useState(false);
    const [orders, setOrders] = useState()
    const handleClose = () => setShow(false);
    const handleShow = async(id) =>{ 
        let o = await Orders.getOrderById(id);
        console.log(o)
        if (o) {
            setOrders(o.data)
        }
        setShow(true);}
    useEffect(() => {

    }, [])
    //console.log(orders)
    return (
        <>
            <td>

                <button class="cartb product-form__submit button" aria-label="Add to cart" onClick={() => handleShow(props.order.id)}>
                    <i className='fa fa-eye'></i>

                </button>

            </td>
            <Modal show={show} onHide={handleClose}>
                <div class="cart-notification__header">
                    <h2 class="cart-notification__heading" style={{fontSize:"20px"}}>
                        {/* <svg class="icon icon-checkmark" aria-hidden="true" focusable="false" >
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.35.643a.5.5 0 01.006.707l-6.77 6.886a.5.5 0 01-.719-.006L.638 4.845a.5.5 0 11.724-.69l2.872 3.011 6.41-6.517a.5.5 0 01.707-.006h-.001z" fill="currentColor"></path>
                    </svg> */}
                      {i18n.t('Your Order')}</h2>
                    <button type="button" class="cart-notification__close modal__close-button link link--text focus-inset" aria-label="Close" onClick={handleClose}>
                        <svg class="icon icon-close" aria-hidden="true" focusable="false"><use href="#icon-close"></use></svg>
                    </button>
                </div>
                {
                    
                        orders?.map((e, key) => {

                           return (
                                <div id="cart-notification-product" class="cart-notification-product">

                                <img class="cart-notification-product__image" src={Apis.slug+e.product[0].image}alt="" width="70" height="70" loading="lazy" />

                                <div>
                                    <h3 class="cart-notification-product__name h4">{e.name}</h3>
                                    <dl><div class="product-option">
                                        <dt>{i18n.t('Price')}: </dt>
                                        <dd>{e.price}</dd>
                                    </div></dl>
                                    <dl><div class="product-option">
                                        <dt>{i18n.t('Quantity')}: </dt>
                                        <dd>{e.quantity}</dd>
                                    </div></dl>
                                    <dl><div class="product-option">
                                        <dt>{i18n.t('Total')}: </dt>
                                        <dd>{e.total}</dd>
                                    </div></dl>
                                    
                                </div>
                            </div>)
                        }
                        )
                }
                
                {/* <Modal.Footer>
                    <button onClick={handleClose}>
                        Close
                    </button>
                    <button onClick={handleClose}>
                        Save Changes
                    </button>
                </Modal.Footer> */}
            </Modal>
        </>
    )

}

export default ModalOrders;