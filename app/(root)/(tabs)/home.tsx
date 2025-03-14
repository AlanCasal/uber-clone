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
import { useLocationStore } from '@/store';
import {
	requestForegroundPermissionsAsync,
	getCurrentPositionAsync,
	reverseGeocodeAsync,
} from 'expo-location';
import { malagaLatitude, malagaLongitude } from '@/lib/maps';
import { router } from 'expo-router';
import { useFetch } from '@/lib/fetch';
import { Ride } from '@/types/type';

const Page = () => {
	const { setUserLocation, setDestinationLocation } = useLocationStore();
	const { user } = useUser();
	const { data: recentRides, loading } = useFetch<Ride[]>(
		`/(api)/ride/${user?.id}`
	);

	const [, setHasPermissions] = useState(false);

	const handleSignOut = () => {
		// signOut();
	};

	const handleDestinationPress = (location: {
		latitude: number;
		longitude: number;
		address: string;
	}) => {
		setDestinationLocation(location);

		router.push('/(root)/find-ride');
	};

	useEffect(() => {
		const requestLocations = async () => {
			const { status } = await requestForegroundPermissionsAsync();

			if (status !== 'granted') {
				setHasPermissions(false);
				return Alert.alert('Location permission not granted');
			}

			const location = await getCurrentPositionAsync();
			const address = await reverseGeocodeAsync({
				// latitude: location.coords?.latitude,
				// longitude: location.coords?.longitude,
				latitude: malagaLatitude,
				longitude: malagaLongitude,
			});

			setUserLocation({
				// latitude: location.coords?.latitude,
				// longitude: location.coords?.longitude,
				latitude: malagaLatitude,
				longitude: malagaLongitude,
				address: `${address[0].name}, ${address[0].region}`,
			});

			setHasPermissions(true);
		};

		requestLocations();
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
