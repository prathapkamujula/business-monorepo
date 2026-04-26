import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Star } from 'lucide-react-native';

interface ServiceCardProps {
    item: any;
    width: number;
}

const ServiceCard = ({ item, width }: ServiceCardProps) => {
    const navigation = useNavigation<any>();
console.log({item})
    const handlePress = () => {
        navigation.navigate('WebView', {
            title: item.name,
            image: item.image,
            serviceId: item.id,
            type: 'service',
        });
    };

    return (
        <TouchableOpacity
            onPress={handlePress}
            className="elevation-5 mb-2.5 mr-5 rounded-[20px] bg-white shadow-lg shadow-black"
            style={{ width }}
        >
            {/* Image */}
            <Image
                source={{ uri: item.image }}
                className="w-full rounded-t-[20px]"
                style={{ height: width * 0.65 }}
                resizeMode="cover"
            />

            {/* Content */}
            <View className="p-4">
                <Text className="mb-2.5 text-lg font-semibold text-[#1C1C1E]" numberOfLines={1}>
                    {item.name}
                </Text>
                <View className="mt-1 flex-row items-center justify-between">
                    <View className="flex-row items-center">
                        <Text className="mr-2 text-lg font-bold text-[#5856D6]">₹{item.price}</Text>
                        <Text className="text-sm text-[#8E8E93] line-through">₹{item.mrp}</Text>
                    </View>
                    <View className="flex-row items-center rounded-lg bg-[#FFFBE6] px-2 py-1">
                        <Star size={14} color="#FFD60A" fill="#FFD60A" />
                        <Text className="ml-1 text-xs font-semibold text-[#FFD60A]">
                            {item.rating}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default ServiceCard;
