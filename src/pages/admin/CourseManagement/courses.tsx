/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { ICourse, IFilter, IResponse } from "../../../types";
import { Button, Flex, Modal, Table, TableColumnsType, TableProps } from "antd";
import {
  useAssignCourseFacultiesMutation,
  useGetCourseFacultiesQuery,
  useGetCoursesQuery,
  useRemoveCourseFacultiesMutation,
} from "../../../redux/features/admin/courseManagementApi.api";
import PHFrom from "../../../components/form/PHFrom";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHSelect from "../../../components/form/PHSelect";
import { useGetFacultiesQuery } from "../../../redux/features/admin/userManagement.api";
import { toast } from "sonner";

type TTableData = Pick<ICourse, "code" | "title"> & {
  key: string;
};
const Courses = () => {
  const [params, setParams] = useState<IFilter[]>([]);

  // ** Load Data from redux hooks **
  const { data, isFetching } = useGetCoursesQuery([
    {
      name: "sort",
      value: "code",
    },
    ...params,
  ]);

  const tableData = data?.data?.map(({ _id, title, code }) => ({
    key: _id,
    title,
    code,
  }));

  const columns: TableColumnsType<TTableData> = [
    {
      title: "title",
      dataIndex: "title",
    },
    {
      title: "Code",
      dataIndex: "code",
    },

    {
      title: "Actions",
      dataIndex: "key",
      render: (_value, record) => {
        return (
          <Flex align="center" gap={12}>
            <AssignFacuyltyModal item={record.key} />
            <RemoveFacultiesModal item={record.key} />
          </Flex>
        );
      },
      width: "40%",
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
    ></Table>
  );
};

export default Courses;

const AssignFacuyltyModal = ({ item }: { item: string }) => {
  const [showModal, setShowModal] = useState(false);

  const { data: facultiesData, isFetching } = useGetFacultiesQuery([
    {
      name: "limit",
      value: 0,
    },
  ]);

  // ** Assign faculties mutation ** :
  const [assignFaculties] = useAssignCourseFacultiesMutation();

  const facultiesOptions = facultiesData?.data?.map(
    ({ name: { firstName, lastName, middleName }, _id }) => {
      return {
        label: `${firstName.toUpperCase()}${
          middleName ? " " + middleName?.toUpperCase() + " " : " "
        }${lastName.toUpperCase()}`,
        value: _id,
      };
    }
  );
  const handleOk = () => {};

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Faculties Assigning...");

    const payload = {
      id: item,
      data,
    };

    try {
      const res = (await assignFaculties(payload)) as IResponse<any>;

      if (res.error) {
        toast.error(res.error.data.message, { id: toastId, duration: 2000 });
      } else {
        toast.error("Faculties Assigned Successfully!!!", {
          id: toastId,
          duration: 2000,
        });
      }
    } catch (err) {
      toast.error("Something Went Wrong!!!", { id: toastId, duration: 2000 });
    }
    setShowModal(false);
  };

  return (
    <React.Fragment>
      <Button onClick={() => setShowModal(true)}>Assign Faculties</Button>
      <Modal
        title="Assign Faculty"
        open={showModal}
        onOk={handleOk}
        onCancel={() => setShowModal((prev) => !prev)}
        footer={null}
      >
        <PHFrom onSubmit={handleSubmit} defaultValues={{}}>
          <PHSelect
            name="faculties"
            mode="multiple"
            disabled={isFetching}
            options={facultiesOptions}
            label="Faculties"
          />
          <Button
            type="primary"
            style={{
              marginLeft: "auto",
              display: "block",
            }}
            htmlType="submit"
          >
            Assign Faculties
          </Button>
        </PHFrom>
      </Modal>
    </React.Fragment>
  );
};
const RemoveFacultiesModal = ({ item }: { item: string }) => {
  const [showModal, setShowModal] = useState(false);

  // ** Assign faculties mutation ** :
  const [removeFaculties] = useRemoveCourseFacultiesMutation();

  const { data: courseFaculties, isFetching } =
    useGetCourseFacultiesQuery(item);

  console.log(courseFaculties);
  const courseOptions = courseFaculties?.data?.faculties?.map(
    ({ name: { firstName, middleName, lastName }, _id }) => {
      return {
        label: `${firstName.toUpperCase()}${
          middleName ? " " + middleName?.toUpperCase() + " " : " "
        }${lastName.toUpperCase()}`,
        value: _id,
      };
    }
  );

  const handleOk = () => {};

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Faculties Removing...");

    const payload = {
      id: item,
      data,
    };

    try {
      const res = (await removeFaculties(payload)) as IResponse<any>;

      if (res.error) {
        toast.error(res.error.data.message, { id: toastId, duration: 2000 });
      } else {
        toast.error("Faculties Removed Successfully!!!", {
          id: toastId,
          duration: 2000,
        });
      }
    } catch (err) {
      toast.error("Something Went Wrong!!!", { id: toastId, duration: 2000 });
    }
    setShowModal(false);
  };

  return (
    <React.Fragment>
      <Button onClick={() => setShowModal(true)}>Remove Faculties</Button>
      <Modal
        title="Remove Faculty"
        open={showModal}
        onOk={handleOk}
        onCancel={() => setShowModal((prev) => !prev)}
        footer={null}
      >
        <PHFrom onSubmit={handleSubmit}>
          <PHSelect
            name="faculties"
            mode="multiple"
            disabled={isFetching}
            options={courseOptions}
            label="Faculties"
          />
          <Button
            type="primary"
            style={{
              marginLeft: "auto",
              display: "block",
            }}
            htmlType="submit"
          >
            remove Faculties
          </Button>
        </PHFrom>
      </Modal>
    </React.Fragment>
  );
};
