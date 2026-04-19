import React from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useAuth } from '../../hooks/useAuth';

const SignInScreen = ({ navigation }: any) => {
    const { loading, handleGoogleSignIn } = useAuth();

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
