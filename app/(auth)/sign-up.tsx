import CustomButton from '@/components/CustomButton';
import InputField from '@/components/InputField';
import OAuth from '@/components/OAuth';
import { icons, images } from '@/constants';
import { Link } from 'expo-router';
import { useState } from 'react';
import { Image, ScrollView, View, Text } from 'react-native';

const SignUp = () => {
	const [form, setForm] = useState({
		name: '',
		email: '',
		password: '',
	});

	const onSignUpPress = async () => {
		// eslint-disable-next-line no-console
		console.log('sign up pressed');
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
						Create Your Account
					</Text>
				</View>

				<View className='p-5'>
					<InputField
						label='Name'
						placeholder='Enter your name'
						icon={icons.person}
						value={form.name}
						onChangeText={name => setForm({ ...form, name })}
					/>
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
						title='Sign Up'
						className='mt-6'
						onPress={onSignUpPress}
					/>

					<OAuth />

					<Link
						href='/sign-in'
						className='text-lg text-center text-general-200 mt-10'
					>
						<Text>Already have an account? </Text>
						<Text className='text-primary-500'>Log In</Text>
					</Link>
				</View>

				{/* Verification Modal */}
			</View>
		</ScrollView>
	);
};

export default SignUp;
