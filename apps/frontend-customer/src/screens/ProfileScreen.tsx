import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    TextInput,
    ScrollView,
    ActivityIndicator,
    SafeAreaView,
} from 'react-native';
import customAlert from '../utils/alert';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import {
    LogOut,
    ChevronRight,
    User,
    Phone,
    Mail,
    Shield,
    HelpCircle,
    Info,
    Trash2,
} from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import axiosInstance from '../api/axiosInstance';

const ProfileScreen = () => {
    const navigation = useNavigation<any>();
    const { user: authUser } = useSelector((state: RootState) => state.auth);
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        setFetching(true);
        try {
            const response = await axiosInstance.get('/customers/profile');
            const customer = response.data;
            setName(customer.name || authUser?.displayName || '');
            setPhoneNumber(customer.phoneNumber || '');
            setEmail(customer.email || authUser?.email || '');
            setPhotoUrl(customer.photoUrl || authUser?.photoURL || '');
        } catch (error) {
            console.error('Error fetching profile:', error);
            // Fallback to authUser if DB fetch fails
            setName(authUser?.displayName || '');
            setEmail(authUser?.email || '');
            setPhotoUrl(authUser?.photoURL || '');
        } finally {
            setFetching(false);
        }
    };

    const handleUpdateProfile = async () => {
        setLoading(true);
        try {
            await axiosInstance.put('/customers/profile', {
                name,
                phoneNumber,
            });
            customAlert('Profile Updated', 'Your profile has been updated successfully.');
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating profile:', error);
            customAlert('Update Failed', 'There was an error updating your profile.');
        } finally {
            setLoading(false);
        }
    };

    const handleSignOut = () => {
        console.log('Sign out clicked');
        customAlert('Sign Out', 'Are you sure you want to sign out?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Sign Out', style: 'destructive', onPress: () => signOut(auth) },
        ]);
    };

    const ProfileItem = ({ icon: Icon, label, value, editable = false, onChangeText }: any) => (
        <View className="py-[15px] border-b border-[#f0f0f0]">
            <View className="flex-row items-center mb-1">
                <Icon size={20} color="#666" className="mr-2.5" />
                <Text className="text-sm text-[#888] font-medium">{label}</Text>
            </View>
            {isEditing && editable ? (
                <TextInput
                    className="text-base text-[#333] pl-[30px] py-1 border-b border-[#5856D6]"
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={`Enter ${label}`}
                />
            ) : (
                <Text className={`text-base text-[#333] pl-[30px] ${!value ? 'text-[#ccc] italic' : ''}`}>
                    {value || `No ${label} provided`}
                </Text>
            )}
        </View>
    );

    const LinkItem = ({ icon: Icon, label, onPress, color = '#333' }: any) => (
        <TouchableOpacity className="flex-row items-center justify-between py-[15px] border-b border-[#f0f0f0]" onPress={onPress}>
            <View className="flex-row items-center">
                <Icon size={20} color={color} className="mr-2.5" />
                <Text className="text-base font-medium" style={{ color }}>{label}</Text>
            </View>
            <ChevronRight size={20} color="#ccc" />
        </TouchableOpacity>
    );

    if (fetching) {
        return (
            <View className="flex-1 bg-[#f8f9fa] justify-center items-center">
                <ActivityIndicator size="large" color="#5856D6" />
            </View>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-[#f8f9fa]">
            <ScrollView showsVerticalScrollIndicator={false}>
                <View className="items-center p-[30px] bg-white border-b border-[#eee]">
                    {photoUrl ? (
                        <Image source={{ uri: photoUrl }} className="w-[100px] h-[100px] rounded-full mb-[15px] bg-[#eee]" />
                    ) : (
                        <View className="w-[100px] h-[100px] rounded-full mb-[15px] bg-[#F2F2F7] justify-center items-center">
                            <User size={50} color="#8E8E93" />
                        </View>
                    )}
                    <Text className="text-[22px] font-bold text-[#333] mb-2.5">{name || 'User'}</Text>
                    <TouchableOpacity
                        className="px-5 py-2 rounded-full bg-[#F0F0FF] border border-[#5856D6]"
                        onPress={() => (isEditing ? handleUpdateProfile() : setIsEditing(true))}
                    >
                        <Text className="text-[#5856D6] font-semibold">
                            {isEditing ? 'Save Changes' : 'Edit Profile'}
                        </Text>
                    </TouchableOpacity>
                </View>

                <View className="bg-white mt-5 px-5 border-y border-[#eee]">
                    <ProfileItem
                        icon={User}
                        label="Name"
                        value={name}
                        editable={true}
                        onChangeText={setName}
                    />
                    <ProfileItem
                        icon={Phone}
                        label="Phone Number"
                        value={phoneNumber}
                        editable={true}
                        onChangeText={setPhoneNumber}
                    />
                    <ProfileItem icon={Mail} label="Email" value={email} editable={false} />
                    <Text className="text-xs text-[#999] text-right mt-1 mb-2.5">Email cannot be updated</Text>
                </View>

                <View className="bg-white mt-5 px-5 border-y border-[#eee]">
                    <LinkItem
                        icon={Shield}
                        label="Privacy Policy"
                        onPress={() => navigation.navigate('WebView', { title: 'Privacy Policy' })}
                    />
                    <LinkItem
                        icon={HelpCircle}
                        label="Help & Support"
                        onPress={() => navigation.navigate('WebView', { title: 'Help & Support' })}
                    />
                    <LinkItem
                        icon={Info}
                        label="About Us"
                        onPress={() => navigation.navigate('WebView', { title: 'About Us' })}
                    />
                    <LinkItem
                        icon={Trash2}
                        label="Request Account Deletion"
                        onPress={() => {}}
                        color="#FF3B30"
                    />
                </View>

                <TouchableOpacity className="flex-row bg-[#F2F2F7] mx-5 mt-[30px] p-[15px] rounded-[12px] justify-center items-center" onPress={handleSignOut}>
                    <LogOut size={20} color="#FF3B30" className="mr-2.5" />
                    <Text className="text-[#FF3B30] font-bold text-base">Logout</Text>
                </TouchableOpacity>

                <View style={{ height: 40 }} />
            </ScrollView>
        </SafeAreaView>
    );
};

export default ProfileScreen;
