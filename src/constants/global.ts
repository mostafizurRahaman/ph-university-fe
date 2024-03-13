import { ISemesterRegistrationStatus, TBloodGroup, TGender } from "../types";
import makeSentenceCase from "../utils/MakeSentenceCase";

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const genders: TGender[] = ["male", "female", "others"];
export const bloodGroups: TBloodGroup[] = [
  "A+",
  "A-",
  "AB+",
  "AB-",
  "B+",
  "B-",
  "O+",
  "O-",
];

export const monthOptions = months.map((month) => ({
  value: month,
  label: month,
}));

export const bloodOptions = bloodGroups.map((blood) => ({
  value: blood,
  label: blood,
}));
export const genderOptions = genders.map((gender) => ({
  value: gender,
  label: makeSentenceCase(gender),
}));

export const semesterRegistrationStatus: ISemesterRegistrationStatus[] = [
  "UPCOMING",
  "ONGOING",
  "ENDED",
];

export const semesterRegistrationStatusOptions = semesterRegistrationStatus.map(
  (el) => ({
    value: el,
    label: el,
  })
);
