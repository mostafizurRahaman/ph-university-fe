import {
  IFilter,
  IOfferedCourse,
  TEnrolledCourses,
  TResponseRedux,
} from "../../../types";
import { baseApi } from "../../api/baseApi";

const studentManagementApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getMyAllOfferedCourse: build.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((el: IFilter) => {
            params.append(el.name, el.value);
          });
        }

        return {
          url: "/offered-courses/my-offered-courses",
          method: "GET",
          params,
        };
      },
      providesTags: ["offeredCourse"],

      transformResponse: (response: TResponseRedux<IOfferedCourse[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    enrollCourse: build.mutation({
      query: (payload) => {
        return {
          url: "/enrolled-course/create-enrolled-course",
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["offeredCourse"],
    }),
    getAllEnrolledCourse: build.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((el: IFilter) => {
            params.append(el.name, el.value);
          });
        }

        return {
          url: "/enrolled-course/my-enrolled-course",
          method: "GET",
          params,
        };
      },
      transformResponse: (response: TResponseRedux<TEnrolledCourses[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
  }),
});

export const {
  useGetMyAllOfferedCourseQuery,
  useEnrollCourseMutation,
  useGetAllEnrolledCourseQuery,
} = studentManagementApi;
