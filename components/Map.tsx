import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import { cssInterop } from 'nativewind';
import { useDriverStore, useLocationStore } from '@/store';
import {
	calculateDriverTimes,
	calculateRegion,
	generateMarkersFromData,
} from '@/lib/maps';
import { useEffect, useState } from 'react';
import { Driver, MarkerData } from '@/types/type';
import { icons } from '@/constants';
import { useFetch } from '@/lib/fetch';
import { View, ActivityIndicator, Text } from 'react-native';
import MapViewDirections from 'react-native-maps-directions';

// Create a styled version of MapView
const StyledMapView = cssInterop(MapView, { className: 'style' });

const GOOGLE_API_KEY = `${process.env.EXPO_PUBLIC_GOOGLE_API_KEY}`;

const Map = () => {
	const { data: drivers, loading, error } = useFetch<Driver[]>('/(api)/driver');

	const {
		userLongitude,
		userLatitude,
		destinationLongitude,
		destinationLatitude,
	} = useLocationStore();

	const { selectedDriver, setDrivers } = useDriverStore();

	const [markers, setMarkers] = useState<MarkerData[]>([]);

	const region = calculateRegion({
		userLatitude,
		userLongitude,
		destinationLatitude,
		destinationLongitude,
	});

	useEffect(() => {
		if (Array.isArray(drivers) && !!drivers.length) {
			if (!userLatitude || !userLongitude) return;

			const newMarkers = generateMarkersFromData({
				data: drivers,
				userLatitude,
				userLongitude,
			});

			setMarkers(newMarkers);
		}
	}, [drivers, userLatitude, userLongitude]);

	useEffect(() => {
		if (
			markers.length &&
			destinationLatitude !== undefined &&
			destinationLongitude !== undefined
		) {
			calculateDriverTimes({
				markers,
				userLatitude,
				userLongitude,
				destinationLatitude,
				destinationLongitude,
			}).then(driversResult => {
				setDrivers(driversResult as MarkerData[]);
			});
		}
	}, [
		markers,
		userLatitude,
		userLongitude,
		destinationLatitude,
		destinationLongitude,
		setDrivers,
	]);

	if (loading || !userLongitude || !userLatitude) {
		return (
			<View className='flex-1 justify-center items-center'>
				<ActivityIndicator
					size='large'
					color='#0286ff'
				/>
			</View>
		);
	}

	if (error) {
		return (
			<View className='flex-1 justify-center items-center'>
				<Text className='text-lg font-JakartaSemiBold'>Error: {error}</Text>
			</View>
		);
	}

	return (
		<StyledMapView
			provider={PROVIDER_DEFAULT}
			initialRegion={region}
			className='w-full h-full'
			tintColor='black'
			mapType='standard'
			showsPointsOfInterest={false}
			showsUserLocation
			userInterfaceStyle='light'
		>
			{markers.map(marker => (
				<Marker
					key={marker.id}
					coordinate={{
						latitude: marker.latitude,
						longitude: marker.longitude,
					}}
					title={marker.title}
					image={
						selectedDriver === marker.id ? icons.selectedMarker : icons.marker
					}
				/>
			))}

			{destinationLatitude && destinationLongitude && (
				<>
					<Marker
						key='destination'
						coordinate={{
							latitude: destinationLatitude,
							longitude: destinationLongitude,
						}}
						title='Destination'
						image={icons.pin}
					/>

					<MapViewDirections
						origin={{
							latitude: userLatitude,
							longitude: userLongitude,
						}}
						destination={{
							latitude: destinationLatitude,
							longitude: destinationLongitude,
						}}
						strokeWidth={5}
						strokeColor='#0286ff'
						apikey={GOOGLE_API_KEY}
					/>
				</>
			)}
		</StyledMapView>
	);
};

export default Map;
