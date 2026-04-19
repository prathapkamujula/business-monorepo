import React from 'react';
import { ScrollView, Text, View, Platform, TouchableOpacity, Alert } from 'react-native';

const Tag = ({ label }: { label: string }) => (
    <View className="rounded-full bg-[#d8f3e8] px-3 py-1">
        <Text className="text-[13px] font-medium text-[#2d6a4f]">{label}</Text>
    </View>
);

const CheckItem = ({ text }: { text: string }) => (
    <View className="mb-1.5 flex-row items-start gap-2.5">
        <Text className="mt-0.5 text-sm font-bold text-[#2d6a4f]">✓</Text>
        <Text className="flex-1 text-[15px] leading-6 text-[#6b6b67]">{text}</Text>
    </View>
);

const BulletList = ({ items }: { items: string[] }) => (
    <View className="mt-2 gap-1.5">
        {items.map((item) => (
            <View key={item} className="mb-1.5 flex-row items-start gap-2.5">
                <Text className="mt-0.5 text-lg font-bold leading-5 text-[#6b6b67]">·</Text>
                <Text className="flex-1 text-sm leading-6 text-[#6b6b67]">{item}</Text>
            </View>
        ))}
    </View>
);

const PrivacyItem = ({
    num,
    title,
    children,
}: {
    num: string | number;
    title: string;
    children: React.ReactNode;
}) => (
    <View className="rounded-[12px] border border-[#e8e8e4] bg-white p-5">
        <View className="mb-2 flex-row items-center gap-2.5">
            <View className="rounded-full bg-[#d8f3e8] px-2 py-[3px]">
                <Text className="text-[11px] font-medium text-[#2d6a4f]">
                    {typeof num === 'number' ? num.toString().padStart(2, '0') : num}
                </Text>
            </View>
            <Text className="flex-1 text-[17px] font-normal text-[#1a1a18]">{title}</Text>
        </View>
        {children}
    </View>
);

const Container = ({ children }: { children: React.ReactNode }) => (
    <ScrollView
        className="flex-1 bg-[#fafaf8]"
        contentContainerStyle={{
            padding: 24,
            paddingBottom: 64,
            maxWidth: 640,
            alignSelf: 'center',
            width: '100%',
            flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
    >
        <View
            className={
                Platform.OS === 'web'
                    ? 'animate-in fade-in slide-in-from-bottom-3 duration-400'
                    : ''
            }
        >
            {children}
        </View>
    </ScrollView>
);

export const WebViewContentAboutUs = ({ data }: { data: any }) => (
    <Container>
        <View className="mb-9 border-b border-[#e8e8e4] pb-7">
            <Text className="mb-3 text-[11px] font-medium uppercase tracking-[1.5px] text-[#2d6a4f]">
                {data.hero.eyebrow}
            </Text>
            <Text className="mb-3.5 text-[32px] font-normal leading-[38px] text-[#1a1a18]">
                {data.hero.title}
            </Text>
            <Text className="text-[15px] leading-[26px] text-[#6b6b67]">{data.hero.sub}</Text>
            <View className="mt-3.5 flex-row flex-wrap gap-2">
                {data.hero.tags.map((t: string) => (
                    <Tag key={t} label={t} />
                ))}
            </View>
        </View>

        {data.sections.map((s: any, idx: number) => (
            <View key={idx} className={`mb-8 ${idx === data.sections.length - 1 ? 'mb-0' : ''}`}>
                <Text className="mb-2.5 text-xl font-normal text-[#1a1a18]">{s.title}</Text>
                {s.content && (
                    <Text className="text-[15px] leading-[26px] text-[#6b6b67]">{s.content}</Text>
                )}
                {s.items && s.items.map((item: string) => <CheckItem key={item} text={item} />)}
            </View>
        ))}
    </Container>
);

export const WebViewContentPrivacyPolicy = ({ data }: { data: any }) => (
    <Container>
        <View className="mb-9 border-b border-[#e8e8e4] pb-7">
            <Text className="mb-3 text-[11px] font-medium uppercase tracking-[1.5px] text-[#2d6a4f]">
                {data.hero.eyebrow}
            </Text>
            <Text className="text-[15px] leading-[26px] text-[#6b6b67]">{data.hero.sub}</Text>
        </View>

        <View className="mb-5 self-start rounded-full bg-[#e8e8e4] px-2.5 py-1">
            <Text className="text-xs text-[#6b6b67]">{data.hero.badge}</Text>
        </View>

        <View className="gap-4">
            {data.items.map((item: any, idx: number) => (
                <PrivacyItem key={idx} num={item.num || idx + 1} title={item.title}>
                    {item.content && (
                        <Text className="text-sm leading-[22px] text-[#6b6b67]">
                            {item.content}
                        </Text>
                    )}
                    {item.highlight && (
                        <Text className="mt-2 text-sm font-medium leading-[22px] text-[#1a1a18]">
                            {item.highlight}
                        </Text>
                    )}
                    {item.bullets && <BulletList items={item.bullets} />}
                    {item.card && (
                        <View className="mt-3.5 flex-row items-center gap-3.5 rounded-[12px] border border-[#e8e8e4] bg-white p-4">
                            <Text style={{ fontSize: 22 }}>{item.card.icon}</Text>
                            <View>
                                <Text className="mb-0.5 text-xs text-[#6b6b67]">
                                    {item.card.label}
                                </Text>
                                <Text className="text-sm font-medium text-[#2d6a4f]">
                                    {item.card.value}
                                </Text>
                            </View>
                        </View>
                    )}
                </PrivacyItem>
            ))}
        </View>
    </Container>
);

export const WebViewContentService = ({ data }: { data: any }) => {
    const handleBookNow = () => {
        Alert.alert('Booking', `Proceeding to book ${data.name}`);
    };

    const details = data.details?.content || {};

    return (
        <View className="flex-1 bg-white">
            <Container>
                <View className="mb-6">
                    <Text className="text-[32px] font-bold text-[#1a1a18]">{data.name}</Text>
                    <View className="mt-2 flex-row items-center">
                        <Text className="text-2xl font-bold text-[#5856D6]">₹{data.price}</Text>
                        <Text className="ml-3 text-lg text-[#8E8E93] line-through">₹{data.mrp}</Text>
                    </View>
                </View>

                {details.description && (
                    <View className="mb-8">
                        <Text className="mb-2 text-xl font-bold text-[#1a1a18]">Description</Text>
                        <Text className="text-[15px] leading-[26px] text-[#6b6b67]">
                            {details.description}
                        </Text>
                    </View>
                )}

                {details.benefits && details.benefits.length > 0 && (
                    <View className="mb-8">
                        <Text className="mb-2 text-xl font-bold text-[#1a1a18]">Benefits</Text>
                        {details.benefits.map((benefit: string, idx: number) => (
                            <CheckItem key={idx} text={benefit} />
                        ))}
                    </View>
                )}

                {details.howItWorks && details.howItWorks.length > 0 && (
                    <View className="mb-8">
                        <Text className="mb-2 text-xl font-bold text-[#1a1a18]">How it Works</Text>
                        {details.howItWorks.map((step: string, idx: number) => (
                            <PrivacyItem key={idx} num={idx + 1} title={step}>
                                <View />
                            </PrivacyItem>
                        ))}
                    </View>
                )}

                {details.faqs && details.faqs.length > 0 && (
                    <View className="mb-8">
                        <Text className="mb-2 text-xl font-bold text-[#1a1a18]">FAQs</Text>
                        {details.faqs.map((faq: any, idx: number) => (
                            <View key={idx} className="mb-4">
                                <Text className="text-base font-semibold text-[#1a1a18]">
                                    Q: {faq.question}
                                </Text>
                                <Text className="mt-1 text-[15px] text-[#6b6b67]">
                                    A: {faq.answer}
                                </Text>
                            </View>
                        ))}
                    </View>
                )}
            </Container>

            <View className="border-t border-[#e8e8e4] bg-white p-5 pb-8">
                <TouchableOpacity
                    onPress={handleBookNow}
                    className="h-14 items-center justify-center rounded-2xl bg-[#5856D6]"
                >
                    <Text className="text-lg font-bold text-white">Book this service</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
