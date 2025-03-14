import { fetchAPI } from '@/lib/fetch';
import CustomButton from './CustomButton';
import { PaymentSheetError, useStripe } from '@stripe/stripe-react-native';
import { useEffect, useState } from 'react';
import { Alert, Image, View, Text } from 'react-native';
import { PaymentProps } from '@/types/type';
import { useLocationStore } from '@/store';
import { useAuth } from '@clerk/clerk-expo';
import ReactNativeModal from 'react-native-modal';
import { images } from '@/constants';
import { router } from 'expo-router';

const Payment = ({
	fullName,
	email,
	amount,
	driverId,
	rideTime,
}: PaymentProps) => {
	const { userId } = useAuth();
	const { initPaymentSheet, presentPaymentSheet } = useStripe();
	const {
		userAddress,
		userLatitude,
		userLongitude,
		destinationAddress,
		destinationLatitude,
		destinationLongitude,
	} = useLocationStore();

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

	const initializePaymentSheet = async () => {
		const { error } = await initPaymentSheet({
			merchantDisplayName: 'Ryde Inc.',
			intentConfiguration: {
				mode: {
					amount: parseInt(amount!) * 100,
					currencyCode: 'USD',
				},
				confirmHandler: async (paymentMethod, _, intentCreationCallback) => {
					const { paymentIntent, customer } = await fetchAPI(
						'/(api)/(stripe)/create',
						{
							method: 'POST',
							headers: { 'Content-Type': 'application/json' },
							body: JSON.stringify({
								name: fullName || email!.split('@')[0],
								email,
								amount,
								paymentMethod: paymentMethod.id,
							}),
						}
					);

					if (paymentIntent.client_secret) {
						const { result } = await fetchAPI('/(api)/(stripe)/pay', {
							method: 'POST',
							headers: { 'Content-Type': 'application/json' },
							body: JSON.stringify({
								payment_method_id: paymentMethod.id,
								payment_intent_id: paymentIntent.id,
								customer_id: customer,
							}),
						});

						if (result.client_secret) {
							await fetchAPI('/(api)/ride/create', {
								method: 'POST',
								headers: { 'Content-Type': 'application/json' },
								body: JSON.stringify({
									origin_address: userAddress,
									origin_latitude: userLatitude,
									origin_longitude: userLongitude,
									destination_address: destinationAddress,
									destination_latitude: destinationLatitude,
									destination_longitude: destinationLongitude,
									ride_time: rideTime?.toFixed(0),
									fare_price: parseInt(amount!) * 100,
									payment_status: 'paid',
									driver_id: driverId,
									user_id: userId,
								}),
							});

							intentCreationCallback({ clientSecret: result.client_secret });
						}
					}
				},
			},
			returnURL: 'myapp://book-ride',
		});

		if (error) {
			Alert.alert(
				'Error',
				error.message || 'Failed to initialize payment sheet'
			);
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

			<ReactNativeModal
				isVisible={success}
				onBackdropPress={() => setSuccess(false)}
			>
				<View className='justify-center items-center bg-white p-7 rounded-2xl gap-3'>
					<Image
						source={images.check}
						className='w-28 h-28 mt-5'
					/>

					<Text className='text-2xl text-center font-JakartaBold mt-5'>
						Ride Booked !
					</Text>

					<Text className='text-md text-general-200 text-center font-JakartaSemiBold'>
						{
							'Thank you for your booking.\nYour reservation has been placed.\nPlease proceed with your trip!'
						}
					</Text>

					<CustomButton
						title='Back Home'
						onPress={() => {
							setSuccess(false);
							router.push('/(root)/(tabs)/home');
						}}
						className='mt-5 mb-5'
					/>
				</View>
			</ReactNativeModal>
		</>
	);
};

export default Payment;
