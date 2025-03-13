import 'react-native-get-random-values';
import { GoogleInputProps } from '@/types/type';
import React from 'react';
import { View, Image } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { icons } from '@/constants';

const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;
const GOOGLE_PLACE_API =
	'https://maps.googleapis.com/maps/api/place/details/json';

const GoogleTextInput = ({
	icon,
	initialLocation,
	containerStyle,
	textInputBackgroundColor,
	handlePress,
}: GoogleInputProps) => {
	const fetchPlaceDetails = async (placeId: string, description: string) => {
		try {
			const response = await fetch(
				`${GOOGLE_PLACE_API}?place_id=${placeId}&key=${GOOGLE_API_KEY}&fields=geometry`
			);
			const data = await response.json();

			if (
				data.result &&
				data.result.geometry &&
				data.result.geometry.location
			) {
				handlePress({
					latitude: data.result.geometry.location.lat,
					longitude: data.result.geometry.location.lng,
					address: description,
				});
			} else {
				console.error('Failed to get location coordinates:', data);
				// Fallback to default coordinates if needed
				handlePress({
					latitude: 0,
					longitude: 0,
					address: description,
				});
			}
		} catch (error) {
			console.error('Error fetching place details:', error);
			// Fallback to default coordinates
			handlePress({
				latitude: 0,
				longitude: 0,
				address: description,
			});
		}
	};

	return (
		<View
			className={`flex-row items-center justify-center z-50 rounded-xl mb-5 ${containerStyle}`}
		>
			<GooglePlacesAutocomplete
				placeholder='Where do you want to go?'
				onPress={data => {
					if (data.place_id) fetchPlaceDetails(data.place_id, data.description);
					else {
						// Fallback if place_id is not available
						handlePress({
							latitude: 0,
							longitude: 0,
							address: data.description,
						});
					}
				}}
				styles={{
					textInputContainer: {
						alignItems: 'center',
						justifyContent: 'center',
						borderRadius: 20,
						marginHorizontal: 20,
						shadowColor: '#d4d4d4',
					},
					textInput: {
						backgroundColor: textInputBackgroundColor || '#fff',
						fontSize: 16,
						fontWeight: '600',
						marginTop: 5,
						width: '100%',
						borderRadius: 200,
					},
					listView: {
						backgroundColor: textInputBackgroundColor || '#fff',
						top: 0,
						width: '100%',
						borderRadius: 10,
						shadowColor: '#d4d4d4',
						zIndex: 99,
					},
				}}
				textInputProps={{
					placeholderTextColor: '#c4c4c4',
					placeholder: initialLocation ?? 'Where do you want to go?',
				}}
				renderLeftButton={() => (
					<View className='justify-center items-center w-6 h-6'>
						<Image
							source={icon ? icon : icons.search}
							className='w-6 h-6'
							resizeMode='contain'
						/>
					</View>
				)}
				debounce={200}
				query={{ key: GOOGLE_API_KEY, language: 'en' }}
			/>
		</View>
	);
};

export default GoogleTextInput;
