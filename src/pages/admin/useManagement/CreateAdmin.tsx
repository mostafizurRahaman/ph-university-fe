import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import PHFrom from "../../../components/form/PHFrom";
import ControllerInput from "../../../components/form/ControllerInput";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { bloodOptions, genderOptions } from "../../../constants/global";
import PHDatePicker from "../../../components/form/PHDatePicker";
import { useAddAdminMutation } from "../../../redux/features/admin/userManagement.api";
import { IAdmin, IResponse } from "../../../types";
import { toast } from "sonner";
const defaultValues = {
  name: {
    firstName: "Mostafizur",
    middleName: "Rahaman",
    lastName: "Fahim",
    _id: "65d9fce415b24dab14b0039c",
  },
  designation: "admin",
  gender: "male",
  dateOfBirth: "1990-01-01",
  bloodGroup: "A+",
  profileImg: "",
  managementDepartment: "Management",

  email: "admin1@gmail.com",
  contactNo: "01951976238",
  emergencyContactNo: "9876543210",
  presentAddress: "123 Main Street, City",
  permanentAddress: "456 Oak Avenue, Town",
};

const CreateAdmin = () => {
  //   ** StudentCreate Mutation**
  const [addAdmin ] = useAddAdminMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const formData = new FormData();

    const adminInfo = {
      password: "admin123",
      admin: data,
    };

    formData.append("data", JSON.stringify(adminInfo));
    formData.append("file", data?.image);

    const toastId = toast.loading("Admin Creating....!!!");

    try {
      const res = (await addAdmin(formData)) as IResponse<IAdmin>;
      
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId, duration: 2000 });
      } else {
        toast.success("Admin Created Successfully!!!", {
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
              <ControllerInput
                name="managementDepartment"
                type="text"
                label="ManagementDepartment"
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

export default CreateAdmin;
