import React, { useEffect, useState } from "react";
import "./checkoutForm.scss";
import {PaymentElement,LinkAuthenticationElement, useStripe,useElements} from "@stripe/react-stripe-js";

const CheckoutForm = () => {

    const stripe = useStripe()

    const elements = useElements()

    const [email, setEmail] = useState('')

    const [message, setMessage] = useState(null)
    
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {

        if (!stripe) {

          return

        }
    
        const clientSecret = new URLSearchParams(window.location.search).get(

          "payment_intent_client_secret"

        )
    
        if (!clientSecret) {

          return

        }
    
        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {

          switch (paymentIntent.status) {

            case "succeeded":
              setMessage("Payment succeeded!");
              break;
            case "processing":
              setMessage("Your payment is processing.");
              break;
            case "requires_payment_method":
              setMessage("Your payment was not successful, please try again.");
              break;
            default:
              setMessage("Something went wrong.");
              break;

          }

        })

      }, [stripe])

      const handleSubmit = async (e) => {

        e.preventDefault()
    
        if (!stripe || !elements) {

          return

        }
    
        setIsLoading(true)
    
        const { error } = await stripe.confirmPayment({

          elements,
          confirmParams: {

            return_url: "http://localhost:5173/success",
            
          },

        })

        if (error.type === "card_error" || error.type === "validation_error") {

          setMessage(error.message)

        } else {

          setMessage("An unexpected error occurred.")

        }
    
        setIsLoading(false)

      }
    
      const paymentElementOptions = {

        layout: "tabs"

      }

  return (
<><div className="formPay">
    <form id="payment-form" onSubmit={handleSubmit}  style={{ maxWidth: "500px", maxHeight:"600px", margin: "0 auto", padding: "20px", border: "1px solid #013914", backgroundColor: "#dbd8e3", textAlign: "center", marginTop:"50px", marginBottom:"100px", borderRadius:"10px" }}>
<h2>Thông tin thanh toán</h2>
    <LinkAuthenticationElement
      id="link-authentication-element"
      onChange={(e) => setEmail(e.target.value)}
    />

    <PaymentElement id="payment-element" options={paymentElementOptions} />

    <button disabled={isLoading || !stripe || !elements} id="submit" style={{ marginTop:"10px", backgroundColor:"#2a2438", border:"none", padding:"15px 25px", color:"white", borderRadius:"5px"}}>

      <span id="button-text" >
        {isLoading ? <div className="spinner" id="spinner"></div> : "Thanh toán"}
      </span>

    </button>

    {message && <div id="payment-message">{message}</div>}

  </form>
  </div>
  </>
  )
}

export default CheckoutForm