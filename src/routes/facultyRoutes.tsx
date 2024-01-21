import FacultyDashboard from "../pages/faculty/FacultyDashboard";
import OfferedCourse from "../pages/faculty/OfferedCourse";

const facultyRoutes = [
   {
      name: "Dashboard",
      path: "dashboard",
      element: <FacultyDashboard />,
   },
   {
      name: "Offered Course",
      path: "offered-course",
      element: <OfferedCourse />,
   },
];

export default facultyRoutes;
