import { useState } from 'react';
import { Image, ScrollView, View, Text, Alert } from 'react-native';
import { Link, router } from 'expo-router';
import { useSignIn } from '@clerk/clerk-expo';
import CustomButton from '@/components/CustomButton';
import InputField from '@/components/InputField';
import OAuth from '@/components/OAuth';
import { icons, images } from '@/constants';

interface ClerkError extends Error {
	errors?: Array<{
		longMessage: string;
		message?: string;
		code?: string;
	}>;
}

const SignIn = () => {
	const { signIn, setActive, isLoaded } = useSignIn();

	const [form, setForm] = useState({
		email: '',
		password: '',
	});

	const onSignInPress = async () => {
		if (!isLoaded) return;

		try {
			const signInAttempt = await signIn.create({
				identifier: form.email,
				password: form.password,
			});

			// If sign-in process is complete, set the created session as active and redirect the user
			if (signInAttempt.status === 'complete') {
				await setActive({ session: signInAttempt.createdSessionId });
				router.replace('/(root)/(tabs)/home');
			} else {
				// If the status isn't complete, check why. User might need to
				// complete further steps.
				Alert.alert(
					'Error',
					signInAttempt.status || 'An error occurred during sign up'
				);
			}
		} catch (err) {
			// See https://clerk.com/docs/custom-flows/error-handling
			Alert.alert(
				'Error',
				(err as ClerkError)?.errors?.[0]?.longMessage ||
					'An error occurred during sign up'
			);
		}
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
						Welcome Back! 👋🏼
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
			</View>
		</ScrollView>
	);
};

export default SignIn;
