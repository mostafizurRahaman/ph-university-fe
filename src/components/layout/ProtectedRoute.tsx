import { ReactNode } from "react";
import { useAppSelector } from "../../redux/hook";

import { Navigate, useLocation } from "react-router-dom";
import { currentToken } from "../../redux/features/auth/authSlice";

interface IProtectedRouteProps {
   children: ReactNode;
}

const ProtectedRoute = ({ children }: IProtectedRouteProps) => {
   const token = useAppSelector(currentToken);
   const location = useLocation();

   if (!token) {
      return (
         <Navigate
            to="/login"
            state={{ from: location }}
            replace={true}
         ></Navigate>
      );
   }

   return children;
};

export default ProtectedRoute;
