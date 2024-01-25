import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IPost } from "../../entities/post-expanded/model/types";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com/",
  }),
  endpoints: (builder) => ({
    getPosts: builder.query<IPost[], { page: number; limit: number }>({
      query: ({ page, limit }) => `posts?_page=${page}&_limit=${limit}`,
    }),
    getPostOne: builder.query<IPost, number>({
      query: (id) => `posts/${id}`,
    }),
  }),
});

export const { useLazyGetPostsQuery, useGetPostOneQuery } = postApi;
