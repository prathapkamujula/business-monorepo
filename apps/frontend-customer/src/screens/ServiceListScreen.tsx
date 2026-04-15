import React from 'react';
import {
    Text,
    View,
    FlatList,
    TouchableOpacity,
    SafeAreaView,
    Image,
    Dimensions,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ArrowLeft, Star } from 'lucide-react-native';
import * as LucideIcons from 'lucide-react-native';

const { width } = Dimensions.get('window');

const ServiceListScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { title, data, type } = route.params as any;

    const renderServiceItem = ({ item }: { item: any }) => {
        const Icon = (LucideIcons as any)[item.icon] || LucideIcons.Home;
        return (
            <TouchableOpacity className="flex-row items-center bg-white rounded-[15px] p-[15px] mb-[15px] border border-[#F2F2F7]">
                <View className="w-[50px] h-[50px] rounded-[12px] justify-center items-center mr-[15px]" style={{ backgroundColor: item.color + '15' }}>
                    <Icon color={item.color} size={24} />
                </View>
                <View className="flex-1">
                    <Text className="text-base font-semibold text-[#1C1C1E] mb-1">{item.name}</Text>
                    <View className="flex-row items-center">
                        <Text className="text-base font-bold text-[#5856D6] mr-2">₹{item.price}</Text>
                        <Text className="text-[13px] text-[#8E8E93] line-through">₹{item.mrp}</Text>
                    </View>
                </View>
                <View className="flex-row items-center bg-[#FFFBE6] px-2 py-1 rounded-lg">
                    <Star size={14} color="#FFD60A" fill="#FFD60A" />
                    <Text className="text-xs font-semibold text-[#FFD60A] ml-1">{item.rating}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    const renderBestSellerItem = ({ item }: { item: any }) => (
        <TouchableOpacity className="flex-row bg-white rounded-[15px] overflow-hidden mb-[15px] border border-[#F2F2F7]">
            <Image source={{ uri: item.image }} className="w-20 h-20" />
            <View className="flex-1 p-3 justify-center">
                <Text className="text-[15px] font-bold text-[#1C1C1E] mb-1.5">{item.name}</Text>
                <View className="flex-row justify-between items-center">
                    <View className="flex-row items-center">
                        <Text className="text-base font-bold text-[#5856D6] mr-2">₹{item.price}</Text>
                        <Text className="text-[13px] text-[#8E8E93] line-through">₹{item.mrp}</Text>
                    </View>
                    <View className="flex-row items-center bg-[#FFFBE6] px-2 py-1 rounded-lg">
                        <Star size={12} color="#FFD60A" fill="#FFD60A" />
                        <Text className="text-[11px] font-semibold text-[#FFD60A] ml-0.5">{item.rating}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-row items-center justify-between px-2.5 py-[15px] border-b border-[#F2F2F7]">
                <TouchableOpacity onPress={() => navigation.goBack()} className="p-2.5">
                    <ArrowLeft color="#1C1C1E" size={24} />
                </TouchableOpacity>
                <Text className="text-lg font-bold text-[#1C1C1E]">{title}</Text>
                <View className="w-10" />
            </View>

            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={type === 'bestSellers' ? renderBestSellerItem : renderServiceItem}
                contentContainerClassName="p-5"
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
};

export default ServiceListScreen;
