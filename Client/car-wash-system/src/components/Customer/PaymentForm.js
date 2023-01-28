import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import React, { useState } from 'react'
import "./CSS/StripeApp.css";
import { toast } from "react-toastify";

import {  Button } from "@material-ui/core";

const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
            margin:"100px",
			iconColor: "#c4f0ff",
			color: "#fff",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#87bbfd" }
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#ffc7ee"
		}
	}
}

export default function PaymentForm(props) {
    const [success, setSuccess ] = useState(false)
    const stripe = useStripe()
    const elements = useElements()
    const {  onSubmit,price } = props;


    const onSubmitOder=()=>{
     
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })


    if(!error) {
        try {
           // price=price/222.45
          // var price;
            const {id} = paymentMethod
            const response = await axios.post("http://localhost:8030/order/payment", {
                amount: price,
                id
            })

            if(response.data.success) {
                console.log("Successful payment")
                toast.success("Payment Successfull!!", {
                    position: toast.POSITION.TOP_CENTER,
                  });
             
                  onSubmit();
                setSuccess(true)
            }

        }catch (error) {
           
            console.log("Error", error)
        }
    } else {
        console.log(error.message)
    }
}

    return (
        <>
        {!success ? 
        <form onSubmit={handleSubmit} >
            <fieldset className="FormGroup">
                <div className="FormRow">
                    <CardElement options={CARD_OPTIONS}/>
                </div>
            </fieldset>
            
            <Button
                type="submit"
                
                variant="contained"
                color="primary"
                className=""
              >
            place order {price}PKR 
                  </Button>
        </form>
        :
        <div>

        </div>
       
        }
            
        </>
    )
}
