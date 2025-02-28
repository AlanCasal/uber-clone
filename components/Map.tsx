import { Text } from 'react-native';
import MapView, { PROVIDER_DEFAULT } from 'react-native-maps';
import { cssInterop } from 'nativewind';
import useLocationStore from '@/store';
import { calculateRegion } from '@/lib/maps';

// Create a styled version of MapView
const StyledMapView = cssInterop(MapView, { className: 'style' });

const Map = () => {
	const {
		userLongitude,
		userLatitude,
		destinationLongitude,
		destinationLatitude,
	} = useLocationStore();

	const region = calculateRegion({
		userLatitude,
		userLongitude,
		destinationLatitude,
		destinationLongitude,
	});

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
			<Text>Map</Text>
		</StyledMapView>
	);
};

export default Map;
