import { Button, Col, Flex } from "antd";
import PHFrom from "../../../components/form/PHFrom";
import { zodResolver } from "@hookform/resolvers/zod";
import { AcademicDepartmentValidationSchema } from "../../../ValidationSchema/validationSchema";
import ControllerInput from "../../../components/form/ControllerInput";
import PHSelect, { IOption } from "../../../components/form/PHSelect";
import { FieldValues, SubmitHandler } from "react-hook-form";
import {
  useAddAcademicDepartmentMutation,
  useGetAllAcademicFacultyQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { IResponse, TAcademicDepartment } from "../../../types";

const CreateAcademicDepartment = () => {
  //  ** Import Academic Faculties : **
  const { data: academicFaculties } = useGetAllAcademicFacultyQuery(undefined);

  // ** Mutation of Academic Department Creation: **

  const [addAcademicDepartment] = useAddAcademicDepartmentMutation();

  const academicFacultyOptions = academicFaculties?.data?.map(
    ({ name, _id }) => {
      return {
        value: _id,
        label: name,
      };
    }
  ) as IOption[];

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Academic Department Creating....!!");

    try {
      const res = (await addAcademicDepartment(
        data
      )) as IResponse<TAcademicDepartment>;

      if (res.error) {
        toast.error(res.error.data.message, { id: toastId, duration: 2000 });
      } else {
        toast.success("Academic Department Created Successfully", {
          id: toastId,
          duration: 2000,
        });
      }
    } catch (err) {
      toast.error("Something Went Wong", {
        id: toastId,
        duration: 2000,
      });
    }
  };
  return (
    <Flex align="center" justify="center">
      <Col span={6}>
        <PHFrom
          onSubmit={onSubmit}
          resolver={zodResolver(AcademicDepartmentValidationSchema)}
        >
          <ControllerInput
            name="name"
            type="text"
            label="Academic Department Name"
          />
          <PHSelect
            label="Academic Faculty"
            name="academicFaculty"
            options={academicFacultyOptions}
          ></PHSelect>
          <Button type="primary" htmlType="submit">
            submit
          </Button>
        </PHFrom>
      </Col>
    </Flex>
  );
};

export default CreateAcademicDepartment;
