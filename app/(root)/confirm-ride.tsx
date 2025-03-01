import { FlatList, View } from 'react-native';
import DriverCard from '@/components/DriverCard';
import RideLayout from '@/components/RideLayout';
import CustomButton from '@/components/CustomButton';
import { router } from 'expo-router';
import { useDriverStore } from '@/store';

const snapPoints = ['65%', '85%'];

const ConfirmRide = () => {
	const { drivers, selectedDriver, setSelectedDriver } = useDriverStore();

	const handleSelectRide = () => {
		router.push('/(root)/book-ride');
	};

	return (
		<RideLayout
			title='Confirm Ride'
			snapPoints={snapPoints}
		>
			<FlatList
				data={drivers}
				renderItem={({ item }) => (
					<DriverCard
						item={item}
						selected={selectedDriver!}
						setSelected={() => setSelectedDriver(item.id)}
					/>
				)}
				ListFooterComponent={() => (
					<View className='mx-5 mt-10'>
						<CustomButton
							title='Select Ride'
							onPress={handleSelectRide}
						/>
					</View>
				)}
			/>
		</RideLayout>
	);
};

export default ConfirmRide;
