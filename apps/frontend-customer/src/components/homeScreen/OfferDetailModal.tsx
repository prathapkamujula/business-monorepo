import React from 'react';
import { Modal, View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { X } from 'lucide-react-native';

const { height } = Dimensions.get('window');

interface OfferDetailModalProps {
    visible: boolean;
    onClose: () => void;
    offer: any;
}

const OfferDetailModal = ({ visible, onClose, offer }: OfferDetailModalProps) => {
    if (!offer) return null;

    const details = offer.details?.content;

    return (
        <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
            <View className="flex-1 justify-end bg-black/50">
                <View className="rounded-t-[30px] bg-white" style={{ height: height * 0.8 }}>
                    <View className="flex-row items-center justify-between border-b border-[#F2F2F7] p-6">
                        <View className="flex-1">
                            <Text className="text-2xl font-bold text-[#1C1C1E]">{offer.title}</Text>
                            <Text className="text-sm text-[#8E8E93]">{offer.subtitle}</Text>
                        </View>
                        <TouchableOpacity
                            onPress={onClose}
                            className="rounded-full bg-[#F2F2F7] p-2"
                        >
                            <X size={24} color="#1C1C1E" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView className="flex-1 p-6" showsVerticalScrollIndicator={false}>
                        <View
                            className="mb-6 flex-row items-center justify-between rounded-2xl p-4"
                            style={{ backgroundColor: offer.color + '10' }}
                        >
                            <View>
                                <Text className="mb-1 text-xs font-semibold uppercase tracking-wider text-[#8E8E93]">
                                    Coupon Code
                                </Text>
                                <Text className="text-xl font-bold" style={{ color: offer.color }}>
                                    {offer.code}
                                </Text>
                            </View>
                            <TouchableOpacity
                                className="rounded-xl px-4 py-2"
                                style={{ backgroundColor: offer.color }}
                            >
                                <Text className="font-bold text-white">Copy</Text>
                            </TouchableOpacity>
                        </View>

                        {details ? (
                            <>
                                {details.description && (
                                    <View className="mb-6">
                                        <Text className="mb-2 text-lg font-bold text-[#1C1C1E]">
                                            Description
                                        </Text>
                                        <Text className="leading-6 text-[#3A3A3C]">
                                            {details.description}
                                        </Text>
                                    </View>
                                )}

                                {details.terms && details.terms.length > 0 && (
                                    <View className="mb-6">
                                        <Text className="mb-2 text-lg font-bold text-[#1C1C1E]">
                                            Terms & Conditions
                                        </Text>
                                        {details.terms.map((term: string, index: number) => (
                                            <View key={index} className="mb-2 flex-row">
                                                <Text className="mr-2 text-[#3A3A3C]">•</Text>
                                                <Text className="flex-1 leading-5 text-[#3A3A3C]">
                                                    {term}
                                                </Text>
                                            </View>
                                        ))}
                                    </View>
                                )}

                                {details.faqs && details.faqs.length > 0 && (
                                    <View className="mb-10">
                                        <Text className="mb-3 text-lg font-bold text-[#1C1C1E]">
                                            FAQs
                                        </Text>
                                        {details.faqs.map((faq: any, index: number) => (
                                            <View
                                                key={index}
                                                className="mb-4 rounded-xl bg-[#F8F8FA] p-4"
                                            >
                                                <Text className="mb-1 text-sm font-bold text-[#1C1C1E]">
                                                    {faq.question}
                                                </Text>
                                                <Text className="text-sm text-[#3A3A3C]">
                                                    {faq.answer}
                                                </Text>
                                            </View>
                                        ))}
                                    </View>
                                )}
                            </>
                        ) : (
                            <View className="items-center justify-center py-10">
                                <Text className="text-[#8E8E93]">
                                    No details available for this offer.
                                </Text>
                            </View>
                        )}
                    </ScrollView>

                    <View className="border-t border-[#F2F2F7] p-6">
                        <TouchableOpacity
                            onPress={onClose}
                            className="items-center rounded-2xl bg-[#5856D6] py-4"
                        >
                            <Text className="text-lg font-bold text-white">Got it</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default OfferDetailModal;
