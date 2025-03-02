import CustomButton from './CustomButton';
import { PaymentSheetError, useStripe } from '@stripe/stripe-react-native';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

const Payment = () => {
	const { initPaymentSheet, presentPaymentSheet } = useStripe();

	const [success, setSuccess] = useState(false);

	const openPaymentSheet = async () => {
		const { error } = await presentPaymentSheet();

		if (error) {
			const errorMessage =
				error.code === PaymentSheetError.Canceled
					? 'Payment canceled'
					: error.message;

			Alert.alert('Error', errorMessage);
		} else {
			setSuccess(true);
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
				confirmHandler: confirmHandler,
			},
		});
		if (error) {
			// handle error
		}
	};

	const confirmHandler = async (
		paymentMethod,
		shouldSavePaymentMethod,
		intentCreationCallback
	) => {
		// explained later
	};

	const didTapCheckoutButton = async () => {
		// implement later
	};

	useEffect(() => {
		initializePaymentSheet();
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
