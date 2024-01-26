import { baseApi } from "../../api/baseApi";

export const academicSemesterApi = baseApi.injectEndpoints({
   endpoints: (build) => ({
      getAcademicSemester: build.query({
         query: () => ({
            url: "/academic-semester",
            method: "GET",
         }),
      }),
      postAcademicSemester: build.mutation({
         query: (payload) => {
            return {
               url: "/academic-semester/create-academic-semester",
               method: "POST",
               body: payload,
            };
         },
      }),
   }),
});

//  ** Export Api Query And Mutation hooks:

export const { usePostAcademicSemesterMutation, useGetAcademicSemesterQuery } =
   academicSemesterApi;
