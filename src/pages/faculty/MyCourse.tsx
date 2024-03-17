import { Button, Col, Row } from "antd";
import { useGetFacultyEnrolledCourseQuery } from "../../redux/features/faculty/facultyMangement.api";
import PHFrom from "../../components/form/PHFrom";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHSelect from "../../components/form/PHSelect";
import { TEnrolledCourses } from "../../types";
import { useNavigate } from "react-router-dom";

const MyCourse = () => {
  const navigate = useNavigate();

  const { data: facultySemesterRegistration, isFetching } =
    useGetFacultyEnrolledCourseQuery(undefined);

  // console.log(facultySemesterRegistration?.data?.length)

  //  ** Faculty semester Registration **
  const semesterRegistrationOptions = facultySemesterRegistration?.data?.map(
    (item: TEnrolledCourses) => {
      return {
        label: `${item.academicSemester.name} ${item.academicSemester.year}`,
        value: item.semesterRegistration._id,
      };
    }
  );

  // ** Faculty Course Options**
  const courseOptions = facultySemesterRegistration?.data?.map(
    (item: TEnrolledCourses) => {
      return {
        label: item.course.title,
        value: item.course._id,
      };
    }
  );

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    navigate(`/faculty/my-students/${data.semester}/${data.course}`);
  };

  return (
    <Row justify="center">
      <Col span={6}>
        <PHFrom onSubmit={onSubmit}>
          <PHSelect
            name="semester"
            label="Semester"
            options={semesterRegistrationOptions}
            disabled={isFetching}
          />
          <PHSelect
            name="course"
            label="Course"
            options={courseOptions}
            disabled={isFetching}
          />
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </PHFrom>
      </Col>
    </Row>
  );
};

export default MyCourse;
