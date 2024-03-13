import { useState } from "react";
import { IFilter } from "../../../types";
import { useGetAllAcademicFacultyQuery } from "../../../redux/features/admin/academicManagement.api";
import { Table, TableColumnsType, TableProps } from "antd";
import formatDate from "../../../utils/FormatDate";

interface ITableData {
  key: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}
const AcademicFaculty = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [params] = useState<IFilter[] | undefined>(undefined);

  // ** Load Data from redux hooks **
  const { data, isFetching } = useGetAllAcademicFacultyQuery(params);

  const tableData = data?.data?.map(({ _id, name, createdAt, updatedAt }) => ({
    key: _id,
    name,
    createdAt,
    updatedAt,
  }));

  const columns: TableColumnsType<ITableData> = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Created Date",
      dataIndex: "createdAt",
      render: (_value, record) => {
        return (
          <div>
            <p> {formatDate(record.createdAt)}</p>
          </div>
        );
      },
    },
    {
      title: "Updated Date",
      dataIndex: "updatedAt",
      render: (_value, record) => {
        return (
          <div>
            <p> {formatDate(record.createdAt)}</p>
          </div>
        );
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
      dataSource={tableData as ITableData[]}
      columns={columns}
      onChange={onChange}
    ></Table>
  );
};

export default AcademicFaculty;
