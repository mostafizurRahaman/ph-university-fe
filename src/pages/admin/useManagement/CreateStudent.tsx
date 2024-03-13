import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import PHFrom from "../../../components/form/PHFrom";
import ControllerInput from "../../../components/form/ControllerInput";
import { Button, Col,  Divider, Form, Input, Row } from "antd";
import PHSelect, { IOption } from "../../../components/form/PHSelect";
import { bloodOptions, genderOptions } from "../../../constants/global";
import PHDatePicker from "../../../components/form/PHDatePicker";
import {
  useGetAcademicSemesterQuery,
  useGetAllAcademicDepartmentQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { useAddStudentMutation } from "../../../redux/features/admin/userManagement.api";
import {  IStudentInfo } from "../../../types/student.type";
import { IResponse } from "../../../types";
import { toast } from "sonner";
import dayjs from "dayjs";
const defaultValues = {
  name: {
    firstName: "I am ",
    middleName: "Student",
    lastName: "No : 1",
  },
  gender: "male",
  bloodGroup: "B+",
  dateOfBirth: dayjs("2003-01-01"),

  email: "student2@gmail.com",
  contactNo: "01951976237",
  emergencyContactNo: "01951976238",
  permanentAddress: "Lakshimpur,Chittagong,Bangladesh",
  presentAddress: "Lakshmipur, Chittagong, Bangladesh",

  guardian: {
    fatherName: "Md. Mahfuzur Rahaman",
    fatherOccupation: "Business",
    fatherContactNo: "01711712182",
    motherName: "Sufia Begum",
    motherOccupation: "House Wife",
    motherContactNo: "01641674114",
  },

  localGuardian: {
    name: "Riaz Uddin Chowdhury",
    occupation: "Teacher",
    address: "123 Pine Street, Local City",
    contactNo: "555-3333",
  },

  admissionSemester: "65d9e0602e7a91105d4fb0f7",
  academicDepartment: "65d2d181bcffe1c637b53ac3",
};

const CreateStudent = () => {
  //   ** StudentCreate Mutation**
  const [addStudent, { data : studentData, error }] = useAddStudentMutation();
  console.log(error, studentData);
  //  **Load Academic Semester **
  const { data: sData, isLoading: sLoading } =
    useGetAcademicSemesterQuery(undefined);

  // ** Load Academic Faculty Data ** :
  const { data: acDData, isLoading: acDLoading } =
    useGetAllAcademicDepartmentQuery(undefined);

  const semesterOptions = sData?.data?.map((el) => ({
    value: el._id,
    label: `${el.name} ${el.year}`,
  }));
  const acFacultyOptions = acDData?.data?.map((el) => ({
    value: el._id,
    label: el.name,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const formData = new FormData();

    const studentInfo = {
      password: "student123",
      student: data,
    };
    console.log(data);

    formData.append("data", JSON.stringify(studentInfo));
    formData.append("file", data?.image);

    const toastId = toast.loading("Student Creating....!!!");

    try {
      const res = (await addStudent(formData)) as IResponse<IStudentInfo>;
      console.log(res)
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId, duration: 2000 });
      } else {
        toast.success("Student Created Successfully!!!", {
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
        <PHFrom onSubmit={onSubmit} defaultValues={defaultValues}>
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
            Guardian Information
          </Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <ControllerInput
                name="guardian.fatherName"
                type="text"
                label="Father Name"
              ></ControllerInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <ControllerInput
                name="guardian.fatherOccupation"
                type="text"
                label="Father Occupation"
              ></ControllerInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <ControllerInput
                name="guardian.fatherContactNo"
                type="text"
                label="Father Contact No"
              ></ControllerInput>
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <ControllerInput
                name="guardian.motherName"
                type="text"
                label="Mother Name"
              ></ControllerInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <ControllerInput
                name="guardian.motherOccupation"
                type="text"
                label="Mother Occupation"
              ></ControllerInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <ControllerInput
                name="guardian.motherContactNo"
                type="text"
                label="Mother Contact No"
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
              ></ControllerInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <ControllerInput
                name="localGuardian.occupation"
                type="text"
                label="Occupation"
              ></ControllerInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <ControllerInput
                name="localGuardian.address"
                type="text"
                label="Address"
              ></ControllerInput>
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <ControllerInput
                name="localGuardian.contactNo"
                type="text"
                label="ContactNo"
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
                disabled={sLoading}
                label="Academic Semester"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                options={acFacultyOptions as IOption[]}
                disabled={acDLoading}
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

export default CreateStudent;
