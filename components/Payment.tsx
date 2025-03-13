import { fetchAPI } from '@/lib/fetch';
import CustomButton from './CustomButton';
import { PaymentSheetError, useStripe } from '@stripe/stripe-react-native';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { PaymentProps } from '@/types/type';

const Payment = ({
	fullName,
	email,
	amount,
	driverId,
	rideTime,
}: PaymentProps) => {
	const { initPaymentSheet, presentPaymentSheet } = useStripe();

	const [success, setSuccess] = useState(false);

	const openPaymentSheet = async () => {
		await initializePaymentSheet();

		const { error } = await presentPaymentSheet();

		if (!error) setSuccess(true);
		else {
			const errorMessage =
				error.code === PaymentSheetError.Canceled
					? 'Payment canceled'
					: error.message;

			Alert.alert('Error', errorMessage);
		}
	};

	const confirmHandler = async (paymentMethod, _, intentCreationCallback) => {
		const { paymentIntent, customer } = await fetchAPI(
			'(api)/(stripe)/create',
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name: fullName || email.split('@')[0],
					email,
					amount,
					paymentMethod: paymentMethod.id,
				}),
			}
		);

		if (paymentIntent.client_secret) {
			const { result } = await fetchAPI('(api)/(stripe)/pay', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					payment_method_id: paymentMethod.id,
					payment_intent_id: paymentIntent.id,
					customer_id: customer,
				}),
			});

			if (result.client_secret) {
			}
		}
	};

	const initializePaymentSheet = async () => {
		const { error } = await initPaymentSheet({
			merchantDisplayName: 'Example, Inc.',
			intentConfiguration: {
				mode: {
					amount: 1099,
					currencyCode: 'USD',
				},
				confirmHandler,
			},
		});
		if (error) {
			// handle error
		}
	};

	useEffect(() => {
		initializePaymentSheet();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<CustomButton
				title='Confirm Ride'
				onPress={openPaymentSheet}
				className='my-10'
			/>
		</>
	);
};

export default Payment;
