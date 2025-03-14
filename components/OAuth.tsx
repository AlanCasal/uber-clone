import { View, Text, Image, Alert } from 'react-native';
import CustomButton from './CustomButton';
import { icons } from '@/constants';
import { useSSO } from '@clerk/clerk-expo';
import { ClerkError, googleOauth } from '@/lib/auth';
import { router } from 'expo-router';

const OAuth = () => {
	const { startSSOFlow } = useSSO();

	const handleGoogleSignIn = async () => {
		try {
			const result = await googleOauth(startSSOFlow);

			if (result.code === 'session_exists' || result.code === 'success')
				router.replace('/(root)/(tabs)/home');
		} catch (error) {
			console.log('\x1b[33m\x1b[41m\x1b[1m[error]\x1b[0m', error);

			Alert.alert('Error', (error as ClerkError).errors?.[0].longMessage);
		}
	};

	return (
		<View>
			<View className='flex-row justify-center items-center mt-4 gap-x-6'>
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
