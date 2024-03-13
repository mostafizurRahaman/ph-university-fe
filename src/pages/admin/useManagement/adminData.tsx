import {
  Button,
  Pagination,
  Space,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import {
  useChangeUserStatusMutation,
  useDeleteSingleAdminMutation,
  useGetAdminsQuery,
} from "../../../redux/features/admin/userManagement.api";
import { useState } from "react";
import { IAdmin, IFilter, IResponse } from "../../../types";
import { useNavigate } from "react-router-dom";
import PHConfirmationModal from "../../../components/modals/PhConfirmationModal";
import { toast } from "sonner";

type TTableDataType = Pick<
  IAdmin,
  "name"   | 'user'| "designation" | "managementDepartment" | "id" | "email" | "contactNo"
> & {
  key: string;
};

const AdminData = () => {
  const [params, setParams] = useState<IFilter[]>([]);
  const [page, setPage] = useState<number>(1);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string>("");
  const navigate = useNavigate();

  //  **  Student Update Mutation **
  const [changeStatus] = useChangeUserStatusMutation();

  //  ** Student Delete Mutation ***
  const [deleteAdmin] = useDeleteSingleAdminMutation();

  //  ** Load Student Data  By Student getQuery Call **
  const { data: adminData, isFetching } = useGetAdminsQuery([
    { name: "page", value: page },
    { name: "sort", value: "id" },
    ...params,
  ]);

  console.log(selectedId);

  const metaData = adminData?.meta;
  console.log(adminData);
  //** Table Data  */
  const tableData = adminData?.data?.map(
    ({
      _id,
      name,
      id,
      email,
      contactNo,
      managementDepartment,
      designation,
      user,
    }) => ({
      key: _id,
      name,
      id,
      user,
      email,
      managementDepartment,
      designation,
      contactNo,
    })
  ) as TTableDataType[];

  const columns: TableColumnsType<TTableDataType> = [
    {
      title: "Name",
      dataIndex: "name",
      render: (value, record) => {
        const { firstName, lastName, middleName } = record.name;
        return (
          <div>
            <p>{firstName + " " + middleName + " " + lastName}</p>
          </div>
        );
      },
      ellipsis: true,
    },
    {
      title: "Admin ID",
      dataIndex: "id",
    },
    {
      title: "Designation",
      dataIndex: "designation",
    },
    {
      title: "M. Department",
      dataIndex: "managementDepartment",
    },
    {
      title: "Email",
      dataIndex: "email",
      ellipsis: true,
    },
    {
      title: "Contact No",
      dataIndex: "contactNo",
    },
    {
      title: "Actions",
      dataIndex: "",
      render: (_value, record) => {
        return (
          <Space>
            <Button onClick={() => handleDelete(record.key)}>Delete</Button>
            <Button
              onClick={() => {
                navigate(`/admin/admin-details/${record?.key}`);
              }}
            >
              Details
            </Button>
            <Button
              onClick={() => {
                setOpen(true);
                setSelectedId(record.user);
              }}
            >
              Block
            </Button>
          </Space>
        );
      },
    },
  ];

  const onChange: TableProps<TTableDataType>["onChange"] = (
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

  //  ** Handle Block  **
  const handleBlock = async () => {
    // const toastId = toast.loading("blocking....");
    const toastId = toast.loading(selectedId);

    try {
      const res = (await changeStatus({
        data: { status: "blocked" },
        id: selectedId,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      })) as IResponse<any>;

      console.log("Error", res);

      if (res.error) {
        toast.error(res.error.data.message, { id: toastId, duration: 2000 });
      } else {
        toast.success("Admin Blocked successfully!!!", {
          id: toastId,
          duration: 2000,
        });
      }
    } catch (err) {
      toast.error("Something Went Wrong!!!", { id: toastId, duration: 2000 });
    }
    setSelectedId("");
    setOpen(false);
  };

  const handleDelete = async (id: string) => {
    const toastId = toast.loading("Deleting.......");

    try {
      const res = (await deleteAdmin(id)) as IResponse<IAdmin>;

      console.log("Error", res);

      if (res.error) {
        toast.error(res.error.data.message, { id: toastId, duration: 2000 });
      } else {
        toast.success("Admin Deleted successfully!!!", {
          id: toastId,
          duration: 2000,
        });
      }
    } catch (err) {
      toast.error("Something Went Wrong!!!", { id: toastId, duration: 2000 });
    }
  };

  return (
    <>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        pagination={false}
        scroll={{ x: 1200 }}
      />
      <div
        style={{
          padding: "10px 20px",
          borderRadius: "10px",
          border: "1px  solid #ddd",
          marginTop: "10px",
          display: "inline-block",
          background: "white",
        }}
      >
        <Pagination
          current={page}
          onChange={(value) => setPage(value)}
          pageSize={metaData?.limit}
          total={metaData?.total}
        />
      </div>

      {selectedId && open && (
        <PHConfirmationModal
          open={open}
          setOpen={setOpen}
          handleOk={handleBlock}
          title="Are You Sure ?  "
        >
          <p style={{ fontSize: "14px", fontWeight: 500 }}>
            You want to delete the Admin?
          </p>
        </PHConfirmationModal>
      )}
    </>
  );
};

export default AdminData;
