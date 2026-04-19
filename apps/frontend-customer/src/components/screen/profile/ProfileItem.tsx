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
        <View className="border-b border-[#f0f0f0] py-[15px]">
            <View className="mb-1 flex-row items-center">
                <Icon size={20} color="#666" className="mr-2.5" />
                <Text className="text-sm font-medium text-[#888]">{label}</Text>
            </View>
            {isEditing && editable ? (
                <TextInput
                    key={`${label}-input`}
                    className="border-b border-[#5856D6] py-1 pl-[30px] text-base text-[#333]"
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={`Enter ${label}`}
                    keyboardType={keyboardType}
                    maxLength={maxLength}
                />
            ) : (
                <Text
                    key={`${label}-text`}
                    className={`pl-[30px] text-base text-[#333] ${!value ? 'italic text-[#ccc]' : ''}`}
                >
                    {value || `No ${label} provided`}
                </Text>
            )}
        </View>
    )
);

export default ProfileItem;
