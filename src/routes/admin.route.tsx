
import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateAdmin from "../pages/admin/CreateAdmin";
import CreateFaculty from "../pages/admin/CreateFaculty";
import CreateOfferedCourse from "../pages/admin/CreateOfferedCourse";
import CreateStudent from "../pages/admin/CreateStudent";
import { IRoutes } from "../types";




export const adminRoutes: IRoutes[] = [
   {
      name: "Admin Dashboard",
      path: "dashboard",
      element: <AdminDashboard />,
   },
   {
      name: "User Management",
      children: [
         {
            name: "Create Admin",
            path: "create-admin",
            element: <CreateAdmin />,
         },
         {
            name: "Create Student",
            path: "create-student",
            element: <CreateStudent />,
         },
         {
            name: "Create Faculty",
            path: "create-faculty",
            element: <CreateFaculty />,
         },
      ],
   },
   {
      name: "Course Management",
      children: [
         {
            name: "Offered Course",
            path: "create-offered-course",
            element: <CreateOfferedCourse />,
         },
      ],
   },
];
