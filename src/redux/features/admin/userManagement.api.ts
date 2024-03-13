import { IAdmin, IFilter, TResponseRedux } from "../../../types";
import { TFaculty } from "../../../types/faculty.type";
import { IStudent } from "../../../types/student.type";
import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    changeUserStatus: build.mutation({
      query: (payload) => {
        return {
          url: `/users/change-status/${payload.id}`,
          method: "PATCH",
          body: payload.data,
        };
      },
    }),
    getStudents: build.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((el: IFilter) => {
            params.append(el.name, el.value);
          });
        }

        return {
          url: "/students",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<IStudent[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["students"],
    }),
    addStudent: build.mutation({
      query: (payload) => {
        return {
          url: "/users/create-student",
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["students"],
    }),
    getSingleStudent: build.query({
      query: (studentId) => {
        return {
          url: `/students/${studentId}`,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<IStudent>) => {
        console.log(response);
        return {
          data: response.data,
        };
      },
      providesTags: ["singleStudent"],
    }),
    updateSingleStudent: build.mutation({
      query: (payload) => {
        return {
          url: `/students/${payload.id}`,
          method: "PATCH",
          body: {
            student: payload.data,
          },
        };
      },
      invalidatesTags: ["students", "singleStudent"],
    }),
    deleteSingleStudent: build.mutation({
      query: (id) => {
        return {
          url: `/students/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["students"],
    }),

    //   ** Admin Query & Mutation **

    addAdmin: build.mutation({
      query: (payload) => {
        return {
          url: "/users/create-admin",
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["admins"],
    }),

    getAdmins: build.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((el: IFilter) => {
            params.append(el.name, el.value);
          });
        }

        return {
          url: "/admins",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<IAdmin[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["admins"],
    }),
    getSingleAdmin: build.query({
      query: (adminId) => {
        return {
          url: `/admins/${adminId}`,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<IAdmin>) => {
        console.log(response);
        return {
          data: response.data,
        };
      },
      providesTags: ["singleAdmin"],
    }),
    updateSingleAdmin: build.mutation({
      query: (payload) => {
        return {
          url: `/admins/${payload.id}`,
          method: "PATCH",
          body: {
            admin: payload.data,
          },
        };
      },
      invalidatesTags: ["admins", "singleAdmin"],
    }),
    deleteSingleAdmin: build.mutation({
      query: (id) => {
        return {
          url: `/admins/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["admins"],
    }),

    // * Faculty Query && Mutation ***

    addFaculty: build.mutation({
      query: (payload) => {
        return {
          url: "/users/create-faculty",
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["faculties"],
    }),

    getFaculties: build.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((el: IFilter) => {
            params.append(el.name, el.value);
          });
        }

        return {
          url: "/faculties",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TFaculty[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["faculties"],
    }),
    getSingleFaculty: build.query({
      query: (adminId) => {
        return {
          url: `/faculties/${adminId}`,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TFaculty>) => {
        console.log(response);
        return {
          data: response.data,
        };
      },
      providesTags: ["singleFaculty"],
    }),
    updateSingleFaculty: build.mutation({
      query: (payload) => {
        return {
          url: `/faculties/${payload.id}`,
          method: "PATCH",
          body: {
            faculty: payload.data,
          },
        };
      },
      invalidatesTags: ["faculties", "singleFaculty"],
    }),
    deleteSingleFaculty: build.mutation({
      query: (id) => {
        return {
          url: `/faculties/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["faculties"],
    }),
  }),
});

export const {
  useAddStudentMutation,
  useGetStudentsQuery,
  useGetSingleStudentQuery,
  useUpdateSingleStudentMutation,
  useChangeUserStatusMutation,
  useDeleteSingleStudentMutation,

  //  ** Admin Hooks  **
  useAddAdminMutation,
  useGetAdminsQuery,
  useGetSingleFacultyQuery,
  useDeleteSingleAdminMutation,
  useUpdateSingleAdminMutation,

  //  ** Faculty Hooks **
  useAddFacultyMutation,
  useGetSingleAdminQuery,
  useGetFacultiesQuery,
  useUpdateSingleFacultyMutation,
  useDeleteSingleFacultyMutation,
} = userManagementApi;
