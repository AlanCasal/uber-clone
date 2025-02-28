import { useEffect, useState } from 'react';
import {
	ActivityIndicator,
	FlatList,
	Image,
	View,
	Text,
	TouchableOpacity,
	Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUser } from '@clerk/clerk-expo';
import RideCard from '@/components/RideCard';
import { icons, images } from '@/constants';
import GoogleTextInput from '@/components/GoogleTextInput';
import Map from '@/components/Map';
import useLocationStore from '@/store';
import {
	requestForegroundPermissionsAsync,
	getCurrentPositionAsync,
	reverseGeocodeAsync,
} from 'expo-location';

const recentRides = [
	{
		ride_id: '1',
		origin_address: 'Kathmandu, Nepal',
		destination_address: 'Pokhara, Nepal',
		origin_latitude: 27.717245,
		origin_longitude: 85.323961,
		destination_latitude: 28.209583,
		destination_longitude: 83.985567,
		ride_time: 391,
		fare_price: 19500.0,
		payment_status: 'paid',
		driver_id: 2,
		user_id: '1',
		created_at: '2024-08-12 05:19:20.620007',
		user_email: 'user@example.com',
		driver: {
			driver_id: '2',
			first_name: 'David',
			last_name: 'Brown',
			profile_image_url:
				'https://ucarecdn.com/6ea6d83d-ef1a-483f-9106-837a3a5b3f67/-/preview/1000x666/',
			car_image_url:
				'https://ucarecdn.com/a3872f80-c094-409c-82f8-c9ff38429327/-/preview/930x932/',
			car_seats: 5,
			rating: '4.60',
		},
	},
	{
		ride_id: '2',
		origin_address: 'Jalkot, MH',
		destination_address: 'Pune, Maharashtra, India',
		origin_latitude: 18.609116,
		origin_longitude: 77.165873,
		destination_latitude: 18.52043,
		destination_longitude: 73.856744,
		ride_time: 491,
		fare_price: 24500.0,
		payment_status: 'paid',
		driver_id: 1,
		user_id: '1',
		created_at: '2024-08-12 06:12:17.683046',
		user_email: 'user@example.com',
		driver: {
			driver_id: '1',
			first_name: 'James',
			last_name: 'Wilson',
			profile_image_url:
				'https://ucarecdn.com/dae59f69-2c1f-48c3-a883-017bcf0f9950/-/preview/1000x666/',
			car_image_url:
				'https://ucarecdn.com/a2dc52b2-8bf7-4e49-9a36-3ffb5229ed02/-/preview/465x466/',
			car_seats: 4,
			rating: '4.80',
		},
	},
	{
		ride_id: '3',
		origin_address: 'Zagreb, Croatia',
		destination_address: 'Rijeka, Croatia',
		origin_latitude: 45.815011,
		origin_longitude: 15.981919,
		destination_latitude: 45.327063,
		destination_longitude: 14.442176,
		ride_time: 124,
		fare_price: 6200.0,
		payment_status: 'paid',
		driver_id: 1,
		user_id: '1',
		created_at: '2024-08-12 08:49:01.809053',
		user_email: 'user@example.com',
		driver: {
			driver_id: '1',
			first_name: 'James',
			last_name: 'Wilson',
			profile_image_url:
				'https://ucarecdn.com/dae59f69-2c1f-48c3-a883-017bcf0f9950/-/preview/1000x666/',
			car_image_url:
				'https://ucarecdn.com/a2dc52b2-8bf7-4e49-9a36-3ffb5229ed02/-/preview/465x466/',
			car_seats: 4,
			rating: '4.80',
		},
	},
	{
		ride_id: '4',
		origin_address: 'Okayama, Japan',
		destination_address: 'Osaka, Japan',
		origin_latitude: 34.655531,
		origin_longitude: 133.919795,
		destination_latitude: 34.693725,
		destination_longitude: 135.502254,
		ride_time: 159,
		fare_price: 7900.0,
		payment_status: 'paid',
		driver_id: 3,
		user_id: '1',
		created_at: '2024-08-12 18:43:54.297838',
		user_email: 'user@example.com',
		driver: {
			driver_id: '3',
			first_name: 'Michael',
			last_name: 'Johnson',
			profile_image_url:
				'https://ucarecdn.com/0330d85c-232e-4c30-bd04-e5e4d0e3d688/-/preview/826x822/',
			car_image_url:
				'https://ucarecdn.com/289764fb-55b6-4427-b1d1-f655987b4a14/-/preview/930x932/',
			car_seats: 4,
			rating: '4.70',
		},
	},
];

const Page = () => {
	const { setUserLocation, setDestinationLocation } = useLocationStore();
	const { user } = useUser();

	const [hasPermissions, setHasPermissions] = useState(false);

	const handleSignOut = () => {
		// signOut();
	};

	const handleDestinationPress = () => {
		console.log('\x1b[33m\x1b[44m\x1b[1m[destination pressed]\x1b[0m');
	};

	const loading = false;

	useEffect(() => {
		const requestLocations = async () => {
			const { status } = await requestForegroundPermissionsAsync();

			if (status !== 'granted') {
				setHasPermissions(false);
				return Alert.alert('Location permission not granted');
			}

			const location = await getCurrentPositionAsync();
			const address = await reverseGeocodeAsync({
				latitude: location.coords?.latitude,
				longitude: location.coords?.longitude,
			});

			setUserLocation({
				latitude: location.coords?.latitude,
				longitude: location.coords?.longitude,
				address: `${address[0].name}, ${address[0].region}`,
			});

			setHasPermissions(true);
		};

		requestLocations();
	}, []);

	return (
		<SafeAreaView className='bg-general-500'>
			<FlatList
				data={recentRides}
				renderItem={({ item }) => <RideCard ride={item} />}
				ListHeaderComponent={
					<>
						<View className='flex-row justify-between items-center my-5'>
							<Text className='text-2xl font-JakartaExtraBold'>
								Welcome{' '}
								{user?.firstName ||
									user?.emailAddresses[0].emailAddress.split('@')[0]}{' '}
								👋🏼
							</Text>

							<TouchableOpacity
								onPress={handleSignOut}
								activeOpacity={0.4}
								className='justify-center items-center w-10 h-10 rounded-full bg-white'
							>
								<Image
									source={icons.out}
									className='w-4 h-4'
									alt='sign out'
								/>
							</TouchableOpacity>
						</View>

						<GoogleTextInput
							icon={icons.search}
							containerStyle='bg-white shadow-md shadow-neutral-300'
							handlePress={handleDestinationPress}
						/>

						<>
							<Text className='text-xl font-JakartaBold mt-5 mb-3'>
								Your Current Location
							</Text>

							<View className='flex-row items-center bg-transparent h-[300px] rounded-2xl overflow-hidden'>
								<Map />
							</View>
						</>

						<Text className='text-xl font-JakartaBold mt-5 mb-3'>
							Recent Rides
						</Text>
					</>
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

export default Page;
