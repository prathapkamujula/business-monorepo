import React, { useState } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import {getAuth, signInWithCredential, GoogleAuthProvider, getIdToken, signOut} from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { authApi } from '../../api/authApi';

GoogleSignin.configure({
    webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
});

const SignInScreen = ({ navigation }: any) => {
    const [loading, setLoading] = useState(false);

    const handleGoogleSignIn = async () => {
        setLoading(true);
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();

            const googleIdToken = userInfo?.data?.idToken;
            if (!googleIdToken) throw new Error('No ID token received');

            const credential = GoogleAuthProvider.credential(googleIdToken);
            const { user } = await signInWithCredential(getAuth(), credential);

            // Get the Firebase ID token from the signed-in user
            const firebaseIdToken = await getIdToken(user);

            try {
                await authApi.signInWithGoogle(firebaseIdToken);
            } catch (backendError: any) {
                console.error('Backend sign in error:', backendError);
                await signOut(getAuth());
                throw backendError;
            }
        } catch (error: any) {
            console.error('Sign in error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View className="flex-1 justify-center bg-white p-5">
            <Text className="mb-2.5 text-center text-[28px] font-bold">Welcome</Text>
            <Text className="mb-[30px] text-center text-base text-[#666]">Sign in to continue</Text>

            <TouchableOpacity
                className="flex-row items-center justify-center rounded-lg bg-[#DB4437] p-[15px]"
                onPress={handleGoogleSignIn}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text className="text-base font-bold text-white">Sign in with Google</Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text className="mt-5 text-center text-[#007AFF]">
                    Don't have an account? Sign Up
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default SignInScreen;
