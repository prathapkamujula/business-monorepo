import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { MapPin, Navigation } from 'lucide-react-native';
import * as Location from 'expo-location';
import { integrationApi } from '../../api/integrationApi';

interface LocationSelectionModalProps {
  visible: boolean;
  onLocationResolved: (address: any) => void;
}

const LocationSelectionModal = ({ visible, onLocationResolved }: LocationSelectionModalProps) => {
  const [loading, setLoading] = useState(false);

  const handleGetCurrentLocation = async () => {
    setLoading(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Allow location access to select your current location.');
        setLoading(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      const address = await integrationApi.resolveCoordinates(latitude, longitude);
      onLocationResolved(address);
    } catch (error) {
      console.error('Error getting location:', error);
      Alert.alert('Error', 'Failed to resolve your location. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View className="flex-1 bg-black/50 justify-center items-center p-5">
        <View className="bg-white rounded-[20px] p-[30px] w-full items-center shadow-lg shadow-black">
          <View className="w-20 h-20 rounded-full bg-[#F2F2F7] justify-center items-center mb-5">
            <MapPin size={48} color="#5856D6" />
          </View>
          <Text className="text-[22px] font-bold text-black mb-[10px] text-center">Select Your Location</Text>
          <Text className="text-base text-[#666666] text-center mb-[30px] leading-[22px]">
            To provide the best services, we need to know your location.
          </Text>

          <TouchableOpacity
            className="bg-[#5856D6] flex-row py-[15px] px-[30px] rounded-xl items-center justify-center w-full"
            onPress={handleGetCurrentLocation}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <>
                <Navigation size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
                <Text className="color-white text-base font-semibold">Use Current Location</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default LocationSelectionModal;
