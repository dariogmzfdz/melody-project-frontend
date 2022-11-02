import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const melodyApi = createApi({
  reducerPath: "melodyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://melodystream.herokuapp.com",
    // baseUrl: "https://melodystream.herokuapp.com",
    prepareHeaders: (headers) => {
      headers.set(
        "auth_token",
        localStorage.getItem("userToken") || "no token found"
      );

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllSongs: builder.query({ query: () => "/song/all-songs" }),
    getPlaylist: builder.query({ query: () => "/playlist/user/playlist" }),
    getPlaylistSongs: builder.query({
      query: (playlist) => `/playlist/${playlist}`,
    }),
    getLikedSongs: builder.query({ query: () => "/song/like" }),
    getSong: builder.query({ query: (id) => `/song/${id}` }),
    getUserSongs: builder.query({ query: () => "/song/all-user-songs" }),
  }),
});

export const {
  useGetAllSongsQuery,
  useGetPlaylistQuery,
  useGetLikedSongsQuery,
  useGetSongQuery,
  useGetUserSongsQuery, 
} = melodyApi;
