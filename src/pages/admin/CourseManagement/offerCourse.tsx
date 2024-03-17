import { FieldValues, SubmitHandler } from "react-hook-form";
import PHFrom from "../../../components/form/PHFrom";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import ControllerInput from "../../../components/form/ControllerInput";

import {
  useAddOfferedCourseMutation,
  useGetAllSemesterRegistrationQuery,
  useGetCourseFacultiesQuery,
  useGetCoursesQuery,
} from "../../../redux/features/admin/courseManagementApi.api";
import { IOfferedCourse, IResponse } from "../../../types";
import {
  useGetAllAcademicDepartmentQuery,
  useGetAllAcademicFacultyQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { useState } from "react";
import PHSelectWithWatch from "../../../components/form/PHSelectWithWatch";
import { daysOptions } from "../../../constants/global";
import PHTimeInput from "../../../components/form/PHTimeInput";
import { offeredCourseValidationSchema } from "../../../ValidationSchema/validationSchema";

const OfferedCourse = () => {
  const [selectedSemesterRegistration, setSelectedSemesterRegistration] =
    useState<string>("");
  const [selectedAcademicFaculty, setSelectedAcademicFaculty] =
    useState<string>("");
  const [selectedCourse, setSelectedCourse] = useState<string>("");

  // **Get All Semester Registration **
  const { data: semesterRegistrationData, isFetching: semesterFetching } =
    useGetAllSemesterRegistrationQuery([
      {
        name: "limit",
        value: 0,
      },
    ]);

  const semesterRegistrationOptions = semesterRegistrationData?.data?.map(
    ({ _id, academicSemester: { name, year } }) => {
      return {
        label: `${name} ${year}`,
        value: _id,
      };
    }
  );

  const mySemesterRegistration = semesterRegistrationData?.data?.find(
    (item) => item._id === selectedSemesterRegistration
  );

  const academicSemesterOptions = [
    {
      label:
        mySemesterRegistration?.academicSemester?.name +
        " " +
        mySemesterRegistration?.academicSemester?.year,
      value: mySemesterRegistration?.academicSemester?._id as string,
    },
  ];

  // ** Get All Academic Faculty **
  const { data: AcademicFaculties, isFetching: afFetching } =
    useGetAllAcademicFacultyQuery([
      {
        name: "limit",
        value: 0,
      },
    ]);

  const academicFacultyOptions = AcademicFaculties?.data?.map(
    ({ _id, name }) => {
      return {
        label: name,
        value: _id,
      };
    }
  );

  // ** Get All Academic Department Under the Academic Faculty **

  const { data: AcademicDepartmentData, isFetching: aDFetching } =
    useGetAllAcademicDepartmentQuery(
      [
        {
          name: "limit",
          value: 0,
        },
        {
          name: "academicFaculty",
          value: selectedAcademicFaculty,
        },
      ],
      {
        skip: !selectedAcademicFaculty,
      }
    );

  const academicDeparmentOptions = AcademicDepartmentData?.data?.map(
    ({ _id, name }) => {
      return {
        label: name,
        value: _id,
      };
    }
  );

  //   ** Get all courses **

  const { data: coursesData, isFetching: CFetching } = useGetCoursesQuery([
    { name: "limit", value: 0 },
    { name: "sort", value: "code" },
  ]);

  const coursesOptions = coursesData?.data?.map(({ _id, title, code }) => ({
    label: `${title} - ${code}`,
    value: _id,
  }));

  // ** Get Faculties Fro Courses **

  const { data: courseFaculties, isFetching: CfFetcing } =
    useGetCourseFacultiesQuery(selectedCourse, {
      skip: !selectedCourse,
    });

  const facultiesOptions = courseFaculties?.data?.faculties?.map(
    ({ name: { firstName, lastName, middleName }, _id }) => {
      return {
        label: `${firstName.toUpperCase()}${
          middleName ? " " + middleName?.toUpperCase() + " " : " "
        }${lastName.toUpperCase()}`,
        value: _id,
      };
    }
  );

  const convertTimeFormat = (date: Date | string) => {
    const newDate = new Date(date);
    return newDate.toISOString().split("T")[1].slice(0, 5);
  };

  //  ** Add Offered Course Mutation **
  const [addOfferedCourse] = useAddOfferedCourseMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const offeredSemesterData = {
      ...data,
      startTime: convertTimeFormat(data.startTime),
      endTime: convertTimeFormat(data.endTime),
      maxCapacity: Number(data.maxCapacity),
      section: Number(data.section),
    };
    const toastId = toast.loading(" Offered Course Creating...");

    try {
      const res = (await addOfferedCourse(
        offeredSemesterData
      )) as IResponse<IOfferedCourse>;
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId, duration: 2000 });
      } else {
        toast.success(" Offered Course Is Created Successfully!!", {
          id: toastId,
          duration: 2000,
        });
      }
    } catch (err) {
      toast.error("Something Went Wrong!!", { id: toastId, duration: 2000 });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHFrom
          onSubmit={onSubmit}
          resolver={zodResolver(offeredCourseValidationSchema)}
        >
          <PHSelectWithWatch
            disabled={semesterFetching}
            name="semesterRegistration"
            label="Semester Registration"
            placeholder="Select SemesterRegistration"
            setValue={setSelectedSemesterRegistration}
            options={semesterRegistrationOptions}
          />
          <PHSelect
            disabled={!selectedSemesterRegistration}
            name="academicSemester"
            label="Academic Semester"
            placeholder="Select academicSemester"
            options={academicSemesterOptions}
          ></PHSelect>
          <PHSelectWithWatch
            disabled={afFetching}
            name="academicFaculty"
            label="Academic Faculty"
            placeholder="Select academicFaculty"
            options={academicFacultyOptions}
            setValue={setSelectedAcademicFaculty}
          ></PHSelectWithWatch>
          <PHSelect
            disabled={!selectedAcademicFaculty || aDFetching}
            name="academicDepartment"
            label="Academic Department"
            placeholder="Select academicDepartment"
            options={academicDeparmentOptions}
          ></PHSelect>
          <PHSelectWithWatch
            disabled={CFetching}
            name="course"
            label="course"
            placeholder="Select course"
            options={coursesOptions}
            setValue={setSelectedCourse}
          ></PHSelectWithWatch>
          <PHSelect
            disabled={!selectedCourse || CfFetcing}
            name="faculty"
            label="Faculty"
            placeholder="Select Faculty"
            options={facultiesOptions}
          ></PHSelect>
          <ControllerInput
            name="maxCapacity"
            label="MaxCapacity"
            type="number"
            placeholder="Enter maxCapacity"
          />
          <ControllerInput
            name="section"
            label="Section"
            type="number"
            placeholder="Enter section"
          />
          <PHSelect
            name="days"
            label="Days"
            placeholder="Select Days"
            options={daysOptions}
            mode="multiple"
          ></PHSelect>
          <PHTimeInput name="startTime" label="startTime" />
          <PHTimeInput name="endTime" label="endTime" />
          <Button
            type="primary"
            htmlType="submit"
            style={{
              margin: "0px auto",
              marginTop: "20px",
            }}
          >
            Submit
          </Button>
        </PHFrom>
      </Col>
    </Flex>
  );
};

export default OfferedCourse;
