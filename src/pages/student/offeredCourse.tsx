/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, Flex, Row, Spin } from "antd";
import {
  useEnrollCourseMutation,
  useGetMyAllOfferedCourseQuery,
} from "../../redux/features/student/studentManagement.api";
import { IMyCourseWithSection, IOfferedCourse, IResponse } from "../../types";
import { toast } from "sonner";

const OfferedCourse = () => {
  // ** Get All Offered course for Student **
  const { data: myOfferedCourseData, isFetching } =
    useGetMyAllOfferedCourseQuery(undefined);

  //  ** Enrolled Course Mutation  **

  const [enroll] = useEnrollCourseMutation();

  const MyCourses: IMyCourseWithSection = (
    myOfferedCourseData?.data as IOfferedCourse[]
  )?.reduce((acc: IMyCourseWithSection, curr: IOfferedCourse) => {
    const key = curr.course.title;
    acc[key] = acc[key] || { courseTitle: key, sections: [] };

    acc[key].sections.push({
      section: curr.section,
      _id: curr._id,
      days: curr.days,
      startTime: curr.startTime,
      endTime: curr.endTime,
    });

    return acc;
  }, {});

  const handleEnrolledCourse = async (id: string) => {
    const toastId = toast.loading("Course Enrolling......!!");

    const payload = {
      offeredCourse: id,
    };

    try {
      const res = (await enroll(payload)) as IResponse<any>;
      console.log(res);

      if (res.error) {
        toast.error(res.error.data.message, { id: toastId, duration: 2000 });
      } else {
        toast.success("Course Enrolled Successfully!!!", {
          id: toastId,
          duration: 2000,
        });
      }
    } catch (err) {
      toast.error("Something Went Wrong!!", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  if (isFetching) {
    return (
      <Flex
        align="center"
        justify="center"
        style={{
          height: "100dvh",
          width: "100%",
        }}
      >
        <Spin></Spin>
      </Flex>
    );
  }

  return (
    <div>
      {Object.values(MyCourses ? MyCourses : {})?.map((course, id) => {
        return (
          <Row
            key={id}
            style={{
              border: "1px solid #d4d4d4",
              borderRadius: "5px",
              marginTop: "20px",
            }}
          >
            <Col span={24}>
              <div
                style={{
                  padding: "7px 15px",
                  background: "#d4d4d4",
                }}
              >
                <h3
                  style={{
                    textTransform: "capitalize",
                  }}
                >
                  {course.courseTitle}
                </h3>
              </div>
              <div>
                {course?.sections?.map((section, idx) => {
                  return (
                    <Row
                      key={idx}
                      style={{
                        borderTop: "1px solid #d4d4d4",
                        padding: "5px",
                        textTransform: "capitalize",
                      }}
                    >
                      <Col span={4}>section: {section.section}</Col>
                      <Col span={4}>
                        <Flex align="center" gap={2}>
                          days:{" "}
                          {section?.days.map((day: string) => (
                            <span key={day}>{day}</span>
                          ))}
                        </Flex>
                      </Col>
                      <Col span={4}> start Time : ${section.startTime}</Col>
                      <Col span={4}> end Time : ${section.endTime}</Col>
                      <Col span={8}>
                        <Button
                          onClick={() => handleEnrolledCourse(section._id)}
                          type="default"
                          style={{
                            display: "block",
                            marginLeft: "auto",
                          }}
                        >
                          Enroll
                        </Button>
                      </Col>
                    </Row>
                  );
                })}
              </div>
            </Col>
          </Row>
        );
      })}
    </div>
  );
};

export default OfferedCourse;
