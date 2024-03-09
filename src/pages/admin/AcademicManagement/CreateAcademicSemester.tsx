import { FieldValues, SubmitHandler } from "react-hook-form";
import PHFrom from "../../../components/form/PHFrom";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { semesterOptions } from "../../../constants/semester";
import { monthOptions } from "../../../constants/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { AcademicSemesterValidationSchema } from "../../../ValidationSchema/validationSchema";

import { toast } from "sonner";
import { useAddAcademicSemesterMutation } from "../../../redux/features/admin/academicManagement";
import { IAacademicSemester, IResponse } from "../../../types";

const currentYear = new Date().getFullYear();
console.log(currentYear);
const yearOptions = [...Array(5).keys()].map((number) => ({
  value: String(currentYear + number),
  label: String(currentYear + number),
}));

const CreateAcademicSemester = () => {
  //  ** Academic Semester Post Mutation :
  const [addAcademicSemester] = useAddAcademicSemesterMutation();

  //  ** onSubmit : **
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const name = semesterOptions[Number(data?.name) - 1]?.label;
    const newSemester = {
      ...data,
      name,
      code: data?.name,
      year: data?.year,
    };

    const toastId = toast.loading(" Academic Semester Creating...");

    try {
      const res = (await addAcademicSemester(
        newSemester
      )) as IResponse<IAacademicSemester>;

      if (res.error) {
        toast.error(res.error.data.message, { id: toastId, duration: 2000 });
      } else {
        toast.success("Academic Semester Created Successfully!!", {
          id: toastId,
          duration: 2000,
        });
      }
    } catch (err) {
      toast.error("Something Went Wrong!!", { id: toastId, duration: 2000 });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHFrom
          onSubmit={onSubmit}
          resolver={zodResolver(AcademicSemesterValidationSchema)}
        >
          <PHSelect
            name="name"
            label="Name"
            placeholder="Select Semester"
            options={semesterOptions}
          ></PHSelect>
          <PHSelect
            name="year"
            label="Year"
            placeholder="Select Year"
            options={yearOptions}
          ></PHSelect>
          <PHSelect
            name="startMonth"
            label="Start Month"
            placeholder="Select startMonth"
            options={monthOptions}
          ></PHSelect>
          <PHSelect
            name="endMonth"
            label="End Month"
            placeholder="Select endMonth"
            options={monthOptions}
          ></PHSelect>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              margin: "0px auto",
              marginTop: "20px",
            }}
          >
            Submit
          </Button>
        </PHFrom>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
