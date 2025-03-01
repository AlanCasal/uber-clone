import { icons } from '@/constants';
import { Tabs } from 'expo-router';
import { Image, ImageSourcePropType, View } from 'react-native';

const TabIcon = ({
	focused,
	source,
}: {
	focused: boolean;
	source: ImageSourcePropType;
}) => (
	<View
		className={`rounded-full w-12 h-12 items-center justify-center flex-row  ${focused ? 'bg-general-300' : ''}`}
	>
		<View
			className={`rounded-full w-12 h-12 items-center justify-center ${focused ? 'bg-general-400' : ''}`}
		>
			<Image
				source={source}
				tintColor='#fff'
				resizeMode='contain'
				className='w-7 h-7'
			/>
		</View>
	</View>
);

const TabsLayout = () => {
	return (
		<Tabs
			initialRouteName='home'
			screenOptions={{
				tabBarActiveTintColor: '#fff',
				tabBarInactiveTintColor: '#fff',
				tabBarShowLabel: false,
				tabBarStyle: {
					backgroundColor: '#333333',
					borderRadius: 50,
					paddingBottom: 30,
					overflow: 'hidden',
					marginHorizontal: 20,
					marginBottom: 30,
					height: 78,
					justifyContent: 'space-between',
					alignItems: 'center',
					flexDirection: 'row',
					position: 'absolute',
				},
			}}
		>
			<Tabs.Screen
				name='home'
				options={{
					title: 'Home',
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<TabIcon
							focused={focused}
							source={icons.home}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name='rides'
				options={{
					title: 'Rides',
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<TabIcon
							focused={focused}
							source={icons.list}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name='chat'
				options={{
					title: 'Chat',
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<TabIcon
							focused={focused}
							source={icons.chat}
						/>
					),
				}}
			/>

			<Tabs.Screen
				name='profile'
				options={{
					title: 'Profile',
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<TabIcon
							focused={focused}
							source={icons.profile}
						/>
					),
				}}
			/>
		</Tabs>
	);
};

export default TabsLayout;
