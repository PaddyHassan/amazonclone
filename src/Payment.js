import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react'
import CurrencyFormat from 'react-currency-format';
import { Link, useNavigate } from 'react-router-dom';
import CheckoutProduct from './CheckoutProduct';
import './Payment.css'
import { getBasketTotal } from './reducer';
import { useStateValue } from './StateProvider'
import axios from './axios';
import { db } from './firebase';

function Payment() {
    const [{ basket, user }, dispatch] = useStateValue();

    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    // states
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState('');
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(() => {
        // generate the special stripe secret which allows us to charge a customer
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                // Stripe expects the total in a currencies subunits
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            });
            setClientSecret(response.data.clientSecret)
        }

        getClientSecret();
    }, [basket])

    console.log('The secret is >>> ', clientSecret)

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);
        // ^^^ disables buy button to pervent multiple clicks

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            // paymentIntent = payment confirmation

            db
                .collection('users')
                .doc(user?.uid)
                .collection('orders')
                .doc(paymentIntent.id)
                .set({
                    basket: basket,
                    amount: paymentIntent.amount,
                    created: paymentIntent.created
                })

            setSucceeded(true);
            setError(null)
            setProcessing(false)

            dispatch({
                type: 'EMPTY_BASKET'
            })

            navigate('/orders', { replace: true }) //replace used as do not want user to come back to payment page
        })
    }

    const handleChange = event => {
        // listen for changes and display errors as customer types card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : '');
    }

  return (
    <div className='payment'>
        <div className='payment_container'>
            <h1>
                Checkout (<Link to="/checkout">{basket?.length} items</Link>)
            </h1>
            {/* payment section - delivery*/}
            <div className='payment_section'>
                <div className='payment_title'>
                    <h3>Delivery Address</h3>
                </div>
                <div className='payment_address'>
                    <p>{user?.email}</p>
                    <p>123 React Lane</p>
                    <p>Devon, EX1 2EX, England</p>
                </div>
            </div>

            {/* payment section - review items*/}
            <div className='payment_section'>
                <div className='payment_title'>
                    <h3>Review Items and Delivery</h3>
                </div>
                <div className='payment_items'>
                {basket.map(item => (
                    <CheckoutProduct 
                        id= {item.id}
                        title= {item.title}
                        image= {item.image}
                        price= {item.price}
                        rating= {item.rating}
                    />
                ))}
                </div>
            </div>
            {/* payment section - payment*/}
            <div className='payment_section'>
                <div className='payment_title'>
                    <h3>Payment Method</h3>
                </div>
                <div className='payment_details'>
                    {/* Stripe */}
                    <form onSubmit={handleSubmit}>
                        <CardElement onChange={handleChange}/>

                        <div className='payment_priceContainer'>
                            <CurrencyFormat
                                renderText={(value) => (
                                    <h3>Order Total: {value}</h3>
                                )}
                                decimalScale={2}
                                value={getBasketTotal(basket)}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"£"}
                            />
                            <button disabled={processing || disabled || succeeded}>
                                <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                            </button>
                        </div>
                        {/* Errors */}
                        {error && <div>{error}</div>}
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Payment