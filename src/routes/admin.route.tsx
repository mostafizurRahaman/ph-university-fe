import AcademicDepartment from "../pages/admin/AcademicManagement/AcademicDepartment";
import AcademicFaculty from "../pages/admin/AcademicManagement/AcademicFaculty";
import AcademicSemester from "../pages/admin/AcademicManagement/AcademicSemester";
import CreateAcademicDepartment from "../pages/admin/AcademicManagement/CreateAcademicDepartment";
import CreateAcademicFaculty from "../pages/admin/AcademicManagement/CreateAcademicFaculty";
import CreateAcademicSemester from "../pages/admin/AcademicManagement/CreateAcademicSemester";
import Courses from "../pages/admin/CourseManagement/courses";
import CreateCourse from "../pages/admin/CourseManagement/createCourse";
import OfferCourse from "../pages/admin/CourseManagement/offerCourse";
import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateAdmin from "../pages/admin/useManagement/CreateAdmin";
import CreateFaculty from "../pages/admin/useManagement/CreateFaculty";
import CreateStudent from "../pages/admin/useManagement/CreateStudent";
import FacultyData from "../pages/admin/useManagement/FacultyData";
import FacultyDetails from "../pages/admin/useManagement/FacultyDetails";
import StudentDetails from "../pages/admin/useManagement/StudentDetails";
import AdminData from "../pages/admin/useManagement/adminData";
import AdminDetails from "../pages/admin/useManagement/adminDetails";
import StudentData from "../pages/admin/useManagement/studentData";
import OfferedCourse from "../pages/faculty/OfferedCourse";
import { IRoutes } from "../types";
import SemesterRegistration from "../pages/admin/CourseManagement/semesterRegistration";
import RegisteredSemester from "../pages/admin/CourseManagement/RegisteredSemester";

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
        name: "Create Student",
        path: "create-student",
        element: <CreateStudent />,
      },
      {
        name: "Students",
        path: "student-data",
        element: <StudentData />,
      },
      {
        name: "",
        path: "student-details/:studentId",
        element: <StudentDetails />,
      },
      {
        name: "Create Faculty",
        path: "create-faculty",
        element: <CreateFaculty />,
      },
      {
        name: "faculties",
        path: "faculty-data",
        element: <FacultyData />,
      },
      {
        name: "",
        path: "faculty-details/:facultyId",
        element: <FacultyDetails />,
      },

      {
        name: "Create Admin",
        path: "create-admin",
        element: <CreateAdmin />,
      },
      {
        name: "admins",
        path: "admin-data",
        element: <AdminData />,
      },
      {
        name: "",
        path: "admin-details/:adminId",
        element: <AdminDetails />,
      },
    ],
  },
  {
    name: "Academic Management",
    children: [
      {
        name: "create A. Semester",
        path: "create-academic-semester",
        element: <CreateAcademicSemester />,
      },
      {
        name: "Academic Semester",
        path: "academic-semester",
        element: <AcademicSemester />,
      },
      {
        name: "Create A. Faculty",
        path: "create-academic-faculty",
        element: <CreateAcademicFaculty />,
      },
      {
        name: "Academic Faculty",
        path: "academic-faculty",
        element: <AcademicFaculty />,
      },
      {
        name: "Create A. Department",
        path: "create-academic-department",
        element: <CreateAcademicDepartment />,
      },
      {
        name: "Academic Department",
        path: "academic-department",
        element: <AcademicDepartment />,
      },
    ],
  },
  {
    name: "Course Management",
    children: [
      {
        name: "Semester Registration",
        path: "semester-registration",
        element: <SemesterRegistration />,
      },
      {
        name: "Registered Semester",
        path: "registered-semester",
        element: <RegisteredSemester />,
      },
      {
        name: "Create Course",
        path: "create-course",
        element: <CreateCourse />,
      },
      {
        name: "Courses",
        path: "courses",
        element: <Courses />,
      },
      {
        name: "Offer Course",
        path: "offer-course",
        element: <OfferCourse />,
      },
      {
        name: "Offered Courses",
        path: "offered-courses",
        element: <OfferedCourse />,
      },
    ],
  },
];
