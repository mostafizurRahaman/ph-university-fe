import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LogIn from "../pages/LogIn";
import { routesGenerator } from "../utils/routesGenerator";
import { adminRoutes } from "./admin.route";
import facultyRoutes from "./facultyRoutes";
import studentRoutes from "./student.routes";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import ChangePassword from "../pages/ChangePassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute role={undefined}>
        <App />
      </ProtectedRoute>
    ),
  },
  {
    path: "login",
    element: <LogIn />,
  },
  {
    path: "/change-password",
    element: <ChangePassword />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute role="admin">
        <App />
      </ProtectedRoute>
    ),
    children: routesGenerator(adminRoutes), // ** Route Generator gets an array of route info object:
  },
  {
    path: "/faculty",
    element: (
      <ProtectedRoute role="faculty">
        <App />
      </ProtectedRoute>
    ),
    children: routesGenerator(facultyRoutes),
  },
  {
    path: "/student",
    element: (
      <ProtectedRoute role="student">
        <App />
      </ProtectedRoute>
    ),
    children: routesGenerator(studentRoutes),
  },
]);

export default router;
