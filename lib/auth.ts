import * as Linking from 'expo-linking';
import { fetchAPI } from '@/lib/fetch';

export interface ClerkError extends Error {
	errors?: Array<{
		longMessage: string;
		message?: string;
		code?: string;
	}>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const googleOauth = async (startSSOFlow: any) => {
	try {
		const { createdSessionId, setActive, signUp } = await startSSOFlow({
			strategy: 'oauth_google',
			redirectUrl: Linking.createURL('/(root)/(tabs)/home'),
		});

		if (createdSessionId) {
			setActive?.({ session: createdSessionId });

			if (signUp?.createdUserId) {
				await fetchAPI('/(api)/user', {
					method: 'POST',
					body: JSON.stringify({
						name: `${signUp.firstName} ${signUp.lastName}`,
						email: signUp.emailAddress,
						clerkId: signUp.createdUserId,
					}),
				});
			}

			return {
				success: true,
				code: 'success',
				message: 'You have successfully authenticated',
			};
		}

		return {
			success: false,
			code: 'success',
			message: 'Something went wrong',
		};
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log('\x1b[33m\x1b[41m\x1b[1m[error]\x1b[0m', error);

		return {
			success: false,
			code: error?.code || 'error',
			message: (error as ClerkError).errors?.[0].longMessage,
		};
	}
};
