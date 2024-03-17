import { Button, Modal, Table, TableColumnsType, TableProps } from "antd";
import {
  useGetFacultyEnrolledCourseQuery,
  useUpdateCourseMarksMutation,
} from "../../redux/features/faculty/facultyMangement.api";
import PHFrom from "../../components/form/PHFrom";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { IResponse, TEnrolledCourses } from "../../types";
import React, { useState } from "react";
import ControllerInput from "../../components/form/ControllerInput";
import { toast } from "sonner";

interface ITableData {
  key: string;
  name: {
    firstName: string;
    middleName?: string;
    lastName: string;
  };
  student: string;
  semester: string;
  offeredCourse: string;
  semesterRegistration: string;
}

interface IUpdateModalProps {
  student: string;
  offeredCourse: string;
  semesterRegistration: string;
}

const MyStudents = () => {
  const { data: facultySemesterRegistration, isFetching } =
    useGetFacultyEnrolledCourseQuery(undefined);

  console.log(facultySemesterRegistration);

  const tableData = (
    facultySemesterRegistration?.data as TEnrolledCourses[]
  )?.map((item: TEnrolledCourses) => {
    return {
      key: item.student.id,
      name: item.student.name,
      student: item.student._id,
      semester: `${item.academicSemester.name} ${item.academicSemester.year}`,
      offeredCourse: item.offeredCourse._id,
      semesterRegistration: item.semesterRegistration._id,
    };
  });

  const columns: TableColumnsType<ITableData> = [
    {
      title: "Name",
      dataIndex: "name",
      render: (value, record) => {
        const { firstName, lastName, middleName } = value;
        return (
          <span>
            {firstName + (middleName ? " " + middleName + " " : " ") + lastName}
          </span>
        );
      },
    },
    {
      title: "Student ID",
      dataIndex: "key",
    },
    {
      title: "semester",
      dataIndex: "semester",
    },
    {
      title: "Action",
      dataIndex: "studentId",
      render: (value, record) => {
        const studentInfo = {
          student: record.student,
          offeredCourse: record.offeredCourse,
          semesterRegistration: record.semesterRegistration,
        };
        return <UpdateCourseMarksModal {...studentInfo} />;
      },
    },
  ];

  const onChange: TableProps<ITableData>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <Table
      loading={isFetching}
      dataSource={tableData}
      columns={columns}
      onChange={onChange}
    ></Table>
  );
};

export default MyStudents;

const UpdateCourseMarksModal = (props: IUpdateModalProps) => {
  const [showModal, setShowModal] = useState(false);

  const [updateMarks] = useUpdateCourseMarksMutation();

  const handleOk = () => {};

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    const id = toast.loading("Faculties Removing...");

    const payload = {
      ...props,
      courseMarks: {
        classTest1: Number(data.classTest1),
        classTest2: Number(data.classTest2),
        midTerm: Number(data.midTerm),
        finalTerm: Number(data.finalTerm),
      },
    };
    console.log(payload);

    try {
      const res = (await updateMarks(payload)) as IResponse<TEnrolledCourses>;

      if (res.error) {
        toast.error(res.error.data.message, {
          id,
          duration: 2000,
        });
      } else {
        toast.success("Marks Updated Successfully!!!", {
          id,
          duration: 2000,
        });
      }
    } catch (err) {
      toast.error("Something Went Wrong!!!", {
        id,
        duration: 2000,
      });
    }

    setShowModal(false);
  };

  return (
    <React.Fragment>
      <Button onClick={() => setShowModal(true)}>Update Marks</Button>
      <Modal
        title="Update Marks"
        open={showModal}
        onOk={handleOk}
        onCancel={() => setShowModal((prev) => !prev)}
        footer={null}
      >
        <PHFrom onSubmit={handleSubmit}>
          <ControllerInput name="classTest1" label="ClassTest1" type="number" />
          <ControllerInput name="classTest2" label="ClassTest2" type="number" />
          <ControllerInput name="midTerm" label="MidTerm" type="number" />
          <ControllerInput name="finalTerm" label="FinalTerm" type="number" />
          <Button
            type="primary"
            style={{
              marginLeft: "auto",
              display: "block",
            }}
            htmlType="submit"
          >
            Update Marks
          </Button>
        </PHFrom>
      </Modal>
    </React.Fragment>
  );
};
