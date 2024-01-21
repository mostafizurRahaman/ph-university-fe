import OfferedCourse from "../pages/student/offeredCourse";
import StudentDashboard from "../pages/student/studentDashboard";

const studentRoutes  = [
   {
      name: "Dashboard",
      path: "dashboard",
      element: <StudentDashboard />,
   },
   {
      name: "Offered Course",
      path: "offered-course",
      element: <OfferedCourse />,
   },
];



export default studentRoutes; 