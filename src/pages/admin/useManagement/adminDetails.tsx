import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import PHFrom from "../../../components/form/PHFrom";
import ControllerInput from "../../../components/form/ControllerInput";
import { Button, Col, Divider, Flex, Form, Input, Row } from "antd";

import { bloodOptions, genderOptions } from "../../../constants/global";
import PHDatePicker from "../../../components/form/PHDatePicker";
import { useState } from "react";
import PHSelect from "../../../components/form/PHSelect";
import {
  useGetSingleAdminQuery,
  useUpdateSingleAdminMutation,
} from "../../../redux/features/admin/userManagement.api";
import { useParams } from "react-router-dom";
import PHSpin from "../../../components/ui/PHSpin";
import dayjs from "dayjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { IAdmin, IResponse } from "../../../types";
import { adminValidationSchema } from "../../../ValidationSchema/validationSchema";

const AdminDetails = () => {
  const [Edit, setEdit] = useState<boolean>(false);
  const params = useParams();

  //  ** Load the single Student Data **
  const {
    data: adminData,
    isLoading,
    isFetching,
  } = useGetSingleAdminQuery(params?.adminId);

  //  ** Update Student Mutation ** :
  const [updateAdmin] = useUpdateSingleAdminMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Admin Updating......");

    try {
      const res = (await updateAdmin({
        data,
        id: params.adminId,
      })) as IResponse<IAdmin>;



      if (res.error) {
        toast.error(res.error.data.message, { id: toastId, duration: 2000 });
      } else {
        setEdit(false);
        toast.success("Admin Updated successfully!!!", {
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
            ...adminData?.data,
            dateOfBirth: dayjs(adminData?.data?.dateOfBirth).toDate(),
          }}
          resolver={zodResolver(adminValidationSchema)}
        >
          <div>
            <h1
              style={{
                fontSize: "24px",
                textTransform: "uppercase",
                textAlign: "center",
              }}
            >
              Create Admin
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
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Controller
                name="image"
                render={({ field: { onChange, value, ...field } }) => {
                  return (
                    <Form.Item label="Profile Pic">
                      <Input
                        type="file"
                        value={value?.filename}
                        {...field}
                        size="large"
                        onChange={(e) => onChange(e.target.files?.[0])}
                      ></Input>
                    </Form.Item>
                  );
                }}
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

export default AdminDetails;
