import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useWebViewContent } from './useWebViewContent';
import {
    WebViewContentAboutUs,
    WebViewContentPrivacyPolicy,
    WebViewContentService,
} from './WebViewContent';

const WebViewScreen = () => {
    const { title, pageData, loading, error, handleClose, navigation, image } = useWebViewContent();
    const insets = useSafeAreaInsets();

    const headerPaddingTop = insets.top > 0 ? insets.top + 8 : 16;
    const Header = (
        <View
            className="flex-row items-center justify-between border-b border-[#e8e8e4] bg-[#fafaf8] px-5 pb-3.5"
            style={{ paddingTop: headerPaddingTop }}
        >
            <Text className="text-[15px] font-semibold tracking-tight text-[#1a1a18]">{title}</Text>
            <TouchableOpacity
                className="h-8 w-8 items-center justify-center rounded-full bg-[#f0f0ec]"
                onPress={handleClose}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                accessibilityLabel="Close"
                accessibilityRole="button"
            >
                <Text className="text-[13px] font-semibold color-[#6b6b67]">✕</Text>
            </TouchableOpacity>
        </View>
    );

    if (loading) {
        return (
            <View className="flex-1 items-center justify-center bg-[#fafaf8]">
                <ActivityIndicator size="large" color="#2d6a4f" />
            </View>
        );
    }

    if (error || !pageData) {
        return (
            <View className="flex-1 bg-[#fafaf8]">
                {Header}
                <View className="flex-1 items-center justify-center">
                    <Text className="text-base text-[#6b6b67]">Failed to load content</Text>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        className="mt-4 rounded-full bg-[#2d6a4f] px-6 py-2"
                    >
                        <Text className="text-white">Go Back</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    const Content =
        title === 'About Us' ? (
            <WebViewContentAboutUs data={pageData} />
        ) : title === 'Privacy Policy' || title === 'Terms of Service' ? (
            <WebViewContentPrivacyPolicy data={pageData} />
        ) : pageData?.category ? (
            <WebViewContentService data={pageData} />
        ) : (
            <View className="flex-1 items-center justify-center">
                <Text className="text-base text-[#6b6b67]">Coming Soon</Text>
            </View>
        );

    return (
        <View className="flex-1 bg-[#fafaf8]">
            {/*{Header}*/}
            {Content}
        </View>
    );
};

export default WebViewScreen;
