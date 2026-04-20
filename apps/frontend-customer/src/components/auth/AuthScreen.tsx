import React, { useState } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useAuth } from '../../hooks/useAuth';
import { useSystemParameters } from '../../hooks/useSystemParameters';

const AuthScreen = () => {
    const { loading, handleGoogleAuth } = useAuth();
    const { isFeatureEnabled } = useSystemParameters();
    const [referralCode, setReferralCode] = useState('');
    const [showReferralInput, setShowReferralInput] = useState(false);
    const [isReferralApplied, setIsReferralApplied] = useState(false);

    const handleApplyReferral = () => {
        if (referralCode.trim()) {
            setIsReferralApplied(true);
        }
    };

    const handleEditReferral = () => {
        setIsReferralApplied(false);
    };

    const handleCancelReferral = () => {
        setReferralCode('');
        setIsReferralApplied(false);
        setShowReferralInput(false);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1 bg-[#f8f9fa]"
        >
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                className="px-7"
                keyboardShouldPersistTaps="handled"
            >
                <View className="flex-1 justify-center">
                    {/* Brand */}
                    <View className="mb-14">
                        <View className="mb-8 h-11 w-11 items-center justify-center rounded-2xl bg-[#5856D6]">
                            <Text className="text-lg font-bold text-white">H</Text>
                        </View>

                        <Text className="text-[32px] font-bold leading-tight tracking-tight text-[#333]">
                            Your home,{'\n'}taken care of.
                        </Text>
                        <Text className="mt-3 text-[15px] leading-6 text-[#999]">
                            Sign in to book trusted services{'\n'}and manage your home.
                        </Text>
                    </View>

                    {/* Google CTA */}
                    <TouchableOpacity
                        className="flex-row items-center justify-center rounded-2xl bg-[#5856D6] py-[15px]"
                        onPress={() => handleGoogleAuth(isReferralApplied ? referralCode : '')}
                        disabled={loading}
                        activeOpacity={0.85}
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <View className="flex-row items-center">
                                <AntDesign
                                    name="google"
                                    size={22}
                                    color="#fff"
                                    style={{ marginRight: 10 }}
                                />
                                <Text className="text-[15px] font-semibold tracking-tight text-white">
                                    Continue with Google
                                </Text>
                            </View>
                        )}
                    </TouchableOpacity>

                    {/* Referral section */}
                    {isFeatureEnabled('show_referral_flow') && (
                        <View className="mt-6">
                            {!showReferralInput ? (
                                <TouchableOpacity
                                    onPress={() => setShowReferralInput(true)}
                                    className="py-2"
                                    activeOpacity={0.6}
                                >
                                    <Text className="text-center text-[13px] font-medium text-[#999]">
                                        Have a referral code?{' '}
                                        <Text className="font-semibold text-[#5856D6]">
                                            Add it here
                                        </Text>
                                    </Text>
                                </TouchableOpacity>
                            ) : (
                                <View className="rounded-2xl border border-[#eee] bg-white p-4">
                                    {/* Label row */}
                                    <View className="mb-3 flex-row items-center justify-between">
                                        <Text className="text-[12px] font-bold uppercase tracking-widest text-[#333]">
                                            Referral Code
                                        </Text>
                                        {isReferralApplied && (
                                            <View className="flex-row items-center rounded-full bg-emerald-50 px-2 py-[3px]">
                                                <Text className="text-[11px] font-bold uppercase tracking-wide text-emerald-600">
                                                    ✓ Applied
                                                </Text>
                                            </View>
                                        )}
                                    </View>

                                    {/* Input row */}
                                    <View className="flex-row items-center gap-2">
                                        <TextInput
                                            className={`h-12 flex-1 rounded-xl border px-4 text-[15px] font-medium ${
                                                isReferralApplied
                                                    ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                                                    : 'border-[#eee] bg-[#f8f9fa] text-[#333]'
                                            } `}
                                            placeholder="e.g. HERO25"
                                            placeholderTextColor="#bbb"
                                            value={referralCode}
                                            onChangeText={setReferralCode}
                                            autoCapitalize="characters"
                                            editable={!isReferralApplied}
                                            returnKeyType="done"
                                            onSubmitEditing={handleApplyReferral}
                                        />

                                        {!isReferralApplied ? (
                                            <TouchableOpacity
                                                onPress={handleApplyReferral}
                                                disabled={!referralCode.trim()}
                                                className={`h-12 items-center justify-center rounded-xl px-5 ${referralCode.trim() ? 'bg-[#5856D6]' : 'bg-[#eee]'} `}
                                                activeOpacity={0.8}
                                            >
                                                <Text
                                                    className={`text-[13px] font-bold ${referralCode.trim() ? 'text-white' : 'text-[#8E8E93]'}`}
                                                >
                                                    Apply
                                                </Text>
                                            </TouchableOpacity>
                                        ) : (
                                            <TouchableOpacity
                                                onPress={handleEditReferral}
                                                className="h-12 items-center justify-center rounded-xl border border-[#eee] bg-[#f8f9fa] px-5"
                                                activeOpacity={0.8}
                                            >
                                                <Text className="text-[13px] font-bold text-[#8E8E93]">
                                                    Edit
                                                </Text>
                                            </TouchableOpacity>
                                        )}
                                    </View>

                                    {/* Cancel */}
                                    <TouchableOpacity
                                        onPress={handleCancelReferral}
                                        className="mt-3 py-1"
                                        activeOpacity={0.6}
                                    >
                                        <Text className="text-center text-[12px] font-medium text-[#FF3B30]">
                                            Remove referral code
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    )}
                </View>

                {/* Footer */}
                <View className="py-8">
                    <Text className="text-center text-[11px] leading-[18px] text-[#bbb]">
                        By continuing, you agree to our{' '}
                        <Text className="text-[#8E8E93] underline">Terms of Service</Text> and{' '}
                        <Text className="text-[#8E8E93] underline">Privacy Policy</Text>.
                    </Text>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default AuthScreen;
