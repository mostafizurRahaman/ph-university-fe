/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BaseQueryApi,
  BaseQueryFn,
  DefinitionType,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logOut, setUser } from "../features/auth/authSlice";
import { toast } from "sonner";
import { IResponse } from "../../types";

// ** Separate the base query to setup the authorization headers:
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/v1",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
  },
});

// ** Create a custom baseQuery:
const customBaseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  // ** Promise resolve of baseQuery :  call the baseQuery and pass this three param
  let result;
  result = (await baseQuery(args, api, extraOptions)) as IResponse<any>;

  //  ** If The Request 404 then return  an toast:
  if (result.error?.status === 404) {
    toast.error(result?.error?.data.message);
  }
  if (result.error?.status === 403) {
    toast.error(result?.error?.data.message);
  }

  // ** check in error Status Code 401 ? :
  if (result.error?.status === 401) {
    //  ** call the fetch to regenerate the access Token with Refresh Token :
    const res = await fetch(`http://localhost:5000/api/v1/auth/refresh-token`, {
      method: "POST",
      credentials: "include", // ** to accept the cookies pass this :
    });

    const data = await res.json();

    // ** destructure the getState() and dispatch function api param:
    const { getState, dispatch } = api;

    // ** destructure the token from data:
    const token = data?.data?.accessToken;

    if (token) {
      // ** get the current User from state :
      const user = (getState() as RootState).auth?.user;

      if (token) {
        dispatch(setUser({ user, token }));
      }
      // ** call again base query, At first call the access token is not valid: NOw access token is valid:
      result = await baseQuery(args, api, extraOptions);
    } else {
      // ** if Refresh Token is expired : Kick out the user
      dispatch(logOut());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  tagTypes: [
    "students",
    "singleStudent",
    "admins",
    "singleAdmin",
    "singleFaculty",
    "faculties",
    "semesterRegistrations",
    "courses",
    "courseFaculties",
    'offeredCourse'
  ],
  baseQuery: customBaseQueryWithRefreshToken,
  endpoints: () => ({}),
});
