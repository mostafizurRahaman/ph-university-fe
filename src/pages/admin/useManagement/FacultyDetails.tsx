import {  FieldValues, SubmitHandler } from "react-hook-form";
import PHFrom from "../../../components/form/PHFrom";
import ControllerInput from "../../../components/form/ControllerInput";
import { Button, Col, Divider, Flex,  Row } from "antd";

import { bloodOptions, genderOptions } from "../../../constants/global";
import PHDatePicker from "../../../components/form/PHDatePicker";
import { useState } from "react";
import PHSelect from "../../../components/form/PHSelect";
import {
  useGetSingleFacultyQuery,
  useUpdateSingleFacultyMutation,
} from "../../../redux/features/admin/userManagement.api";
import { useParams } from "react-router-dom";
import PHSpin from "../../../components/ui/PHSpin";
import dayjs from "dayjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { facultyValidationSchema } from "../../../ValidationSchema/validationSchema";
import { toast } from "sonner";
import { IResponse } from "../../../types";
import { TFaculty } from "../../../types/faculty.type";
import { useGetAllAcademicDepartmentQuery } from "../../../redux/features/admin/academicManagement.api";

const FacultyDetails = () => {
  const [Edit, setEdit] = useState<boolean>(false);
  const params = useParams();

  //  ** Load the single Student Data **
  const {
    data: facultyData,
    isLoading,
    isFetching,
  } = useGetSingleFacultyQuery(params?.facultyId);

  // ** Load Academic Faculty Data ** :
  const { data: acDData, isLoading: acDLoading } =
    useGetAllAcademicDepartmentQuery(undefined);

  const acFacultyOptions = acDData?.data?.map((el) => ({
    value: el._id,
    label: el.name,
  }));

  //  ** Update Student Mutation ** :
  const [updateFaculty] = useUpdateSingleFacultyMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Faculty Updating......");

    try {
      const res = (await updateFaculty({
        data,
        id: params.facultyId,
      })) as IResponse<TFaculty>;

      console.log(res);

      if (res.error) {
        toast.error(res.error.data.message, { id: toastId, duration: 2000 });
      } else {
        setEdit(false);
        toast.success("Faculty Updated successfully!!!", {
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
          <h2>Update Faculty Info</h2>
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
            ...facultyData?.data,
            dateOfBirth: dayjs(facultyData?.data?.dateOfBirth).toDate(),
          }}
          resolver={zodResolver(facultyValidationSchema)}
        >
          <div>
            <h1
              style={{
                fontSize: "24px",
                textTransform: "uppercase",
                textAlign: "center",
              }}
            >
              Create Faculty
            </h1>
          </div>
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
                disabled={!Edit}
                type="text"
                label="First Name"
              ></ControllerInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <ControllerInput
                name="name.middleName"
                disabled={!Edit}
                type="text"
                label="Middle Name"
              ></ControllerInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <ControllerInput
                name="name.lastName"
                disabled={!Edit}
                type="text"
                label="Last Name"
              ></ControllerInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <ControllerInput
                name="designation"
                disabled={!Edit}
                type="text"
                label="Designation"
              ></ControllerInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <ControllerInput
                name="managementDepartment"
                disabled={!Edit}
                type="text"
                label="ManagementDepartment"
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
                disabled={!Edit}
                type="email"
                label="Email"
              ></ControllerInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <ControllerInput
                name="contactNo"
                disabled={!Edit}
                type="text"
                label="Contact No"
              ></ControllerInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <ControllerInput
                name="emergencyContactNo"
                disabled={!Edit}
                type="text"
                label="Emergency Contact No"
              ></ControllerInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <ControllerInput
                name="presentAddress"
                disabled={!Edit}
                type="text"
                label="Present Address"
              ></ControllerInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <ControllerInput
                name="permanentAddress"
                disabled={!Edit}
                type="text"
                label="Permanent Address"
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
                disabled={!Edit || acDLoading}
                options={acFacultyOptions as IOption[]}
                name="academicDepartment"
                label="Academic Department"
              />
            </Col>
          </Row>

          <Button
            type="primary"
            htmlType="submit"
            size="large"
            style={{ marginLeft: "auto", display: "block" }}
          >
            Submit
          </Button>
        </PHFrom>
      </Col>
    </Row>
  );
};

export default FacultyDetails;
