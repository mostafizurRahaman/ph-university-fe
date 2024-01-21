import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import { routesGenerator } from "../utils/routesGenerator";
import { adminRoutes } from "./admin.route";
import facultyRoutes from "./facultyRoutes";
import studentRoutes from "./student.routes";

const router = createBrowserRouter([
   {
      path: "/",
      element: <App />,
      children: [
         {
            index: true,
            element: <Home />,
         },
         {
            path: "login",
            element: <SignIn />,
         },
      ],
   },
   {
      path: "/admin",
      element: <App />,
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
