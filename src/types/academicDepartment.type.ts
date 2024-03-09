import { IAcademicFaculty } from ".";

export type TAcademicDepartment = {
  _id: string;
  name: string;
  academicFaculty: IAcademicFaculty;
  createdAt: string;
  updatedAt: string;
};
