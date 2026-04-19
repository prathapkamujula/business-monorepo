import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface OfferCardProps {
    item: any;
    width: number;
    onPress?: () => void;
}

const OfferCard = ({ item, width, onPress }: OfferCardProps) => (
    <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        className="mr-[15px] flex-row items-center justify-between rounded-[20px] p-5"
        style={{ width, backgroundColor: item.color }}
    >
        <View className="mr-2 flex-1">
            <Text className="text-xl font-bold text-white" numberOfLines={1}>
                {item.title}
            </Text>
            <Text className="mt-1 text-[13px] text-white/90" numberOfLines={1}>
                {item.subtitle}
            </Text>
        </View>
        <View className="rounded-[10px] bg-white px-3 py-2">
            <Text className="text-xs font-bold" style={{ color: item.color }}>
                {item.code}
            </Text>
        </View>
    </TouchableOpacity>
);

export default OfferCard;
