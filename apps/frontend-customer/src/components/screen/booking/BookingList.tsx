import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, RefreshControl, StyleSheet } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withDelay,
    withSpring,
    withRepeat,
    withSequence,
    FadeIn,
    FadeInDown,
    Easing,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { Calendar, Clock, Inbox } from 'lucide-react-native';
import axiosInstance from '../../../api/axiosInstance';
import BookingItem from './BookingItem';

interface BookingListProps {
    type: 'current' | 'past';
}

// ─── Skeleton Card ────────────────────────────────────────────────────────────
const SkeletonCard = ({ index }: { index: number }) => {
    const shimmer = useSharedValue(0);

    useEffect(() => {
        shimmer.value = withDelay(
            index * 120,
            withRepeat(
                withSequence(
                    withTiming(1, { duration: 900, easing: Easing.inOut(Easing.ease) }),
                    withTiming(0, { duration: 900, easing: Easing.inOut(Easing.ease) })
                ),
                -1,
                false
            )
        );
    }, []);

    const shimmerStyle = useAnimatedStyle(() => ({
        opacity: 0.4 + shimmer.value * 0.4,
    }));

    return (
        <Animated.View style={shimmerStyle} className="mb-3 overflow-hidden rounded-2xl shadow-sm">
            <LinearGradient
                colors={['#f0f0f5', '#e8e8f0', '#f0f0f5']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                className="p-4"
            >
                <View className="flex-row items-center gap-3">
                    <View className="h-11 w-11 rounded-full bg-[#E0E0EA]" />
                    <View className="flex-1 gap-2">
                        <View className="h-3 w-3/5 rounded-md bg-[#D8D8E8]" />
                        <View className="h-3 w-2/5 rounded-md bg-[#D8D8E8]" />
                    </View>
                    <View className="h-6 w-16 rounded-xl bg-[#D8D8E8]" />
                </View>
                <View className="mt-4 h-3 w-4/5 rounded-md bg-[#D8D8E8]" />
                <View className="mt-2 h-3 w-1/2 rounded-md bg-[#D8D8E8]" />
            </LinearGradient>
        </Animated.View>
    );
};

// ─── Empty State ──────────────────────────────────────────────────────────────
const EmptyState = ({ type }: { type: 'current' | 'past' }) => {
    const scale = useSharedValue(0.8);
    const opacity = useSharedValue(0);

    useEffect(() => {
        scale.value = withSpring(1, { damping: 12, stiffness: 100 });
        opacity.value = withTiming(1, { duration: 500 });
    }, []);

    const animStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
        opacity: opacity.value,
    }));

    const isCurrent = type === 'current';

    return (
        <Animated.View style={animStyle} className="flex-1 items-center justify-center gap-3 pt-20">
            <LinearGradient
                colors={isCurrent ? ['#EEF2FF', '#E0E7FF'] : ['#F5F5FA', '#EEEEF5']}
                className="mb-1 h-20 w-20 items-center justify-center rounded-full"
            >
                {isCurrent ? (
                    <Clock size={36} color="#5856D6" strokeWidth={1.5} />
                ) : (
                    <Inbox size={36} color="#9CA3AF" strokeWidth={1.5} />
                )}
            </LinearGradient>
            <Text className="text-[17px] font-bold tracking-tight text-[#1C1C2E]">
                {isCurrent ? 'No upcoming bookings' : 'No past bookings'}
            </Text>
            <Text className="px-8 text-center text-sm leading-5 text-gray-400">
                {isCurrent
                    ? 'Your active bookings will appear here'
                    : 'Your booking history will show up here'}
            </Text>
        </Animated.View>
    );
};

// ─── Animated Booking Row ─────────────────────────────────────────────────────
const AnimatedBookingItem = ({ item, index }: { item: any; index: number }) => (
    <Animated.View
        entering={FadeInDown.delay(index * 80)
            .springify()
            .damping(14)}
    >
        <BookingItem item={item} />
    </Animated.View>
);

// ─── Header Banner ────────────────────────────────────────────────────────────
const ListHeader = ({ type, count }: { type: 'current' | 'past'; count: number }) => {
    if (count === 0) return null;
    const isCurrent = type === 'current';
    return (
        <Animated.View
            entering={FadeIn.duration(400)}
            className="mb-3.5 overflow-hidden rounded-xl"
        >
            <LinearGradient
                colors={isCurrent ? ['#5856D6', '#7C7AE8'] : ['#6B7280', '#9CA3AF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                className="flex-row items-center gap-2 px-3.5 py-2.5"
            >
                <Calendar size={16} color="rgba(255,255,255,0.85)" strokeWidth={2} />
                <Text className="text-[13px] font-semibold tracking-wide text-white">
                    {count} {isCurrent ? 'upcoming' : 'past'} {count === 1 ? 'booking' : 'bookings'}
                </Text>
            </LinearGradient>
        </Animated.View>
    );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const BookingList = ({ type }: BookingListProps) => {
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchBookings = useCallback(async () => {
        try {
            const endpoint = type === 'current' ? '/bookings/current' : '/bookings/past';
            const response = await axiosInstance.get(endpoint);
            setBookings(response.data);
        } catch (error) {
            console.error(`Error fetching ${type} bookings:`, error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, [type]);

    useEffect(() => {
        fetchBookings();
    }, [fetchBookings]);

    const onRefresh = () => {
        setRefreshing(true);
        fetchBookings();
    };

    if (loading) {
        return (
            <View className="flex-1 bg-[#F8F8FC] p-4">
                {[0, 1, 2, 3].map((i) => (
                    <SkeletonCard key={i} index={i} />
                ))}
            </View>
        );
    }

    return (
        <FlatList
            className="flex-1 bg-[#F8F8FC]"
            data={bookings}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index }) => <AnimatedBookingItem item={item} index={index} />}
            contentContainerStyle={styles.contentContainer}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={['#5856D6']}
                    tintColor="#5856D6"
                />
            }
            ListHeaderComponent={<ListHeader type={type} count={bookings.length} />}
            ListEmptyComponent={<EmptyState type={type} />}
            showsVerticalScrollIndicator={false}
        />
    );
};

export default BookingList;

// Minimal StyleSheet — only for values NativeWind can't express
const styles = StyleSheet.create({
    contentContainer: {
        padding: 16,
        paddingBottom: 16,
        flexGrow: 1,
    },
});
