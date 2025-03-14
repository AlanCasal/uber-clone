/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/naming-convention */
import { Stripe } from 'stripe';

const STRIPE_SECRET_KEY = `${process.env.STRIPE_SECRET_KEY}`;
const stripe = new Stripe(STRIPE_SECRET_KEY);

export async function POST(req: Request) {
	try {
		const body = await req.json();

		const { payment_method_id, payment_intent_id, customer_id } = body;

		if (!payment_method_id || !payment_intent_id || !customer_id) {
			return new Response(
				JSON.stringify({
					error: 'Missing required payment information',
					status: 400,
				})
			);
		}

		const paymentMethod = await stripe.paymentMethods.attach(
			payment_method_id,
			{ customer: customer_id }
		);

		const result = await stripe.paymentIntents.confirm(payment_intent_id, {
			payment_method: paymentMethod.id,
		});

		return new Response(
			JSON.stringify({
				success: true,
				message: 'Payment successful !',
				result,
			})
		);
	} catch (error) {
		console.log('%c[error]', 'background: #2b0001; color: #fd7b7d', error);

		return new Response(
			JSON.stringify({
				error: 'Payment failed',
				status: 500,
			})
		);
	}
}
