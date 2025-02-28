import { create } from 'zustand';
import { LocationStore } from '@/types/type';

const useLocationStore = create<LocationStore>(set => ({
	userLatitude: null,
	userLongitude: null,
	userAddress: null,
	destinationLatitude: null,
	destinationLongitude: null,
	destinationAddress: null,
	setUserLocation: ({
		latitude,
		longitude,
		address,
	}: {
		latitude: number;
		longitude: number;
		address: string;
	}) => {
		set({
			userLatitude: latitude,
			userLongitude: longitude,
			userAddress: address,
		});
	},
	setDestinationLocation: ({
		latitude,
		longitude,
		address,
	}: {
		latitude: number;
		longitude: number;
		address: string;
	}) => {
		set({
			destinationLatitude: latitude,
			destinationLongitude: longitude,
			destinationAddress: address,
		});
	},
}));

export default useLocationStore;
