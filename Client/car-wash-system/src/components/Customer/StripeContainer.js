import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import PaymentForm from "./PaymentForm"
import Services from "./Services"
const PUBLIC_KEY = "pk_test_51M9OtwLTldm4L6OslWakzCTt2X51T8LILJsAPNY9LLj3oLdx77NecFpk3GmsYuFrxLPXZLf5qPVypoQyoH2DoNQh00OEcoStdf"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer(props) {
	const {  onSubmitOnline,price } = props;
	return (

		<Elements stripe={stripeTestPromise}>
			<PaymentForm  onSubmit={onSubmitOnline} price={price} />
	{/*	<Services price={price}/>*/}
		</Elements>
	)
}
