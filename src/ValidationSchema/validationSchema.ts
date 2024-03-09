import { z } from "zod";

export const AcademicSemesterValidationSchema = z.object({
  name: z.string({
    required_error: "Please Provide a Name!!!",
  }),
  year: z.string({
    required_error: "Please Provide a Year!!!",
  }),
  startMonth: z.string({
    required_error: "Please Provide a startMonth!!!",
  }),
  endMonth: z.string({
    required_error: "Please Provide an endMonth!!!",
  }),
});

export const AcademicFacultyValidationSchema = z.object({
  name: z.string({
    required_error: "Please Provide a Name",
  }),
});

export const AcademicDepartmentValidationSchema = z.object({
  name: z.string({
    required_error: "Please Provide a Name",
  }),
  academicFaculty: z.string({
    required_error: "Please Select an AcademicFaculty!!!",
  }),
});
