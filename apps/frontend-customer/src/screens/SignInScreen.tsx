import React, { useState } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import customAlert from '../utils/alert';
import { authApi } from '../api/authApi';
import { useGoogleSignIn } from '../utils/authHelper';
import {useDispatch} from "react-redux";
import {setUser} from "../store/slices/authSlice";

const SignInScreen = ({ navigation }: any) => {
    const [loading, setLoading] = useState(false);
    const { signIn, loading: authLoading } = useGoogleSignIn();
    const dispatch = useDispatch();
    const handleGoogleSignIn = async () => {
        setLoading(true);
        try {
            const idToken = await signIn();
            if (!idToken) return;

            const { token, user } = await authApi.signInWithGoogle(idToken);
            dispatch(setUser({ user, idToken: token }));
        } catch (error: any) {
            console.error('Sign in error:', error);
            customAlert('Error', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View className="flex-1 justify-center p-5 bg-white">
            <Text className="text-[28px] font-bold mb-2.5 text-center">Welcome</Text>
            <Text className="text-base text-[#666] mb-[30px] text-center">Sign in to continue</Text>

            <TouchableOpacity
                className="bg-[#DB4437] p-[15px] rounded-lg items-center flex-row justify-center"
                onPress={handleGoogleSignIn}
                disabled={loading || authLoading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text className="text-white font-bold text-base">Sign in with Google</Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text className="mt-5 text-[#007AFF] text-center">Don't have an account? Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
};

export default SignInScreen;
