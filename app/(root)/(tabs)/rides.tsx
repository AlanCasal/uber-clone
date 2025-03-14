import RideCard from '@/components/RideCard';
import { images } from '@/constants';
import { useFetch } from '@/lib/fetch';
import { Ride } from '@/types/type';
import { useUser } from '@clerk/clerk-expo';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Rides = () => {
	const { user } = useUser();
	const { data: recentRides, loading } = useFetch<Ride[]>(
		`/(api)/ride/${user?.id}`
	);

	return (
		<SafeAreaView>
			<FlatList
				data={recentRides}
				renderItem={({ item }) => <RideCard ride={item} />}
				ListHeaderComponent={
					<Text className='text-xl font-JakartaBold mt-5 mb-3 my-5'>
						All Rides
					</Text>
				}
				ListEmptyComponent={
					<View className='flex-1 justify-center items-center'>
						{loading ? (
							<ActivityIndicator
								size='large'
								color='#0286ff'
							/>
						) : (
							<>
								<Image
									source={images.noResult}
									className='w-40 h-40'
									alt='no recent rides found'
								/>
								<Text className='text-sm'>No recent rides found</Text>
							</>
						)}
					</View>
				}
				className='mx-5'
				keyboardShouldPersistTaps='handled'
				contentContainerStyle={{ paddingBottom: 100 }}
			/>
		</SafeAreaView>
	);
};

export default Rides;
