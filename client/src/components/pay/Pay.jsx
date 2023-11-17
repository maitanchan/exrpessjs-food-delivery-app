import React, { useEffect, useState } from 'react'
import './Pay.scss'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import newRequest from '../../utils/newRequest.js';
import {useParams} from 'react-router-dom'
import CheckoutForm from '../checkouForm/checkoutForm.jsx';
// import CheckoutForm from '../checkoutForm/CheckoutForm';

const stripePromise = loadStripe("pk_test_51OBfBbHs4yf7aMgt816rWsovPDEfy6h6h5fmrcqAjJGCB5y8Ae6B1Uu6kPUHoINFIPt1JgEaSPw6SyFdoy5hM9Bt001bErzD0a")


const Pay = () => {

  const [clientSecret, setClientSecret] = useState("")

  const {id} = useParams()

  useEffect(() => {

   const makeRequest = async () => {

      try {

        const res = await newRequest.post(`/orders/create-payment-intent/${id}`)

        setClientSecret(res.data.clientSecret)
        
      } catch (err) {

        console.log(err)
        
      }

   }

   makeRequest()

  },[])

  const appearance = {

    theme: 'stripe',

  }

  const options = {

    clientSecret,
    appearance,

  }

  return (

    <div className='pay'>

       {clientSecret && (

        <Elements options={options} stripe={stripePromise}>

          <CheckoutForm />

        </Elements>

      )}

    </div>
    
  )
}

export default Pay