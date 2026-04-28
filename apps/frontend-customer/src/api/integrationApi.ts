import axiosInstance from './axiosInstance';

export const integrationApi = {
  resolveCoordinates: async (latitude: number, longitude: number) => {
    const response = await axiosInstance.post('/integration/resolve-coordinates', {
      latitude,
      longitude,
    });
    return response.data;
  },
  getCurrentAddress: async () => {
    const response = await axiosInstance.get('/integration/current-address');
    return response.data;
  },
};
