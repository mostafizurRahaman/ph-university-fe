import { Col, Flex, Row } from "antd";
import { useGetAllEnrolledCourseQuery } from "../../redux/features/student/studentManagement.api";
import { TEnrolledCourses } from "../../types";

const MySchedule = () => {
  const { data, isFetching } = useGetAllEnrolledCourseQuery(undefined);

  console.log(data);
  return (
    <Row
      style={{
        gap: "20px",
      }}
    >
      {data?.data?.map((enrolledCourse) => {
        return (
          <Col
            span={8}
            style={{
              background: "#fff",
              padding: "10px",
              border: "1px solid #d4d4d4",
              borderRadius: "10px",
            }}
            key={enrolledCourse._id}
          >
            <EnrolledCourseCard
              enrolledCourse={enrolledCourse}
            ></EnrolledCourseCard>
          </Col>
        );
      })}
    </Row>
  );
};

export default MySchedule;

const EnrolledCourseCard = ({
  enrolledCourse,
}: {
  enrolledCourse: TEnrolledCourses;
}) => {
  const {
    course,
    offeredCourse,
    // academicFaculty,
    // academicDepartment,
    // academicSemester,
    // courseMarks,
    faculty,
  } = enrolledCourse;

  const { firstName, lastName, middleName } = faculty.name;
  return (
    <div>
      <div>
        <h2>
          {course.title} - {course.code}
        </h2>
      </div>
      <div>
        <div>
          <Flex
            vertical
            gap={5}
            style={{
              fontWeight: "500",
            }}
          >
            <div>
              Days:{" "}
              {offeredCourse.days.map((item, idx) => (
                <span key={item}>
                  {" "}
                  {item}
                  {offeredCourse.days[idx + 1] && ","}{" "}
                </span>
              ))}
            </div>
            <span>Section : {offeredCourse.section}</span>
            <span>
              Duration : {offeredCourse.startTime} to {offeredCourse.endTime}
            </span>
            <span>
              Faculty :{" "}
              {firstName +
                (middleName ? " " + middleName + " " : " ") +
                lastName}
            </span>
          </Flex>
        </div>
      </div>
    </div>
  );
};
