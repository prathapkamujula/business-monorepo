import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView,
    FlatList,
    Dimensions,
    Image,
    SafeAreaView,
} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useNavigation } from '@react-navigation/native';
import axiosInstance from '../api/axiosInstance';
import * as LucideIcons from 'lucide-react-native';
import { Star, User } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.7;

const HomeScreen = () => {
    const navigation = useNavigation<any>();
    const { user: authUser } = useSelector((state: RootState) => state.auth);
    const [name, setName] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const [fetching, setFetching] = useState(true);
    const [services, setServices] = useState<any[]>([]);
    const [offers, setOffers] = useState<any[]>([]);
    const [bestSellers, setBestSellers] = useState<any[]>([]);
    const [recentlyViewed, setRecentlyViewed] = useState<any[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setFetching(true);
        try {
            const [profileRes, homeRes] = await Promise.all([
                axiosInstance.get('/customers/profile'),
                axiosInstance.get('/home/data'),
            ]);

            const customer = profileRes.data;
            setName(customer.name || authUser?.displayName || 'User');
            setProfilePic(customer.photoUrl || authUser?.photoURL || '');

            const homeData = homeRes.data;
            setServices(homeData.services || []);
            setOffers(homeData.offers || []);
            setBestSellers(homeData.bestSellers || []);
            setRecentlyViewed(homeData.recentlyViewed || []);
        } catch (error) {
            console.error('Error fetching home data:', error);
            setName(authUser?.displayName || 'User');
            // If home data fails, keep arrays empty
        } finally {
            setFetching(false);
        }
    };

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 17) return 'Good Afternoon';
        return 'Good Evening';
    };

    const ServiceCard = ({ item }: { item: any }) => {
        const Icon = (LucideIcons as any)[item.icon] || LucideIcons.Home;
        return (
            <TouchableOpacity className="bg-white rounded-[20px] p-5 mr-5 shadow-lg shadow-black/10 elevation-5 mb-2.5" style={{ width: CARD_WIDTH }}>
                <View className="w-[60px] h-[60px] rounded-[15px] justify-center items-center mb-[15px]" style={{ backgroundColor: item.color + '15' }}>
                    <Icon color={item.color} size={32} />
                </View>
                <Text className="text-lg font-semibold text-[#1C1C1E] mb-2.5" numberOfLines={1}>
                    {item.name}
                </Text>
                <View className="flex-row justify-between items-end mt-1">
                    <View>
                        <View className="flex-row items-center mb-1">
                            <Text className="text-lg font-bold text-[#5856D6] mr-2">₹{item.price}</Text>
                            <Text className="text-sm text-[#8E8E93] line-through">₹{item.mrp}</Text>
                        </View>
                        <View className="flex-row items-center bg-[#FFFBE6] px-2 py-1 rounded-lg">
                            <Star size={14} color="#FFD60A" fill="#FFD60A" />
                            <Text className="text-xs font-semibold text-[#FFD60A] ml-1">{item.rating}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    const OfferCard = ({ item }: { item: any }) => (
        <View className="p-5 rounded-[20px] mr-[15px] flex-row justify-between items-center" style={{ width: width * 0.7, backgroundColor: item.color }}>
            <View>
                <Text className="text-white text-xl font-bold">{item.title}</Text>
                <Text className="text-white/90 text-[13px] mt-1">{item.subtitle}</Text>
            </View>
            <View className="bg-white px-3 py-2 rounded-[10px]">
                <Text className="text-xs font-bold" style={{ color: item.color }}>{item.code}</Text>
            </View>
        </View>
    );

    const BestSellerCard = ({ item }: { item: any }) => (
        <TouchableOpacity className="flex-row bg-white rounded-[20px] overflow-hidden mb-[15px] border border-[#F2F2F7] shadow-sm shadow-black/5 elevation-2">
            <Image source={{ uri: item.image }} className="w-[100px] h-[100px]" />
            <View className="flex-1 p-[15px] justify-center">
                <Text className="text-base font-bold text-[#1C1C1E] mb-2">{item.name}</Text>
                <View className="flex-row justify-between items-center">
                    <View className="flex-row items-center">
                        <Text className="text-lg font-bold text-[#5856D6] mr-2">₹{item.price}</Text>
                        <Text className="text-sm text-[#8E8E93] line-through">₹{item.mrp}</Text>
                    </View>
                    <View className="flex-row items-center bg-[#FFFBE6] px-2 py-1 rounded-lg">
                        <Star size={12} color="#FFD60A" fill="#FFD60A" />
                        <Text className="text-[11px] font-semibold text-[#FFD60A] ml-0.5">{item.rating}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    if (fetching) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="#5856D6" />
            </View>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className="flex-row justify-between items-center px-5 py-5">
                    <View>
                        <Text className="text-base text-[#8E8E93]">{getGreeting()},</Text>
                        <Text className="text-2xl font-bold text-[#1C1C1E]">{name}</Text>
                    </View>
                    <TouchableOpacity className="p-1">
                        {profilePic ? (
                            <Image source={{ uri: profilePic }} className="w-[44px] h-[44px] rounded-full bg-[#F2F2F7]" />
                        ) : (
                            <View className="w-[44px] h-[44px] rounded-full bg-[#F2F2F7] justify-center items-center">
                                <User color="#8E8E93" size={24} />
                            </View>
                        )}
                    </TouchableOpacity>
                </View>

                <View className="flex-1">
                    <View className="flex-row justify-between items-center px-5 mt-[25px] mb-[15px]">
                        <Text className="text-xl font-bold text-[#1C1C1E]">Featured Services</Text>
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('ServiceList', {
                                    title: 'Featured Services',
                                    data: services,
                                    type: 'services',
                                })
                            }
                        >
                            <Text className="text-sm text-[#5856D6] font-semibold">See All</Text>
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        data={services}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.id}
                        snapToInterval={CARD_WIDTH + 20}
                        decelerationRate="fast"
                        contentContainerClassName="pl-5 pr-[10px]"
                        renderItem={({ item }) => <ServiceCard item={item} />}
                    />

                    <View className="flex-row justify-between items-center px-5 mt-[25px] mb-[15px]">
                        <Text className="text-xl font-bold text-[#1C1C1E]">Top Offers</Text>
                    </View>

                    <FlatList
                        data={offers}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.id}
                        contentContainerClassName="pl-5 pr-[10px]"
                        renderItem={({ item }) => <OfferCard item={item} />}
                    />

                    <View className="m-5 p-5 bg-[#5856D6] rounded-[20px] h-[140px] flex-row overflow-hidden">
                        <View className="flex-1 justify-center">
                            <Text className="text-[28px] font-extrabold text-white">₹150 OFF</Text>
                            <Text className="text-base text-white/80 mb-[15px]">On your first booking</Text>
                            <TouchableOpacity className="bg-white px-[15px] py-2 rounded-[10px] self-start">
                                <Text className="text-[#5856D6] font-bold text-sm">Book Now</Text>
                            </TouchableOpacity>
                        </View>
                        <View className="w-[150px] h-[150px] rounded-full bg-white/10 absolute -right-[30px] -top-[30px]" />
                    </View>

                    <View className="flex-row justify-between items-center px-5 mt-[25px] mb-[15px]">
                        <Text className="text-xl font-bold text-[#1C1C1E]">Best Sellers</Text>
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('ServiceList', {
                                    title: 'Best Sellers',
                                    data: bestSellers,
                                    type: 'bestSellers',
                                })
                            }
                        >
                            <Text className="text-sm text-[#5856D6] font-semibold">See All</Text>
                        </TouchableOpacity>
                    </View>

                    <View className="px-5 pb-5">
                        {bestSellers.map((item) => (
                            <BestSellerCard key={item.id} item={item} />
                        ))}
                    </View>

                    {recentlyViewed.length > 0 && (
                        <>
                            <View className="flex-row justify-between items-center px-5 mt-[25px] mb-[15px]">
                                <Text className="text-xl font-bold text-[#1C1C1E]">Recently Viewed</Text>
                            </View>
                            <View className="flex-row px-5 justify-between mb-[30px]">
                                <View className="h-[100px] bg-[#F2F2F7] rounded-[15px]" style={{ width: (width - 60) / 2 }} />
                                <View className="h-[100px] bg-[#F2F2F7] rounded-[15px]" style={{ width: (width - 60) / 2 }} />
                            </View>
                        </>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;
