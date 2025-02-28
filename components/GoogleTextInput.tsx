import { GoogleInputProps } from '@/types/type';
import { View, Text } from 'react-native';

const GoogleTextInput = ({
	icon,
	initialLocation,
	containerStyle,
	textInputBackgroundColor,
	handlePress,
}: GoogleInputProps) => {
	return (
		<View
			className={`flex-row items-center justify-center z-50 rounded-xl mb-5 ${containerStyle}`}
		>
			<Text>Search</Text>
		</View>
	);
};

export default GoogleTextInput;
