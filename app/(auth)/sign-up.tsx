/* eslint-disable no-console */
import CustomButton from '@/components/CustomButton';
import InputField from '@/components/InputField';
import OAuth from '@/components/OAuth';
import { icons, images } from '@/constants';
import { useSignUp } from '@clerk/clerk-expo';
import { Link } from 'expo-router';
import { useState } from 'react';
import { Image, ScrollView, View, Text, Button, TextInput } from 'react-native';

// Define the Clerk error type
interface ClerkError extends Error {
	errors?: Array<{
		longMessage: string;
		message?: string;
		code?: string;
	}>;
}

const SignUp = () => {
	const { isLoaded, signUp, setActive } = useSignUp();
	const [form, setForm] = useState({
		name: '',
		email: '',
		password: '',
	});

	const [verification, setVerification] = useState({
		state: 'default',
		error: '',
		code: '',
	});

	const onSignUpPress = async () => {
		if (!isLoaded) return;

		// Start sign-up process using email and password provided
		try {
			await signUp.create({
				emailAddress: form.email,
				password: form.password,
			});

			// Send user an email with verification code
			await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

			// Set 'pendingVerification' to true to display second form
			// and capture OTP code
			setVerification({
				...verification,
				state: 'pending',
			});
		} catch (err) {
			// See https://clerk.com/docs/custom-flows/error-handling
			// for more info on error handling
			console.error(JSON.stringify(err, null, 2));
		}
	};

	// Handle submission of verification form
	const onVerifyPress = async () => {
		if (!isLoaded) return;

		try {
			// Use the code the user provided to attempt verification
			const signUpAttempt = await signUp.attemptEmailAddressVerification({
				code: verification.code,
			});

			// If verification was completed, set the session to active
			// and redirect the user
			if (signUpAttempt.status === 'complete') {
				// TODO: create user in db
				await setActive({ session: signUpAttempt.createdSessionId });
				setVerification({
					...verification,
					state: 'success',
				});
			} else {
				setVerification({
					...verification,
					state: 'failed',
					error: 'Verification failed',
				});
			}
		} catch (err) {
			setVerification({
				...verification,
				state: 'failed',
				error:
					(err as ClerkError)?.errors?.[0]?.longMessage ||
					'An error occurred during verification',
			});
		}
	};

	if (pendingVerification) {
		return (
			<>
				<Text>Verify your email</Text>
				<TextInput
					value={code}
					placeholder='Enter your verification code'
					onChangeText={code => setCode(code)}
				/>
				<Button
					title='Verify'
					onPress={onVerifyPress}
				/>
			</>
		);
	}

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
						<Text className='text-primary-500 font-bold'>Log In</Text>
					</Link>
				</View>

				{/* Verification Modal */}
			</View>
		</ScrollView>
	);
};

export default SignUp;
