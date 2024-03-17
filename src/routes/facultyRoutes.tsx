import FacultyDashboard from "../pages/faculty/FacultyDashboard";
import MyCourse from "../pages/faculty/MyCourse";
import MyStudents from "../pages/faculty/MyStudents";

const facultyRoutes = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <FacultyDashboard />,
  },
  {
    name: "My Courses",
    path: "my-course",
    element: <MyCourse />,
  },
  {
    name: "",
    path: "my-students/:semesterRegistrationId/:courseId",
    element: <MyStudents />,
  },
];

export default facultyRoutes;
