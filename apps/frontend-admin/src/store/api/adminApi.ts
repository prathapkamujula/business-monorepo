import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../index';

export const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token || localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Profile', 'Content', 'Offers', 'Services', 'Dashboard'],
  endpoints: (builder) => ({
    // Dashboard
    getDashboardStats: builder.query<any[], void>({
      query: () => '/admin/dashboard/stats',
      providesTags: ['Dashboard'],
    }),
    // Auth
    login: builder.mutation({
      query: (credentials) => ({
        url: '/admin/login',
        method: 'POST',
        body: credentials,
      }),
    }),

    // Profile
    getProfile: builder.query({
      query: () => '/admin/profile',
      providesTags: ['Profile'],
    }),
    changePassword: builder.mutation({
      query: (passwords) => ({
        url: '/admin/change-password',
        method: 'POST',
        body: passwords,
      }),
    }),

    // Content
    getAllContent: builder.query({
      query: () => '/admin/content',
      providesTags: ['Content'],
    }),
    updateContent: builder.mutation({
      query: ({ id, content }) => ({
        url: `/admin/content/${id}`,
        method: 'PUT',
        body: { content },
      }),
      invalidatesTags: ['Content'],
    }),
    saveContent: builder.mutation({
      query: ({ id, content }) => ({
        url: '/admin/content/save',
        method: 'POST',
        body: { id, content },
      }),
      invalidatesTags: ['Content'],
    }),

    // Offers
    getAllOffers: builder.query({
      query: () => '/admin/offers',
      providesTags: ['Offers'],
    }),
    createOffer: builder.mutation({
      query: (newOffer) => ({
        url: '/admin/offers',
        method: 'POST',
        body: newOffer,
      }),
      invalidatesTags: ['Offers'],
    }),
    updateOffer: builder.mutation({
      query: ({ id, ...update }) => ({
        url: `/admin/offers/${id}`,
        method: 'PUT',
        body: update,
      }),
      invalidatesTags: ['Offers'],
    }),

    // Services
    getAllServices: builder.query({
      query: () => '/admin/services',
      providesTags: ['Services'],
    }),
    updateService: builder.mutation({
      query: ({ id, ...update }) => ({
        url: `/admin/services/${id}`,
        method: 'PUT',
        body: update,
      }),
      invalidatesTags: ['Services'],
    }),
  }),
});

export const {
  useGetDashboardStatsQuery,
  useLoginMutation,
  useGetProfileQuery,
  useChangePasswordMutation,
  useGetAllContentQuery,
  useUpdateContentMutation,
  useSaveContentMutation,
  useGetAllOffersQuery,
  useCreateOfferMutation,
  useUpdateOfferMutation,
  useGetAllServicesQuery,
  useUpdateServiceMutation,
} = adminApi;
