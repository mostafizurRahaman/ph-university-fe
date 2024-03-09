// ** import third party packages:
import { Row, Spin } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";

// ** import state management:
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hook";
import { IUser, setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHFrom from "../components/form/PHFrom";
import ControllerInput from "../components/form/ControllerInput";

const LogIn = () => {
   const dispatch = useAppDispatch();

   const location = useLocation();

   const navigate = useNavigate();

   // *call the useLoginMutation();
   const [loginHandler, { isLoading }] = useLoginMutation();

   // ** create a SubmitHandlerFunction:
   const onSubmit: SubmitHandler<FieldValues> = async (data: FieldValues) => {
      console.log(data);
      const toastId = toast.loading("Logging in...");
      try {
         const res = await loginHandler(data).unwrap();
         const token = res.data.accessToken;
         const user = verifyToken(token) as IUser;
         dispatch(setUser({ user, token }));

         toast.success("Logged In Successfully", {
            id: toastId,
            duration: 2000,
         });

         if (token) {
            const from = location?.state?.from?.pathname.startsWith(
               `/${user.role}`
            )
               ? location?.state?.from?.pathname
               : `/${user.role}/dashboard`;
            navigate(from, { replace: true });
         }
      } catch (err) {
         toast.error("Something went Wrong!!!", {
            id: toastId,
            duration: 2000,
         });
      }
   };

   if (isLoading) {
      return <div style={{ 
         width: "100%", 
         height: "100dvh", 
         position: "absolute", 
         top: 0, 
         left: 0,
         display: "flex", 
         alignItems: "center", 
         justifyContent: "center",
      }}>
          <Spin size="large"/>
      </div>
   }
   return (
      <Row
         justify="center"
         align="middle"
         style={{
            height: "100vh",
            gap: "20px",
            display: "flex",
            flexDirection: "column",
         }}
      >
         <PHFrom
            onSubmit={onSubmit}
            defaultValues={{ id: "A-0001", password: "admin123" }}
         >
            <h1>Please login Now: </h1>
            <ControllerInput
               name="id"
               type="text"
               label="User Name"
               placeholder="your username"
            />
            <ControllerInput
               name="password"
               type="password"
               label="Password"
               placeholder="your password"
            />
            <button
               style={{
                  padding: "8px 16px",
                  background: "#000",
                  color: "white",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: "500",
                  display: "block",
                  marginTop: "20px",
                  width: "100%",
               }}
            >
               Submit
            </button>
         </PHFrom>
      </Row>
   );
};

export default LogIn;
