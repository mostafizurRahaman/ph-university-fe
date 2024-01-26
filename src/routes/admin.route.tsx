import AcademicSemester from "../pages/admin/AcademicManagement/AcademicSemester";
import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateAdmin from "../pages/admin/CreateAdmin";
import CreateFaculty from "../pages/admin/CreateFaculty";
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
      name: "Academic Management",
      children: [
         {
            name: "Academic Semester",
            path: "academic-semester",
            element: <AcademicSemester />,
         },
      ],
   },
];
