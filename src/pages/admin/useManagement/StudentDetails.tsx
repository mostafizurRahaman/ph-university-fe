import { FieldValues, SubmitHandler } from "react-hook-form";
import PHFrom from "../../../components/form/PHFrom";
import ControllerInput from "../../../components/form/ControllerInput";
import { Button, Col, Divider, Flex, Row } from "antd";

import { bloodOptions, genderOptions } from "../../../constants/global";
import PHDatePicker from "../../../components/form/PHDatePicker";
import {
  useGetAcademicSemesterQuery,
  useGetAllAcademicDepartmentQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { useState } from "react";
import PHSelect, { IOption } from "../../../components/form/PHSelect";
import {
  useGetSingleStudentQuery,
  useUpdateSingleStudentMutation,
} from "../../../redux/features/admin/userManagement.api";
import { useParams } from "react-router-dom";
import PHSpin from "../../../components/ui/PHSpin";
import dayjs from "dayjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { studentValidationSchema } from "../../../ValidationSchema/validationSchema";
import { toast } from "sonner";
import { IResponse, IStudent } from "../../../types";

const StudentDetails = () => {
  const [Edit, setEdit] = useState<boolean>(false);
  const params = useParams();

  //  ** Load the single Student Data **
  const {
    data: studentData,
    isLoading,
    isFetching,
  } = useGetSingleStudentQuery(params?.studentId);

  console.log("studentData", studentData, isLoading, isFetching);

  //  **Load Academic Semester **
  const { data: sData, isLoading: sLoading } =
    useGetAcademicSemesterQuery(undefined);

  // ** Load Academic Faculty Data ** :
  const { data: acDData, isLoading: acDLoading } =
    useGetAllAcademicDepartmentQuery(undefined);

  //  ** Update Student Mutation ** :
  const [updateStudent] = useUpdateSingleStudentMutation();

  const semesterOptions = sData?.data?.map((el) => ({
    value: el._id,
    label: `${el.name} ${el.year}`,
  }));
  const acFacultyOptions = acDData?.data?.map((el) => ({
    value: el._id,
    label: el.name,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Student Updating......");
 
    try {
      const res = (await updateStudent({
        data,
        id: params.studentId,
      })) as IResponse<IStudent>;

      console.log(res)

      if (res.error) {
        toast.error(res.error.data.message, { id: toastId, duration: 2000 });
      } else {
        setEdit(false)
        toast.success("Student Updated successfully!!!", {
          id: toastId,
          duration: 2000,
        });

      }
    } catch (err) {
      toast.error("Something Went Wrong!!!", { id: toastId, duration: 2000 });
    }
  };

  if (isLoading || isFetching) {
    return <PHSpin />;
  }

  return (
    <Row
      style={{
        padding: "20px",
        borderRadius: "30px",
        background: "#fff",
        marginBottom: "20px",
      }}
    >
      <Col span={24}>
        <Flex align="center" justify="space-between">
          <h2>Update Student Info</h2>
          <Button
            type="primary"
            htmlType="button"
            onClick={() => setEdit((prev) => !prev)}
          >
            Edit
          </Button>
        </Flex>
        <PHFrom
          onSubmit={onSubmit}
          defaultValues={{
            ...studentData?.data,
            dateOfBirth: dayjs(studentData?.data?.dateOfBirth).toDate(),
          }}
          resolver={zodResolver(studentValidationSchema)}
        >
          <Divider
            dashed
            style={{
              border: "black",
            }}
          >
            Personal Info
          </Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <ControllerInput
                name="name.firstName"
                type="text"
                label="First Name"
                disabled={!Edit}
              ></ControllerInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <ControllerInput
                name="name.middleName"
                type="text"
                label="Middle Name"
                disabled={!Edit}
              ></ControllerInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <ControllerInput
                name="name.lastName"
                type="text"
                label="Last Name"
                disabled={!Edit}
              ></ControllerInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                disabled={!Edit}
                options={genderOptions}
                name="gender"
                label="Gender"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHDatePicker
                name="dateOfBirth"
                label="Date Of Birth"
                disabled={!Edit}
              ></PHDatePicker>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                disabled={!Edit}
                options={bloodOptions}
                name="bloodGroup"
                label="Blood Group"
              />
            </Col>
            {/* <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Controller
                name="image"
                render={({ field: { onChange, value, ...field } }) => {
                  return (
                    <Form.Item label="Profile Pic">
                      <Input
                        type="file"
                        value={value?.filename}
                        {...field}
                        onChange={(e) => onChange(e.target.files?.[0])}
                      ></Input>
                    </Form.Item>
                  );
                }}
              />
            </Col> */}
          </Row>
          <Divider
            dashed
            style={{
              border: "black",
            }}
          >
            Contact Info
          </Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <ControllerInput
                name="email"
                type="email"
                label="Email"
                disabled={!Edit}
              ></ControllerInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <ControllerInput
                name="contactNo"
                type="text"
                label="Contact No"
                disabled={!Edit}
              ></ControllerInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <ControllerInput
                name="emergencyContactNo"
                type="text"
                label="Emergency Contact No"
                disabled={!Edit}
              ></ControllerInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <ControllerInput
                name="presentAddress"
                type="text"
                label="Present Address"
                disabled={!Edit}
              ></ControllerInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <ControllerInput
                name="permanentAddress"
                type="text"
                label="Permanent Address"
                disabled={!Edit}
              ></ControllerInput>
            </Col>
          </Row>
          <Divider
            dashed
            style={{
              border: "black",
            }}
          >
            Guardian Information
          </Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <ControllerInput
                name="guardian.fatherName"
                type="text"
                label="Father Name"
                disabled={!Edit}
              ></ControllerInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <ControllerInput
                name="guardian.fatherOccupation"
                type="text"
                label="Father Occupation"
                disabled={!Edit}
              ></ControllerInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <ControllerInput
                name="guardian.fatherContactNo"
                type="text"
                label="Father Contact No"
                disabled={!Edit}
              ></ControllerInput>
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <ControllerInput
                name="guardian.motherName"
                type="text"
                label="Mother Name"
                disabled={!Edit}
              ></ControllerInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <ControllerInput
                name="guardian.motherOccupation"
                type="text"
                label="Mother Occupation"
                disabled={!Edit}
              ></ControllerInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <ControllerInput
                name="guardian.motherContactNo"
                type="text"
                label="Mother Contact No"
                disabled={!Edit}
              ></ControllerInput>
            </Col>
          </Row>
          <Divider
            dashed
            style={{
              border: "black",
            }}
          >
            Local Guardian
          </Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <ControllerInput
                name="localGuardian.name"
                type="text"
                label="Name"
                disabled={!Edit}
              ></ControllerInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <ControllerInput
                name="localGuardian.occupation"
                type="text"
                label="Occupation"
                disabled={!Edit}
              ></ControllerInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <ControllerInput
                name="localGuardian.address"
                type="text"
                label="Address"
                disabled={!Edit}
              ></ControllerInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <ControllerInput
                name="localGuardian.contactNo"
                type="text"
                label="ContactNo"
                disabled={!Edit}
              ></ControllerInput>
            </Col>
          </Row>
          <Divider
            dashed
            style={{
              border: "black",
            }}
          >
            Academic Info
          </Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                options={semesterOptions as IOption[]}
                name="admissionSemester"
                disabled={sLoading || !Edit}
                label="Academic Semester"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                disabled={!Edit || acDLoading}
                options={acFacultyOptions as IOption[]}
                name="academicDepartment"
                label="Academic Department"
              />
            </Col>
          </Row>

          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </PHFrom>
      </Col>
    </Row>
  );
};

export default StudentDetails;
