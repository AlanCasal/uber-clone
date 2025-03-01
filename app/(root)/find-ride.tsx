import { View, Text } from 'react-native';
import { useLocationStore } from '@/store';
import RideLayout from '@/components/RideLayout';

const FindRide = () => {
	const {
		userAddress,
		destinationAddress,
		setUserLocation,
		setDestinationLocation,
	} = useLocationStore();

	return (
		<RideLayout>
			<View>
				<Text className='text-2xl'>Find Ride</Text>
			</View>
		</RideLayout>
	);
};

export default FindRide;
