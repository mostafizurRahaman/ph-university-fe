import { Button, Table, TableColumnsType, TableProps } from "antd";
import { useGetAllOfferedCourseQuery } from "../../../redux/features/admin/courseManagementApi.api";
import { IOfferedCourse } from "../../../types";

type TTableData = Pick<
  IOfferedCourse,
  | "academicSemester"
  | "academicFaculty"
  | "academicDepartment"
  | "faculty"
  | "course"
  | "startTime"
  | "endTime"
  | "days"
>;

const OfferedCourses = () => {
  const { data: offeredCourseData, isFetching } =
    useGetAllOfferedCourseQuery(undefined);
  console.log(offeredCourseData);

  const tableData = offeredCourseData?.data?.map(
    ({
      _id,
      academicDepartment,
      academicSemester,
      academicFaculty,
      faculty,
      course,
      endTime,
      startTime,
      days,
    }) => {
      return {
        key: _id,
        academicDepartment,
        academicSemester,
        academicFaculty,
        faculty,
        course,
        endTime,
        startTime,
        days,
      };
    }
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Semester",
      dataIndex: "academicSemester",
      render: (value, record) =>
        record.academicSemester.name + " " + record.academicSemester.year,
    },
    {
      title: "Academic Faculty",
      dataIndex: "academicFaculty",
      render: (value, record) => record.academicFaculty.name,
    },
    {
      title: "Department",
      dataIndex: "academicDepartment",
      render: (value, record) => record.academicDepartment.name,
    },
    {
      title: "Faculty",
      dataIndex: "faculty",
      render: (value, record) => {
        const { firstName, lastName, middleName } = record.faculty.name;
        return (
          `${firstName.toUpperCase()}${
            middleName ? " " + middleName.toUpperCase() + " " : " "
          }${lastName.toUpperCase()}` || "-"
        );
      },
    },
    {
      title: "course",
      dataIndex: "course",
      render: (value, record) =>
        record.course.title + " - " + record.course.code,
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      render: (value, record) => record.startTime,
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      render: (value, record) => record.endTime,
    },

    {
      title: "Actions",
      dataIndex: "key",
      render: (_value, record) => {
        return <Button onClick={() => console.log(record)}>Delete</Button>;
      },
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
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
      dataSource={tableData as TTableData[]}
      columns={columns}
      onChange={onChange}
      scroll={{ x: 1200 }}
    ></Table>
  );
};

export default OfferedCourses;
