import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";

import { Navigate, useLocation } from "react-router-dom";
import {
  IUser,
  currentToken,
  logOut,
} from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";

interface IProtectedRouteProps {
  children: ReactNode;
  role: string | undefined;
}

const ProtectedRoute = ({ children, role }: IProtectedRouteProps) => {
  const token = useAppSelector(currentToken);
  const dispatch = useAppDispatch();
  const location = useLocation();
  let user;
  if (token) {
    user = verifyToken(token) as IUser;
  }

  if (user?.role !== role) {
    dispatch(logOut());
    return (
      <Navigate
        to="/login"
        state={{ from: location }}
        replace={true}
      ></Navigate>
    );
  }

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
