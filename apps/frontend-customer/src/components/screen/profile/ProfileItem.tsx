import React, { memo } from 'react';
import { View, Text, TextInput, KeyboardTypeOptions } from 'react-native';

interface ProfileItemProps {
    icon: any;
    label: string;
    value: string;
    isEditing: boolean;
    editable?: boolean;
    onChangeText?: (text: string) => void;
    keyboardType?: KeyboardTypeOptions;
    maxLength?: number;
}

const ProfileItem = memo(
    ({
        icon: Icon,
        label,
        value,
        isEditing,
        editable = false,
        onChangeText,
        keyboardType = 'default',
        maxLength,
    }: ProfileItemProps) => (
        <View className="flex-row items-center border-b border-[#f0f0f0] py-[15px]">
            <View style={{ width: 28, alignItems: 'center', marginRight: 12 }}>
                <Icon size={24} color="#666" />
            </View>
            <View className="flex-1">
                <Text className="mb-0.5 text-sm font-medium text-[#888]">{label}</Text>
                {isEditing && editable ? (
                    <TextInput
                        key={`${label}-input`}
                        className="border-b border-[#5856D6] py-1 text-base text-[#333]"
                        value={value}
                        onChangeText={onChangeText}
                        placeholder={`Enter ${label}`}
                        keyboardType={keyboardType}
                        maxLength={maxLength}
                    />
                ) : (
                    <Text
                        key={`${label}-text`}
                        className={`text-base text-[#333] ${!value ? 'italic text-[#ccc]' : ''}`}
                    >
                        {value || `No ${label} provided`}
                    </Text>
                )}
            </View>
        </View>
    )
);

export default ProfileItem;
