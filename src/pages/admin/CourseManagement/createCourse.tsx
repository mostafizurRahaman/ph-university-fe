import { FieldValues, SubmitHandler } from "react-hook-form";
import PHFrom from "../../../components/form/PHFrom";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import ControllerInput from "../../../components/form/ControllerInput";

import { courseValidationSchema } from "../../../ValidationSchema/validationSchema";
import {
  useAddCourseMutation,
  useGetCoursesQuery,
} from "../../../redux/features/admin/courseManagementApi.api";
import { ICourse, IResponse } from "../../../types";

const CreateCourse = () => {
  const { data: preRequisiteCoursesData, isFetching } = useGetCoursesQuery([
    { name: "limit", value: 0 },
    { name: "sort", value: "code" },
  ]);

  //** Create Course Mutation Hooks **  */
  const [addCourse] = useAddCourseMutation();

  const preRequisiteCourseOptions = preRequisiteCoursesData?.data?.map(
    ({ _id, title }) => ({
      label: title,
      value: _id,
    })
  );

  //  ** onSubmit : **
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading(" Course Creating...");
    console.log(data);

    const preRequisiteCourses = data?.preRequisiteCourses?.map((el: string) => {
      return {
        course: el,
        isDeleted: false,
      };
    });

    const courseData = {
      course: {
        ...data,
        credits: Number(data.credits),
        code: Number(data.code),
        preRequisiteCourses: preRequisiteCourses?.length
          ? preRequisiteCourses
          : [],
      },
    };

    console.log(courseData);

    try {
      const res = (await addCourse(courseData)) as IResponse<ICourse>;

      if (res.error) {
        toast.error(res.error.data.message, { id: toastId, duration: 2000 });

        console.log(res.error);
      } else {
        toast.success("Course Is Created Successfully!!", {
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
          resolver={zodResolver(courseValidationSchema)}
        >
          <ControllerInput
            name="title"
            label="Title"
            type="text"
            placeholder="Enter C. title"
          />
          <ControllerInput
            name="prefix"
            label="Prefix"
            type="text"
            placeholder="Enter C. prefix"
          />
          <ControllerInput
            name="code"
            label="Code"
            type="text"
            placeholder="Enter C. code"
          />
          <ControllerInput
            name="credits"
            label="Credits"
            type="number"
            placeholder="Enter C. credit"
          />
          <PHSelect
            mode="multiple"
            disabled={isFetching}
            name="preRequisiteCourses"
            label="preRequisiteCourses"
            placeholder="Select PreRequisiteCourses"
            options={preRequisiteCourseOptions}
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

export default CreateCourse;
