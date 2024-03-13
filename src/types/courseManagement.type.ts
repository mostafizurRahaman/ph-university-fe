//  ** course Type **

import { TFaculty } from "./faculty.type";

export interface ICourse {
  _id: string;
  title: string;
  prefix: string;
  code: number;
  credits: number;
  isDeleted?: boolean;
  preRequisiteCourses: TPerquisitesCourse;
  createdAt: string;
  updatedAt: string;
}

export type TPerquisitesCourse = Pick<ICourse, "isDeleted"> & {
  course: string;
};

export interface ICourseFaculties {
  course: string;
  faculties: TFaculty[];
}
