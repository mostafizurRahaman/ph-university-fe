import { IName } from ".";

export interface IAdmin {
  _id: string;
  id: string;
  name: IName;
  user: string;
  designation: string;
  gender: string;
  dateOfBirth: string;
  bloodGroup: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  profileImg: string;
  managementDepartment: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}
