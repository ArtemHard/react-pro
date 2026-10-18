import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { AuthResponse, AuthUser, LoginRequest } from './types';

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
  tagTypes: ['Tasks'],
  endpoints: () => ({}),
});

export const ACCESS_TOKEN_KEY = 'accessToken';
export const AUTH_API_URL =
  import.meta.env.VITE_API_URL ?? 'https://api.v2.react-learning.ru';

function withBearer(token: string) {
  return token.startsWith('Bearer ') ? token : `Bearer ${token}`;
}

export const baseApi2 = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: AUTH_API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(ACCESS_TOKEN_KEY);
      if (token) {
        headers.set('Authorization', withBearer(token));
      }
      return headers;
    },
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'GET',
      }),
    }),
    getMe: builder.query<AuthUser, void>({
      query: () => '/users/me',
      providesTags: ['User'],
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useLazyGetMeQuery } = baseApi2;
