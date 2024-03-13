import {
  Button,
  Dropdown,
  MenuProps,
  Table,
  TableColumnsType,
  TableProps,
  Tag,
} from "antd";
import { IFilter, IResponse } from "../../../types";
import { useState } from "react";
import { ISemesterRegistration } from "../../../types/semesterRegistration";
import {
  useGetAllSemesterRegistrationQuery,
  useUpdateSemesterRegistrationMutation,
} from "../../../redux/features/admin/courseManagementApi.api";
import formatDate from "../../../utils/FormatDate";
import { toast } from "sonner";

type TRegisteredSemesterData = Pick<
  ISemesterRegistration,
  "academicSemester" | "startDate" | "endDate" | "status"
> & {
  key: string;
};

const RegisteredSemester = () => {
  const [params, setParams] = useState<IFilter[]>([]);
  const [semesterId, setSemesterId] = useState<string>("");
  const { data, isFetching } = useGetAllSemesterRegistrationQuery(params);

  const [updateSemesterRegistration] = useUpdateSemesterRegistrationMutation();

  //** Table Data  */
  const tableData = data?.data?.map(
    ({ _id, academicSemester, startDate, endDate, status }) => ({
      key: _id,
      academicSemester,
      startDate,
      endDate,
      status,
    })
  );

  const handleDropdownUpdate: MenuProps["onClick"] = async (data) => {
    //  *** Updating........ *** //
    const toastId = toast.loading("Semester Registration Updating.........");
    const payload = {
      id: semesterId,
      data: {
        status: data.key,
      },
    };

    try {
      const res = (await updateSemesterRegistration(
        payload
      )) as IResponse<ISemesterRegistration>;

      if (res.error) {
        toast.error(res.error.data.message, {
          id: toastId,
          duration: 2000,
        });
      } else {
        toast.success("Semester Registration Is Updated Successfully!!!", {
          id: toastId,
          duration: 2000,
        });
      }
    } catch (err) {
      toast.error("Something Went Wrong", { id: toastId });
    }
  };

  //   ** Dropdown Button Menu Props**
  const items: MenuProps["items"] = [
    {
      label: "Upcoming",
      key: "UPCOMING",
    },
    {
      label: "Ongoing",
      key: "ONGOING",
    },
    {
      label: "Ended",
      key: "ENDED",
    },
  ];

  const menuProps = {
    items,
    onClick: handleDropdownUpdate,
  };

  const columns: TableColumnsType<TRegisteredSemesterData> = [
    {
      title: "Academic Semester",
      dataIndex: "academicSemester",
      render: (value, record) => {
        return (
          <div>
            <p>
              {record.academicSemester.name} {record.academicSemester.year}
            </p>
          </div>
        );
      },
    },
    {
      title: "status",
      dataIndex: "status",
      render: (value) => {
        if (value === "ONGOING") {
          return (
            <Tag
              color="yellow"
              style={{
                fontWeight: "bold",
              }}
            >
              {value}
            </Tag>
          );
        } else if (value === "UPCOMING") {
          return (
            <Tag
              color="blue"
              style={{
                fontWeight: "bold",
              }}
            >
              {value}
            </Tag>
          );
        }
        return (
          <Tag
            color="red"
            style={{
              fontWeight: "bold",
            }}
          >
            {value}
          </Tag>
        );
      },
    },
    {
      title: "Start Month",
      dataIndex: "startMonth",
      render: (value, record) => formatDate(record.startDate),
    },
    {
      title: "End Month",
      dataIndex: "endMonth",
      render: (value, record) => formatDate(record.endDate),
    },
    {
      title: "Actions",
      dataIndex: "",
      render: (record) => {
        return (
          <Dropdown menu={menuProps} trigger={["click"]}>
            <Button type="primary" onClick={() => setSemesterId(record.key)}>
              update
            </Button>
          </Dropdown>
        );
      },
    },
  ];

  const onChange: TableProps<TRegisteredSemesterData>["onChange"] = (
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

export default RegisteredSemester;
