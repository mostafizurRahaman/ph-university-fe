import { FieldValues, SubmitHandler } from "react-hook-form";
import PHFrom from "../../../components/form/PHFrom";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";

import { semesterRegistrationStatusOptions } from "../../../constants/global";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";
import { useGetAcademicSemesterQuery } from "../../../redux/features/admin/academicManagement.api";
import PHDatePicker from "../../../components/form/PHDatePicker";
import ControllerInput from "../../../components/form/ControllerInput";
import { IResponse } from "../../../types";
import { ISemesterRegistration } from "../../../types/semesterRegistration";
import { semesterRegistrationValidationSchema } from "../../../ValidationSchema/validationSchema";
import { useAddSemesterRegistrationMutation } from "../../../redux/features/admin/courseManagementApi.api";

const SemesterRegistration = () => {
  //  ** Get Academic Semester: **
  const {
    data: acSemesterData,
    isLoading,
    isFetching,
  } = useGetAcademicSemesterQuery([
    {
      name: "sort",
      value: "year",
    },
    {
      name: "limit",
      value: 0,
    },
  ]);

  //  ** Add Semester Registration Mutation ** :
  const [addSemesterRegistration] = useAddSemesterRegistrationMutation();

  const academicSemesterOptions = acSemesterData?.data?.map((el) => {
    return {
      label: `${el.name} ${el.year}`,
      value: el._id,
    };
  });

  //  ** onSubmit : **
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading(" Academic Semester Creating...");

    const semesterRegistration = {
      ...data,
      minCredit: Number(data.minCredit),
      maxCredit: Number(data.maxCredit),
    };
    try {
      const res = (await addSemesterRegistration(
        semesterRegistration
      )) as IResponse<ISemesterRegistration>;

      if (res.error) {
        toast.error(res.error.data.message, { id: toastId, duration: 2000 });
      } else {
        toast.success("Semester Registration Is Created Successfully!!", {
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
          resolver={zodResolver(semesterRegistrationValidationSchema)}
        >
          <PHSelect
            name="academicSemester"
            label="Academic Semester"
            disabled={isLoading || isFetching}
            placeholder="Select Semester"
            options={academicSemesterOptions}
          ></PHSelect>
          <PHSelect
            name="status"
            label="status"
            placeholder="Select Status"
            options={semesterRegistrationStatusOptions}
          ></PHSelect>

          <PHDatePicker label="StartDate" name="startDate" />
          <PHDatePicker label="endDate" name="endDate" />
          <ControllerInput
            name="minCredit"
            label="Min. Credit"
            type="number"
            placeholder="Enter Min. Credit"
          />
          <ControllerInput
            name="maxCredit"
            label="Max. Credit"
            type="number"
            placeholder="Enter Max. Credit"
          />
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

export default SemesterRegistration;
