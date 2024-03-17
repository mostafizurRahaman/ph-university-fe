import { z } from "zod";
import {
  bloodGroups,
  genders,
  semesterRegistrationStatus,
} from "../constants/global";

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

export const UserNameZodValidationSchema = z.object({
  firstName: z
    .string({
      required_error: "First Name Is Required",
    })
    .max(20, { message: "First name can't be more than 20 characters" }),
  middleName: z
    .string()
    .max(20, { message: "Middle name can't be more than 20 characters" }),
  lastName: z
    .string({
      required_error: "Last Name Is Required",
    })
    .max(20, { message: "Last name can't be more than 20 characters" }),
});

const GuardianZodValidationSchema = z.object({
  fatherName: z.string({
    required_error: "Father Name is required!",
  }),
  fatherOccupation: z.string({
    required_error: "Father Occupation is required!",
  }),
  fatherContactNo: z.string({
    required_error: "Father Contact No is required!",
  }),
  motherName: z.string({
    required_error: "Mother Name is required!",
  }),
  motherOccupation: z.string({
    required_error: "Mother Occupation is required!",
  }),
  motherContactNo: z.string({
    required_error: "Mother Contact No is required!",
  }),
});

const LocalGuardianZodValidationSchema = z.object({
  name: z.string({
    required_error: "Name is required!",
  }),
  occupation: z.string({
    required_error: "Occupation is required!",
  }),
  address: z.string({
    required_error: "Address is required!",
  }),
  contactNo: z.string({
    required_error: "Contact No is required!",
  }),
});

export const studentValidationSchema = z.object({
  name: UserNameZodValidationSchema,
  gender: z.enum(["male", "female", "other"]),
  email: z
    .string({
      required_error: "Email is required!",
    })
    .email({
      message: "This is not a valid email!",
    }),
  bloodGroup: z
    .enum(["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"])
    .optional(),
  dateOfBirth: z.date({
    required_error: "Date of Birth Is Required !!",
  }),
  contactNo: z.string({
    required_error: "Contact No is required!",
  }),
  emergencyContactNo: z.string({
    required_error: "Emergency Contact No is required!",
  }),
  permanentAddress: z.string({
    required_error: "Permanent Address is required!",
  }),
  presentAddress: z.string({
    required_error: "Present Address is required!",
  }),
  guardian: GuardianZodValidationSchema,
  localGuardian: LocalGuardianZodValidationSchema,
  admissionSemester: z.string({
    required_error: "Admission Semester is required!",
  }),
  academicDepartment: z.string({
    required_error: "Academic Department is required!",
  }),
});

export const adminValidationSchema = z.object({
  name: UserNameZodValidationSchema,
  designation: z.string({
    required_error: "designation is Required!!!",
  }),
  gender: z.enum([...(genders as [string, ...string[]])], {
    required_error: "Gender Is Required!!!",
  }),
  dateOfBirth: z
    .date({
      required_error: "Date is Required!!!",
    })
    .optional(),
  bloodGroup: z.enum([...(bloodGroups as [string, ...string[]])], {
    required_error: "Blood Group Is required",
  }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid Email"),
  contactNo: z.string({
    required_error: "ContactNo Is Required!!!",
  }),
  emergencyContactNo: z.string({
    required_error: "Emergency Contact No Is Required!!!",
  }),
  presentAddress: z.string({
    required_error: "presentAddress is Required!!!",
  }),
  permanentAddress: z.string({
    required_error: "permanentAddress is Required!!!",
  }),
  managementDepartment: z.string({
    required_error: "managementDepartment is Required!!!",
  }),
});

export const facultyValidationSchema = z.object({
  name: UserNameZodValidationSchema,
  designation: z.string({
    required_error: "designation is Required!!!",
  }),
  gender: z.enum([...(genders as [string, ...string[]])], {
    required_error: "Gender Is Required!!!",
  }),
  dateOfBirth: z
    .date({
      required_error: "Date is Required!!!",
    })
    .optional(),
  bloodGroup: z.enum([...(bloodGroups as [string, ...string[]])], {
    required_error: "Blood Group Is required",
  }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid Email"),
  contactNo: z.string({
    required_error: "ContactNo Is Required!!!",
  }),
  emergencyContactNo: z.string({
    required_error: "Emergency Contact No Is Required!!!",
  }),
  presentAddress: z.string({
    required_error: "presentAddress is Required!!!",
  }),
  permanentAddress: z.string({
    required_error: "permanentAddress is Required!!!",
  }),
  academicDepartment: z.string({
    required_error: "Academic Department is required!",
  }),
});

export const semesterRegistrationValidationSchema = z.object({
  academicSemester: z.string({
    required_error: "Academic Semester Is Required!!!",
  }),
  status: z.enum([...semesterRegistrationStatus] as [string, ...string[]], {
    required_error: "Semester Registration Is Required!!!",
  }),
  startDate: z.date({
    required_error: "StartDate is Required!!!",
  }),
  endDate: z.date({
    required_error: "endDate is Required!!!",
  }),
  maxCredit: z.string({
    required_error: "maxCredit is required",
  }),
  minCredit: z.string({
    required_error: "minCredit is required",
  }),
});

//  Course Validation Schema **
export const courseValidationSchema = z.object({
  title: z.string({
    required_error: "Title Is Required!!!",
  }),
  prefix: z.string({
    required_error: "Prefix Is Required!!!",
  }),
  code: z.string({
    required_error: "Code Is Required",
  }),
  credits: z.string({
    required_error: "Credits IS Required",
  }),
  preRequisiteCourses: z.array(z.string()).optional(),
});

// ** Offered Course Validation Schema **
export const offeredCourseValidationSchema = z.object({
  semesterRegistration: z.string({
    required_error: "Semester Registration Validation!!",
  }),
  academicSemester: z.string({
    required_error: "Academic semester Is Required!!!",
  }),
  academicFaculty: z.string({
    required_error: "Academic Faculty is Required!!!",
  }),
  academicDepartment: z.string({
    required_error: "Academic Department Is Required!!!",
  }),
  course: z.string({
    required_error: "Course Is Required!!",
  }),
  faculty: z.string({
    required_error: "Faculty Is Required!!!",
  }),
  maxCapacity: z.string({
    required_error: "maxCapacity is Required!!!",
  }),
  section: z.string({
    required_error: "section is Required!!!",
  }),
  days: z.array(z.string(), {
    required_error: "Days is Required !!",
  }),
  startTime: z.date({
    required_error: "startTime is required!!!",
  }),
  endTime: z.date({
    required_error: "endTime is required!!!",
  }),
});

//   ** Change Password Validation Schema **
export const changePasswordValidationSchema = z.object({
  oldPassword: z.string({
    required_error: "Old Password Is  Required!!",
  }),
  newPassword: z.string({
    required_error: "New Password Is  Required!!",
  }),
});
