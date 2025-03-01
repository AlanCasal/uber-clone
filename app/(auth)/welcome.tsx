import { onboarding } from '@/constants';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';
import CustomButton from '@/components/CustomButton';

const Onboarding = () => {
	const swiperRef = useRef<Swiper>(null);
	const [activeIndex, setActiveIndex] = useState(0);
	const isLastSlide = activeIndex === onboarding.length - 1;

	const handleNext = () => {
		if (isLastSlide) router.replace('/(auth)/sign-up');
		else swiperRef.current?.scrollBy(1);
	};

	const handleSkip = () => {
		router.replace('/(auth)/sign-up');
	};

	return (
		<SafeAreaView className='h-full items-center justify-between bg-white p-5'>
			<TouchableOpacity
				onPress={handleSkip}
				className='w-full justify-end items-end'
			>
				<Text className='text-black text-md font-JakartaBold'>Skip</Text>
			</TouchableOpacity>

			<Swiper
				ref={swiperRef}
				loop={false}
				dot={
					<View className='w-[32px] h-[4px] mx-1 bg-[#E2E8F0] rounded-full' />
				}
				activeDot={
					<View className='w-[32px] h-[4px] mx-1 bg-[#0286FF] rounded-full' />
				}
				onIndexChanged={index => setActiveIndex(index)}
			>
				{onboarding.map(item => (
					<View
						key={item.id}
						className='items-center justify-center'
					>
						<Image
							source={item.image}
							className='w-full h-[300px]'
							resizeMode='contain'
						/>
						<View className='flex-row items-center justify-center w-full mt-10'>
							<Text className='text-black text-3xl font-bold mx-10 text-center'>
								{item.title}
							</Text>
						</View>
						<Text className='text-lg font-JakartaSemiBold text-center mx-10 mt-3 text-[#858585]'>
							{item.description}
						</Text>
					</View>
				))}
			</Swiper>

			<CustomButton
				title={isLastSlide ? 'Get Started' : 'Next'}
				onPress={handleNext}
				className='mt-10'
			/>
		</SafeAreaView>
	);
};

export default Onboarding;
