import { IAdmin, IStudent } from ".";

export type TFaculty = Omit<IAdmin, "managementDepartment"> &
  Pick<IStudent, "academicFaculty" | "academicDepartment">;
