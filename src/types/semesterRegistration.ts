import { IAacademicSemester, ISemesterRegistrationStatus } from ".";

export interface ISemesterRegistration {
  _id: string;
  academicSemester: IAacademicSemester;
  status: ISemesterRegistrationStatus;
  startDate: string;
  endDate: string;
  minCredit: number;
  maxCredit: number;
}
