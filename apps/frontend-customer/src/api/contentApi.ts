import axiosInstance from './axiosInstance';

export const contentApi = {
    getPageContent: async (pageName: string) => {
        const response = await axiosInstance.get(`/content/${pageName}`);
        return response.data;
    },
};
