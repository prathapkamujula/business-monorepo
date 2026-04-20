import axiosInstance from './axiosInstance';

export const appApi = {
    getSystemParameters: async () => {
        const response = await axiosInstance.get('/system-parameters');
        return response.data;
    },
};
