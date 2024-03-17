import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),

    //  ** Change Password **
    changePassword: build.mutation({
      query: (payload) => {
        return {
          url: "/auth/change-password",
          method: "POST",
          body: payload,
        };
      },
    }),
  }),
});

export const { useLoginMutation, useChangePasswordMutation } = authApi;
