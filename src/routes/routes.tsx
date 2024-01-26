import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import LogIn from "../pages/LogIn";
import { routesGenerator } from "../utils/routesGenerator";
import { adminRoutes } from "./admin.route";
import facultyRoutes from "./facultyRoutes";
import studentRoutes from "./student.routes";
import ProtectedRoute from "../components/layout/ProtectedRoute";

const router = createBrowserRouter([
   {
      path: "/",
      element: <App />,
      children: [
         {
            index: true,
            element: <Home />,
         },
      ],
   },
   {
      path: "login",
      element: <LogIn />,
   },
   {
      path: "/admin",
      element: (
         <ProtectedRoute>
            <App />
         </ProtectedRoute>
      ),
      children: routesGenerator(adminRoutes), // ** Route Generator gets an array of route info object:
   },
   {
      path: "/faculty",
      element: <App />,
      children: routesGenerator(facultyRoutes),
   },
   {
      path: "/student",
      element: <App />,
      children: routesGenerator(studentRoutes),
   },
]);

export default router;
