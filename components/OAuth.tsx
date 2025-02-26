import { View, Text, Image } from 'react-native';
import CustomButton from './CustomButton';
import { icons } from '@/constants';

const OAuth = () => {
	const handleGoogleSignIn = () => {
		// eslint-disable-next-line no-console
		console.log('google login');
	};

	return (
		<View>
			<View className='flex flex-row justify-center items-center mt-4 gap-x-6'>
				<View className='flex-1 h-[1px] bg-general-100' />
				<Text className='text-lg color-general-200'>Or</Text>
				<View className='flex-1 h-[1px] bg-general-100' />
			</View>
			<CustomButton
				onPress={handleGoogleSignIn}
				title='Sign In with Google'
				className='mt-5 w-full shadow-none gap-x-2'
				bgVariant='outline'
				textVariant='primary'
				IconLeft={() => (
					<Image
						source={icons.google}
						resizeMode='contain'
						className='w-5'
					/>
				)}
			/>
		</View>
	);
};

export default OAuth;
