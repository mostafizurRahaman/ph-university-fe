import { FieldValues, SubmitHandler } from "react-hook-form";
import PHFrom from "../../../components/form/PHFrom";
import { Button, Col, Flex } from "antd";
import { AcademicFacultyValidationSchema } from "../../../ValidationSchema/validationSchema";
import ControllerInput from "../../../components/form/ControllerInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddAcademicFacultyMutation } from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { IAcademicFaculty, IResponse } from "../../../types";

const CreateAcademicFaculty = () => {
  const [addAcademicFaculty] = useAddAcademicFacultyMutation();

  //   ** OnSubmit **
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Academic faculty Creating....");

    try {
      const res = (await addAcademicFaculty(
        data
      )) as IResponse<IAcademicFaculty>;

      if (res.error) {
        toast.error(res.error.data.message, { id: toastId, duration: 2000 });
      } else {
        toast.success("Academic Faculty Created Successfully!!!", {
          id: toastId,
          duration: 2000,
        });
      }
    } catch (err) {
      toast.error("Something Went Wrong", { id: toastId, duration: 2000 });
    }
  };
  return (
    <div>
      <Flex align="center" justify="center">
        <Col span={6}>
          <PHFrom
            onSubmit={onSubmit}
            resolver={zodResolver(AcademicFacultyValidationSchema)}
          >
            <ControllerInput name="name" type="text" label="Name" />
            <Button
              type="primary"
              style={{
                margin: "0px auto",
              }}
              htmlType="submit"
            >
              Submit
            </Button>
          </PHFrom>
        </Col>
      </Flex>
    </div>
  );
};

export default CreateAcademicFaculty;
