import { Text } from 'react-native';
import MapView, { PROVIDER_DEFAULT } from 'react-native-maps';
import { cssInterop } from 'nativewind';

// Create a styled version of MapView
const StyledMapView = cssInterop(MapView, { className: 'style' });

const Map = () => {
	return (
		<StyledMapView
			provider={PROVIDER_DEFAULT}
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
