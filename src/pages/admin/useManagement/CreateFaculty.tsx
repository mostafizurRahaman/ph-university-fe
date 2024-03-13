import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import PHFrom from "../../../components/form/PHFrom";
import ControllerInput from "../../../components/form/ControllerInput";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import PHSelect, { IOption } from "../../../components/form/PHSelect";
import { bloodOptions, genderOptions } from "../../../constants/global";
import PHDatePicker from "../../../components/form/PHDatePicker";
import { IResponse } from "../../../types";
import { toast } from "sonner";
import { TFaculty } from "../../../types/faculty.type";
import { useGetAllAcademicDepartmentQuery } from "../../../redux/features/admin/academicManagement.api";
import { useAddFacultyMutation } from "../../../redux/features/admin/userManagement.api";
const defaultValues = {
  name: {
    firstName: "rabby",
    middleName: "",
    lastName: "hossain",
  },

  designation: "Lecturer",
  gender: "female",
  dateOfBirth: "1985-05-15",
  bloodGroup: "B-",
  email: "faculty3@gamil.net",
  contactNo: "9876543210",
  emergencyContactNo: "1234567890",
  presentAddress: "567 Willow Street, Suburb",
  permanentAddress: "789 Pine Avenue, City",
  academicDepartment: "65d2d2b2d437feaa727f2aa7",
  academicFaculty: "65d20e02fbf888db988749ba",
  profileImg: "",
  isDeleted: false,
  createdAt: "2024-02-24T14:20:37.217Z",
  updatedAt: "2024-02-24T14:20:37.217Z",
};

const CreateFaculty = () => {
  //   ** StudentCreate Mutation**
  const [addFaculty] = useAddFacultyMutation();

  // ** Load Academic Faculty Data ** :
  const { data: acDData, isLoading: acDLoading } =
    useGetAllAcademicDepartmentQuery(undefined);

  const acDepartmentOptions = acDData?.data?.map((el) => ({
    value: el._id,
    label: el.name,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const formData = new FormData();

    const facultyInfo = {
      password: "faculty123",
      faculty: data,
    };

    formData.append("data", JSON.stringify(facultyInfo));
    formData.append("file", data?.image);

    const toastId = toast.loading("Faculty Creating....!!!");

    try {
      const res = (await addFaculty(formData)) as IResponse<TFaculty>;
      console.log(res);
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId, duration: 2000 });
      } else {
        toast.success("Faculty Created Successfully!!!", {
          id: toastId,
          duration: 2000,
        });
      }
    } catch (err) {
      toast.error("Something Went Wrong!!!", {
        id: toastId,
        duration: 2000,
      });
    }
  };

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
        <PHFrom onSubmit={onSubmit} defaultValues={{ ...defaultValues }}>
          <div>
            <h1
              style={{
                fontSize: "24px",
                textTransform: "uppercase",
                textAlign: "center",
              }}
            >
              Create faculty
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
                type="text"
                label="First Name"
              ></ControllerInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <ControllerInput
                name="name.middleName"
                type="text"
                label="Middle Name"
              ></ControllerInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <ControllerInput
                name="name.lastName"
                type="text"
                label="Last Name"
              ></ControllerInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <ControllerInput
                name="designation"
                type="text"
                label="Designation"
              ></ControllerInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect options={genderOptions} name="gender" label="Gender" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHDatePicker
                name="dateOfBirth"
                label="Date Of Birth"
              ></PHDatePicker>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
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
                type="email"
                label="Email"
              ></ControllerInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <ControllerInput
                name="contactNo"
                type="text"
                label="Contact No"
              ></ControllerInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <ControllerInput
                name="emergencyContactNo"
                type="text"
                label="Emergency Contact No"
              ></ControllerInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <ControllerInput
                name="presentAddress"
                type="text"
                label="Present Address"
              ></ControllerInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <ControllerInput
                name="permanentAddress"
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
                options={acDepartmentOptions as IOption[]}
                disabled={acDLoading}
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

export default CreateFaculty;
