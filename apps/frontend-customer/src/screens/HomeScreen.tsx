import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
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
            <TouchableOpacity style={styles.card}>
                <View style={[styles.iconContainer, { backgroundColor: item.color + '15' }]}>
                    <Icon color={item.color} size={32} />
                </View>
                <Text style={styles.serviceName} numberOfLines={1}>
                    {item.name}
                </Text>
                <View style={styles.cardFooter}>
                    <View>
                        <View style={styles.priceRow}>
                            <Text style={styles.price}>₹{item.price}</Text>
                            <Text style={styles.mrp}>₹{item.mrp}</Text>
                        </View>
                        <View style={styles.ratingRow}>
                            <Star size={14} color="#FFD60A" fill="#FFD60A" />
                            <Text style={styles.ratingText}>{item.rating}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    const OfferCard = ({ item }: { item: any }) => (
        <View style={[styles.offerCard, { backgroundColor: item.color }]}>
            <View>
                <Text style={styles.offerTitle}>{item.title}</Text>
                <Text style={styles.offerSubtitle}>{item.subtitle}</Text>
            </View>
            <View style={styles.offerBadge}>
                <Text style={[styles.offerCode, { color: item.color }]}>{item.code}</Text>
            </View>
        </View>
    );

    const BestSellerCard = ({ item }: { item: any }) => (
        <TouchableOpacity style={styles.bestSellerCard}>
            <Image source={{ uri: item.image }} style={styles.bestSellerImage} />
            <View style={styles.bestSellerInfo}>
                <Text style={styles.bestSellerName}>{item.name}</Text>
                <View style={styles.bestSellerFooter}>
                    <View style={styles.priceRow}>
                        <Text style={styles.price}>₹{item.price}</Text>
                        <Text style={styles.mrp}>₹{item.mrp}</Text>
                    </View>
                    <View style={styles.ratingRow}>
                        <Star size={12} color="#FFD60A" fill="#FFD60A" />
                        <Text style={styles.ratingTextSmall}>{item.rating}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    if (fetching) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#5856D6" />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.greetingText}>{getGreeting()},</Text>
                        <Text style={styles.nameText}>{name}</Text>
                    </View>
                    <TouchableOpacity style={styles.notificationButton}>
                        {profilePic ? (
                            <Image source={{ uri: profilePic }} style={styles.avatar} />
                        ) : (
                            <View style={[styles.avatar, styles.placeholderAvatar]}>
                                <User color="#8E8E93" size={24} />
                            </View>
                        )}
                    </TouchableOpacity>
                </View>

                <View style={styles.content}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Featured Services</Text>
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('ServiceList', {
                                    title: 'Featured Services',
                                    data: services,
                                    type: 'services',
                                })
                            }
                        >
                            <Text style={styles.seeAllText}>See All</Text>
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        data={services}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.id}
                        snapToInterval={CARD_WIDTH + 20}
                        decelerationRate="fast"
                        contentContainerStyle={styles.carouselContainer}
                        renderItem={({ item }) => <ServiceCard item={item} />}
                    />

                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Top Offers</Text>
                    </View>

                    <FlatList
                        data={offers}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.carouselContainer}
                        renderItem={({ item }) => <OfferCard item={item} />}
                    />

                    <View style={styles.promoCard}>
                        <View style={styles.promoContent}>
                            <Text style={styles.promoTitle}>₹150 OFF</Text>
                            <Text style={styles.promoSubtitle}>On your first booking</Text>
                            <TouchableOpacity style={styles.promoButton}>
                                <Text style={styles.promoButtonText}>Book Now</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.promoCircle} />
                    </View>

                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Best Sellers</Text>
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('ServiceList', {
                                    title: 'Best Sellers',
                                    data: bestSellers,
                                    type: 'bestSellers',
                                })
                            }
                        >
                            <Text style={styles.seeAllText}>See All</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.bestSellersContainer}>
                        {bestSellers.map((item) => (
                            <BestSellerCard key={item.id} item={item} />
                        ))}
                    </View>

                    {recentlyViewed.length > 0 && (
                        <>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>Recently Viewed</Text>
                            </View>
                            <View style={styles.placeholderRow}>
                                <View style={styles.placeholderItem} />
                                <View style={styles.placeholderItem} />
                            </View>
                        </>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 20,
    },
    greetingText: {
        fontSize: 16,
        color: '#8E8E93',
    },
    nameText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1C1C1E',
    },
    avatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#F2F2F7',
    },
    placeholderAvatar: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    notificationButton: {
        padding: 4,
    },
    content: {
        flex: 1,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 25,
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1C1C1E',
    },
    seeAllText: {
        fontSize: 14,
        color: '#5856D6',
        fontWeight: '600',
    },
    carouselContainer: {
        paddingLeft: 20,
        paddingRight: 10,
    },
    card: {
        width: CARD_WIDTH,
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        marginRight: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        marginBottom: 10,
    },
    iconContainer: {
        width: 60,
        height: 60,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    serviceName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1C1C1E',
        marginBottom: 10,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginTop: 5,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#5856D6',
        marginRight: 8,
    },
    mrp: {
        fontSize: 14,
        color: '#8E8E93',
        textDecorationLine: 'line-through',
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFBE6',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    ratingText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#FFD60A',
        marginLeft: 4,
    },
    ratingTextSmall: {
        fontSize: 11,
        fontWeight: '600',
        color: '#FFD60A',
        marginLeft: 2,
    },
    offerCard: {
        width: width * 0.7,
        padding: 20,
        borderRadius: 20,
        marginRight: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    offerTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    offerSubtitle: {
        color: 'rgba(255,255,255,0.9)',
        fontSize: 13,
        marginTop: 4,
    },
    offerBadge: {
        backgroundColor: '#fff',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 10,
    },
    offerCode: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    bestSellersContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    bestSellerCard: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 20,
        overflow: 'hidden',
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#F2F2F7',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    bestSellerImage: {
        width: 100,
        height: 100,
    },
    bestSellerInfo: {
        flex: 1,
        padding: 15,
        justifyContent: 'center',
    },
    bestSellerName: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1C1C1E',
        marginBottom: 8,
    },
    bestSellerFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    promoCard: {
        margin: 20,
        padding: 20,
        backgroundColor: '#5856D6',
        borderRadius: 20,
        height: 140,
        flexDirection: 'row',
        overflow: 'hidden',
    },
    promoContent: {
        flex: 1,
        justifyContent: 'center',
    },
    promoTitle: {
        fontSize: 28,
        fontWeight: '800',
        color: '#fff',
    },
    promoSubtitle: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.8)',
        marginBottom: 15,
    },
    promoButton: {
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 10,
        alignSelf: 'flex-start',
    },
    promoButtonText: {
        color: '#5856D6',
        fontWeight: '700',
        fontSize: 14,
    },
    promoCircle: {
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        position: 'absolute',
        right: -30,
        top: -30,
    },
    placeholderRow: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    placeholderItem: {
        width: (width - 60) / 2,
        height: 100,
        backgroundColor: '#F2F2F7',
        borderRadius: 15,
    },
});

export default HomeScreen;
