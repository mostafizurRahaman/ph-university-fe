import { useState } from "react";
import { useGetAllAcademicDepartmentQuery } from "../../../redux/features/admin/academicManagement.api";
import { Table, TableColumnsType, TableProps } from "antd";
import formatDate from "../../../utils/FormatDate";
import { IFilter } from "../../../types";

interface ITableData {
  key: string;
  name: string;
  academicFaculty: string;
  createdAt: string;
  updatedAt: string;
}

const AcademicDepartment = () => {
  const [params, setParams] = useState<IFilter[] | undefined>(undefined);

  const { data, isFetching } = useGetAllAcademicDepartmentQuery(params);

  const tableData = data?.data?.map(
    ({ _id, name, academicFaculty, createdAt, updatedAt }) => ({
      key: _id,
      name,
      academicFaculty: academicFaculty.name,
      createdAt,
      updatedAt,
    })
  );

  const columns: TableColumnsType<ITableData> = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Academic Faculty",
      dataIndex: "academicFaculty",
    },
    {
      title: "Created Date",
      dataIndex: "createdAt",
      render: (value, record) => {
        return (
          <div>
            <p> {value ? formatDate(record.createdAt) : "-"}</p>
          </div>
        );
      },
    },
    {
      title: "Updated Date",
      dataIndex: "updatedAt",
      render: (value, record) => {
        return (
          <div>
            <p> {value ? formatDate(record.createdAt) : "-"}</p>
          </div>
        );
      },
    },
  ];

  const onChange: TableProps<ITableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const searchParams: IFilter[] = [];
      const keys = Object.keys(filters);
      if (filters && keys.length > 0) {
        keys.forEach((key) => {
          filters[key]?.forEach((item) => {
            searchParams.push({ name: key, value: item as string });
          });
        });
      }

      setParams(searchParams);
    }
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

export default AcademicDepartment;
