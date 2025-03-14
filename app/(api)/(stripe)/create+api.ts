import { Stripe } from 'stripe';

const STRIPE_SECRET_KEY = `${process.env.STRIPE_SECRET_KEY}`;
const stripe = new Stripe(STRIPE_SECRET_KEY);

export async function POST(req: Request) {
	const body = await req.json();

	const { name, email, amount } = body;

	if (!name || !email || !amount) {
		return new Response(
			JSON.stringify({
				error: 'Please enter a valid name, email and amount',
				status: 400,
			})
		);
	}

	try {
		let customer;

		const existingCustomer = await stripe.customers.list({ email });

		if (existingCustomer.data.length > 0) {
			customer = existingCustomer.data[0];
		} else {
			const newCustomer = await stripe.customers.create({ name, email });
			customer = newCustomer;
		}

		const ephemeralKey = await stripe.ephemeralKeys.create(
			{ customer: customer.id },
			{ apiVersion: '2025-02-24.acacia' }
		);
		const paymentIntent = await stripe.paymentIntents.create({
			amount: parseInt(amount) * 100,
			currency: 'usd',
			customer: customer.id,
			// In the latest version of the API, specifying the `automatic_payment_methods` parameter
			// is optional because Stripe enables its functionality by default.
			automatic_payment_methods: {
				enabled: true,
				allow_redirects: 'never',
			},
		});

		return new Response(
			JSON.stringify({
				paymentIntent,
				ephemeralKey,
				customer: customer.id,
			})
		);
	} catch (error) {
		console.log('%c[error]', 'background: #2b0001; color: #fd7b7d', error);

		return new Response(
			JSON.stringify({
				error: 'Failed to create payment intent',
				status: 500,
			})
		);
	}
}
