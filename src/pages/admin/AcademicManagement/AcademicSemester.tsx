import { Button, Table, TableColumnsType, TableProps } from "antd";
import { useGetAcademicSemesterQuery } from "../../../redux/features/admin/academicManagement";
import { IFilter, type IAacademicSemester } from "../../../types";
import { useState } from "react";

type TAcademicTableData = Pick<
  IAacademicSemester,
  "name" | "year" | "startMonth" | "endMonth"
> & {
  key: string;
};

const AcademicSemester = () => {
  const [params, setParams] = useState<IFilter[]>([]);
  const { data, isFetching } = useGetAcademicSemesterQuery(params);

  //** Table Data  */
  const tableData = data?.data?.map(
    ({ _id, name, year, startMonth, endMonth }) => ({
      key: _id,
      name,
      year,
      startMonth,
      endMonth,
    })
  );

  const columns: TableColumnsType<TAcademicTableData> = [
    {
      title: "Name",
      dataIndex: "name",
      filters: [
        {
          text: "Autumn",
          value: "Autumn",
        },
        {
          text: "Fall",
          value: "Fall",
        },
        {
          text: "Summer",
          value: "Summer",
        },
      ],
    },
    {
      title: "Year",
      dataIndex: "year",
      filters: [
        {
          value: "2024",
          text: "2024",
        },
        {
          value: "2025",
          text: "2025",
        },
        {
          value: "2026",
          text: "2026",
        },
        {
          value: "2027",
          text: "2027",
        },
        {
          value: "2028",
          text: "2028",
        },
      ],
    },
    {
      title: "Start Month",
      dataIndex: "startMonth",
    },
    {
      title: "End Month",
      dataIndex: "endMonth",
    },
    {
      title: "Actions",
      dataIndex: "",
      render: (_value, record) => {
        return (
          <div>
            <Button onClick={() => console.log(record.key, record.name)}>
              {" "}
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  const onChange: TableProps<TAcademicTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    //  ** set the filters to params **
    if (extra.action === "filter") {
      const myFilters: IFilter[] = [];

      if (filters && Object.keys(filters).length > 0) {
        const keys = Object.keys(filters);

        keys.forEach((key) => {
          filters[key]?.forEach((el) => {
            myFilters.push({ name: key, value: el as string });
          });
          setParams(myFilters);
        });
      }
    }
  };

  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
    />
  );
};

export default AcademicSemester;
