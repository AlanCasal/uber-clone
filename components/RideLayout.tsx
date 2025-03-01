import { Image, Text, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { router } from 'expo-router';
import { icons } from '@/constants';
import Map from './Map';

interface RideLayoutProps {
	title?: string;
	children: React.ReactNode;
}

const RideLayout = ({ title, children }: RideLayoutProps) => {
	return (
		<GestureHandlerRootView>
			<View className='flex-1 bg-white'>
				<View className='flex-col h-screen bg-blue-500'>
					<View className='flex-row absolute z-10 top-16 items-center justify-start px-5'>
						<TouchableOpacity onPress={() => router.back()}>
							<View className='w-10 h-10 bg-white rounded-full items-center justify-center'>
								<Image
									source={icons.backArrow}
									resizeMode='contain'
									className='w-6 h-6'
								/>
							</View>
						</TouchableOpacity>
						<Text className='text-xl font-JakartaSemiBold ml-5'>
							{title || 'Go Back'}
						</Text>
					</View>
					<Map />
				</View>
			</View>
		</GestureHandlerRootView>
	);
};

export default RideLayout;
