// ** Create Academic Management Api:

import {
  IAcademicFaculty,
  IFilter,
  TAcademicDepartment,
  TResponseRedux,
} from "../../../types";
import { IAacademicSemester } from "../../../types/academicSemester.type";
import { baseApi } from "../../api/baseApi";

const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAcademicSemester: build.query({
      query: (args) => {
     
        const params = new URLSearchParams();
        if (args) {
          args.forEach((param: IFilter) =>
            params.append(param.name, param.value)
          );
        }

        
        return {
          url: "/academic-semester",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<IAacademicSemester[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    addAcademicSemester: build.mutation({
      query: (payload) => {
        return {
          url: "/academic-semester/create-academic-semester",
          method: "POST",
          body: payload,
        };
      },
    }),
    getAllAcademicFaculty: build.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((el: IFilter) => {
            params.append(el.name, el.value);
          });
        }
        return {
          url: "/academic-faculties",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<IAcademicFaculty[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    addAcademicFaculty: build.mutation({
      query: (payload) => {
        return {
          url: "/academic-faculties/create-academic-faculty",
          method: "POST",
          body: payload,
        };
      },
    }),

    getAllAcademicDepartment: build.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: IFilter) => {
            params.append(item.name, item.value);
          });
        }
        return {
          url: "/academic-departments",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TAcademicDepartment[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    addAcademicDepartment: build.mutation({
      query: (payload) => {
        return {
          url: "/academic-departments/create-academic-department",
          method: "POST",
          body: payload,
        };
      },
    }),
  }),
});

export const {
  useGetAcademicSemesterQuery,
  useAddAcademicSemesterMutation,
  useAddAcademicFacultyMutation,
  useGetAllAcademicFacultyQuery,
  useAddAcademicDepartmentMutation,
  useGetAllAcademicDepartmentQuery,
} = academicManagementApi;
