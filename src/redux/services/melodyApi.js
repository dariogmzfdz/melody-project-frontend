import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const melodyApi = createApi({
  reducerPath: "melodyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://melodystream.herokuapp.com",
    /*     prepareHeaders: (headers) => {
      headers.set(
        "auth_token",
        "e4580cc1e1mshb00f739b2574fd3p149c43jsnf8f7e85cb721"
      );

      return headers;
    }, */
  }),
  endpoints: (builder) => ({
    getAllSongs: builder.query({ query: () => "/song/all-songs" }),
  }),
});

export const { useGetAllSongsQuery } = melodyApi;
