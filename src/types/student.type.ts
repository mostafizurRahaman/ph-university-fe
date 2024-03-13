import { IAacademicSemester, IAcademicFaculty, TAcademicDepartment } from ".";

export interface IStudent {
  _id: string;
  id: string;
  user: string;
  name: IName;
  gender: string;
  dateOfBirth: string;
  bloodGroup: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  guardian: IGuardian;
  localGuardian: ILocalGuardian;
  profileImg: string;
  admissionSemester: IAacademicSemester;
  academicDepartment: TAcademicDepartment;
  academicFaculty: IAcademicFaculty;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ILocalGuardian {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
  _id: string;
}
interface IGuardian {
  fatherName: string;
  fatherContactNo: string;
  fatherOccupation: string;
  motherName: string;
  motherContactNo: string;
  motherOccupation: string;
  _id: string;
}
export interface IName {
  firstName: string;
  middleName: string;
  lastName: string;
  _id: string;
}

export interface IStudentInfo {
  password: string;
  student: IStudent;
}
