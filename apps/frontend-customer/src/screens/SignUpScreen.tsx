import React, { useState } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import customAlert from '../utils/alert';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { authApi } from '../api/authApi';
import { useGoogleSignIn } from '../utils/authHelper';

const SignUpScreen = ({ navigation }: any) => {
    const [loading, setLoading] = useState(false);
    const { signIn, loading: authLoading } = useGoogleSignIn();

    const handleGoogleSignUp = async () => {
        setLoading(true);
        try {
            const user = await signIn();
            if (!user) {
                setLoading(false);
                return;
            }
            const idToken = await user.getIdToken();

            // Integrate with backend
            try {
                await authApi.signUpWithGoogle(idToken);
            } catch (backendError) {
                // If backend integration fails, sign out from Firebase
                await signOut(auth);
                throw backendError;
            }

            customAlert('Success', 'Account created successfully');
        } catch (error: any) {
            console.error('Sign up error:', error);
            customAlert('Error', error.message);
        } finally {
            setLoading(false);
        }
    };

    const isButtonDisabled = loading || authLoading;

    return (
        <View className="flex-1 justify-center p-5 bg-white">
            <Text className="text-[28px] font-bold mb-2.5 text-center">Create Account</Text>
            <Text className="text-base text-[#666] mb-[30px] text-center">Join us today</Text>

            <TouchableOpacity
                className="bg-[#DB4437] p-[15px] rounded-lg items-center flex-row justify-center"
                onPress={handleGoogleSignUp}
                disabled={isButtonDisabled}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text className="text-white font-bold text-base">Sign up with Google</Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                <Text className="mt-5 text-[#007AFF] text-center">Already have an account? Sign In</Text>
            </TouchableOpacity>
        </View>
    );
};

export default SignUpScreen;
