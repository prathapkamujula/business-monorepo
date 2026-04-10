import React from 'react';
import {
    StyleSheet,
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
            <TouchableOpacity style={styles.serviceItem}>
                <View style={[styles.iconContainer, { backgroundColor: item.color + '15' }]}>
                    <Icon color={item.color} size={24} />
                </View>
                <View style={styles.serviceInfo}>
                    <Text style={styles.serviceName}>{item.name}</Text>
                    <View style={styles.priceRow}>
                        <Text style={styles.price}>₹{item.price}</Text>
                        <Text style={styles.mrp}>₹{item.mrp}</Text>
                    </View>
                </View>
                <View style={styles.ratingRow}>
                    <Star size={14} color="#FFD60A" fill="#FFD60A" />
                    <Text style={styles.ratingText}>{item.rating}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    const renderBestSellerItem = ({ item }: { item: any }) => (
        <TouchableOpacity style={styles.bestSellerItem}>
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

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <ArrowLeft color="#1C1C1E" size={24} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{title}</Text>
                <View style={{ width: 40 }} />
            </View>

            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={type === 'bestSellers' ? renderBestSellerItem : renderServiceItem}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F2F2F7',
    },
    backButton: {
        padding: 10,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1C1C1E',
    },
    listContent: {
        padding: 20,
    },
    serviceItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#F2F2F7',
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    serviceInfo: {
        flex: 1,
    },
    serviceName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1C1C1E',
        marginBottom: 4,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#5856D6',
        marginRight: 8,
    },
    mrp: {
        fontSize: 13,
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
    bestSellerItem: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 15,
        overflow: 'hidden',
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#F2F2F7',
    },
    bestSellerImage: {
        width: 80,
        height: 80,
    },
    bestSellerInfo: {
        flex: 1,
        padding: 12,
        justifyContent: 'center',
    },
    bestSellerName: {
        fontSize: 15,
        fontWeight: '700',
        color: '#1C1C1E',
        marginBottom: 6,
    },
    bestSellerFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    ratingTextSmall: {
        fontSize: 11,
        fontWeight: '600',
        color: '#FFD60A',
        marginLeft: 2,
    },
});

export default ServiceListScreen;
