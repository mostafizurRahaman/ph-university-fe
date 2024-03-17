import { IFilter, TEnrolledCourses, TResponseRedux } from "../../../types";
import { baseApi } from "../../api/baseApi";

const facultyManagementApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getFacultyEnrolledCourse: build.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((el: IFilter) => {
            params.append(el.name, el.value);
          });
        }

        return {
          url: "/enrolled-course/faculty-enrolled-course",
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
    updateCourseMarks: build.mutation({
      query: (payload) => {
        return {
          url: "/enrolled-course/update-enrolled-course-marks",
          method: "PUT",
          body: payload,
        };
      },
    }),
  }),
});

export const {
  useGetFacultyEnrolledCourseQuery,
  useUpdateCourseMarksMutation,
} = facultyManagementApi;
