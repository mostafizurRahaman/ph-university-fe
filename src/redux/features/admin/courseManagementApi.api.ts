import {
  ICourse,
  ICourseFaculties,
  IFilter,
  IOfferedCourse,
  TResponseRedux,
} from "../../../types";
import { ISemesterRegistration } from "../../../types/semesterRegistration";
import { baseApi } from "../../api/baseApi";

const courseManagementApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllSemesterRegistration: build.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: IFilter) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "/semester-registration",
        };
      },
      providesTags: ["semesterRegistrations"],
      transformResponse: (
        response: TResponseRedux<ISemesterRegistration[]>
      ) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    addSemesterRegistration: build.mutation({
      query: (payload) => {
        return {
          url: "/semester-registration/create-semester-registration",
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["semesterRegistrations"],
    }),

    updateSemesterRegistration: build.mutation({
      query: (payload) => {
        return {
          url: `/semester-registration/${payload.id}`,
          method: "PATCH",
          body: payload.data,
        };
      },
      invalidatesTags: ["semesterRegistrations"],
    }),

    // ** Course Routes **
    getCourses: build.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((el: IFilter) => {
            params.append(el.name, el.value);
          });
        }

        return {
          url: "/courses",
          method: "GET",
          params,
        };
      },
      transformResponse: (response: TResponseRedux<ICourse[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["courses"],
    }),
    addCourse: build.mutation({
      query: (payload) => {
        return {
          url: "/courses/create-course",
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["courses"],
    }),

    //  ** Faculties Assign And Remove **
    getCourseFaculties: build.query({
      query: (id) => {
        return {
          url: `/courses/${id}/get-faculties`,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<ICourseFaculties>) => {
        return {
          data: response.data,
        };
      },
      providesTags: ["courseFaculties"],
    }),
    assignCourseFaculties: build.mutation({
      query: (payload) => {
        return {
          url: `/courses/${payload.id}/assign-faculties`,
          method: "PUT",
          body: payload.data,
        };
      },
      invalidatesTags: ["courseFaculties"],
    }),
    removeCourseFaculties: build.mutation({
      query: (payload) => {
        return {
          url: `/courses/${payload.id}/remove-faculties`,
          method: "PUT",
          body: payload.data,
        };
      },
      invalidatesTags: ["courseFaculties"],
    }),

    //  ** Offered Course :
    addOfferedCourse: build.mutation({
      query: (payload) => {
        return {
          url: "/offered-courses/create-offered-course",
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["offeredCourse"],
    }),

    getAllOfferedCourse: build.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((el: IFilter) => {
            params.append(el.name, el.value);
          });
        }
        return {
          url: "/offered-courses",
          method: "GET",
          params,
        };
      },

      transformResponse: (response: TResponseRedux<IOfferedCourse[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      
    }),

   
  }),
});

export const {
  useAddSemesterRegistrationMutation,
  useGetAllSemesterRegistrationQuery,
  useUpdateSemesterRegistrationMutation,

  //  Course hooks ***
  useAddCourseMutation,
  useGetCoursesQuery,

  //  ** Course Faculties Mutation  Hooks**
  useAssignCourseFacultiesMutation,
  useRemoveCourseFacultiesMutation,
  useGetCourseFacultiesQuery,

  //  ** Offered Course Mutation and Query Hooks **
  useAddOfferedCourseMutation,
  useGetAllOfferedCourseQuery,

  
} = courseManagementApi;
