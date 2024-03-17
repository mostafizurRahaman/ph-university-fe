//  ** course Type **

import { IAacademicSemester, IAcademicFaculty, IStudent, TAcademicDepartment } from ".";
import { TFaculty } from "./faculty.type";
import { ISemesterRegistration } from "./semesterRegistration";

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

export interface IOfferedCourse {
  _id: string;
  semesterRegistration: ISemesterRegistration;
  academicSemester: IAacademicSemester;
  academicFaculty: IAcademicFaculty;
  academicDepartment: TAcademicDepartment;
  faculty: TFaculty;
  course: ICourse;
  maxCapacity: number;
  section: number;
  days: string[];
  startTime: string;
  endTime: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IMyCourseWithSection {
  [key: string]: {
    courseTitle: string;
    sections: {
      section: number;
      _id: string;
      days: string[];
      startTime: string;
      endTime: string;
    }[];
  };
}





export type TEnrolledCourses = {
  _id: string;
  semesterRegistration: ISemesterRegistration;
  offeredCourse: IOfferedCourse;
  academicSemester: IAacademicSemester;
  academicFaculty: IAcademicFaculty;
  academicDepartment: TAcademicDepartment;
  course: ICourse;
  faculty: TFaculty;
  student: IStudent;
  isEnrolled: boolean;
  courseMarks: CourseMarks;
  grade: string;
  gradePoints: number;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}
interface CourseMarks {
  classTest1: number;
  midTerm: number;
  classTest2: number;
  finalTerm: number;
  _id: string;
}
