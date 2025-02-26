import CustomButton from '@/components/CustomButton';
import InputField from '@/components/InputField';
import OAuth from '@/components/OAuth';
import { icons, images } from '@/constants';
import { Link } from 'expo-router';
import { useState } from 'react';
import { Image, ScrollView, View, Text } from 'react-native';

const SignIn = () => {
	const [form, setForm] = useState({
		email: '',
		password: '',
	});

	const onSignInPress = async () => {
		// eslint-disable-next-line no-console
		console.log('sign in pressed');
	};

	return (
		<ScrollView className='flex-1 bg-white'>
			<View className='flex-1 bg-white'>
				<View className='relative w-full h-[250px]'>
					<Image
						source={images.signUpCar}
						className='z-0 w-full h-[250px]'
					/>
					<Text className='text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5'>
						Welcome ! 👋🏼
					</Text>
				</View>

				<View className='p-5'>
					<InputField
						label='Email'
						placeholder='Enter your email'
						icon={icons.email}
						value={form.email}
						onChangeText={email => setForm({ ...form, email })}
					/>
					<InputField
						label='Password'
						placeholder='Enter your password'
						icon={icons.lock}
						value={form.password}
						onChangeText={password => setForm({ ...form, password })}
						secureTextEntry
					/>

					<CustomButton
						title='Sign In'
						className='mt-6'
						onPress={onSignInPress}
					/>

					<OAuth />

					<Link
						href='/sign-up'
						className='text-lg text-center text-general-200 mt-10'
					>
						<Text>Don't have an account? </Text>
						<Text className='text-primary-500 font-bold'>Sign Up</Text>
					</Link>
				</View>

				{/* Verification Modal */}
			</View>
		</ScrollView>
	);
};

export default SignIn;
