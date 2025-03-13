import { TextInputProps, TouchableOpacityProps } from 'react-native';

// NativeWind type for className props
type NativeWindStyleProp = string;

declare interface Driver {
	driver_id: number;
	first_name: string;
	last_name: string;
	profile_image_url: string;
	car_image_url: string;
	car_seats: number;
	rating: number;
}

declare interface MarkerData {
	latitude: number;
	longitude: number;
	id: number;
	title: string;
	profile_image_url: string;
	car_image_url: string;
	car_seats: number;
	rating: number;
	first_name: string;
	last_name: string;
	time?: number;
	price?: string;
}

declare interface MapProps {
	destinationLatitude?: number;
	destinationLongitude?: number;
	onDriverTimesCalculated?: (driversWithTimes: MarkerData[]) => void;
	selectedDriver?: number | null;
	onMapReady?: () => void;
}

declare interface Ride {
	origin_address: string;
	destination_address: string;
	origin_latitude: number;
	origin_longitude: number;
	destination_latitude: number;
	destination_longitude: number;
	ride_time: number;
	fare_price: number;
	payment_status: string;
	driver_id: number;
	user_email: string;
	created_at: string;
	driver: {
		first_name: string;
		last_name: string;
		car_seats: number;
	};
}

declare interface ButtonProps extends TouchableOpacityProps {
	title: string;
	bgVariant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'success';
	textVariant?: 'primary' | 'default' | 'secondary' | 'danger' | 'success';
	IconLeft?: React.ComponentType<any>;
	IconRight?: React.ComponentType<any>;
	/** NativeWind class names for styling */
	className?: NativeWindStyleProp;
}

declare interface GoogleInputProps {
	icon?: string;
	initialLocation?: string;
	/** NativeWind class names for container styling */
	containerStyle?: NativeWindStyleProp;
	textInputBackgroundColor?: string;
	handlePress: ({
		latitude,
		longitude,
		address,
	}: {
		latitude: number;
		longitude: number;
		address: string;
	}) => void;
}

declare interface InputFieldProps extends TextInputProps {
	label: string;
	icon?: any;
	secureTextEntry?: boolean;
	/** NativeWind class names for label styling */
	labelStyle?: NativeWindStyleProp;
	/** NativeWind class names for container styling */
	containerStyle?: NativeWindStyleProp;
	/** NativeWind class names for input styling */
	inputStyle?: NativeWindStyleProp;
	/** NativeWind class names for icon styling */
	iconStyle?: NativeWindStyleProp;
	/** NativeWind class names for component styling */
	className?: NativeWindStyleProp;
}

declare interface PaymentProps {
	fullName: string | null | undefined;
	email: string | null | undefined;
	amount: string | null | undefined;
	driverId: number | null | undefined;
	rideTime: number | null | undefined;
}

declare interface LocationStore {
	userLatitude: number | null;
	userLongitude: number | null;
	userAddress: string | null;
	destinationLatitude: number | null;
	destinationLongitude: number | null;
	destinationAddress: string | null;
	setUserLocation: ({
		latitude,
		longitude,
		address,
	}: {
		latitude: number;
		longitude: number;
		address: string;
	}) => void;
	setDestinationLocation: ({
		latitude,
		longitude,
		address,
	}: {
		latitude: number;
		longitude: number;
		address: string;
	}) => void;
}

declare interface DriverStore {
	drivers: MarkerData[];
	selectedDriver: number | null;
	setSelectedDriver: (driverId: number) => void;
	setDrivers: (drivers: MarkerData[]) => void;
	clearSelectedDriver: () => void;
}

declare interface DriverCardProps {
	item: MarkerData;
	selected: number;
	setSelected: () => void;
}
