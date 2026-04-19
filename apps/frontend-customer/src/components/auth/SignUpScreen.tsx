import React from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useAuth } from '../../hooks/useAuth';

const SignUpScreen = ({ navigation }: any) => {
    const { loading, handleGoogleSignUp } = useAuth();

    return (
        <View className="flex-1 justify-center bg-white p-5">
            <Text className="mb-2.5 text-center text-[28px] font-bold">Create Account</Text>
            <Text className="mb-[30px] text-center text-base text-[#666]">Join us today</Text>

            <TouchableOpacity
                className="flex-row items-center justify-center rounded-lg bg-[#DB4437] p-[15px]"
                onPress={handleGoogleSignUp}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text className="text-base font-bold text-white">Sign up with Google</Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                <Text className="mt-5 text-center text-[#007AFF]">
                    Already have an account? Sign In
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default SignUpScreen;
