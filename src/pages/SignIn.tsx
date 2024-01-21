// ** import third party packages:
import { Button, Spin } from "antd";
import { useForm } from "react-hook-form";

// ** import state management:
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";

const SignIn = () => {
   // ** import app state management hooks:
   // const { user, token } = useAppSelector((state) => state.auth);
   const dispatch = useAppDispatch();

   // ** destructure useForm():
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({
      defaultValues: {
         id: "A-0001",
         password: "admin123",
      },
   });

   // *call the useLoginMutation();

   const [loginHandler, { error, isLoading }] = useLoginMutation();

   // ** create a SubmitHandlerFunction:
   const onSubmit = async (data) => {
      const res = await loginHandler(data).unwrap();
      const token = res.data.accessToken;
      const user = verifyToken(token);
      console.log(user);
      dispatch(setUser({ user, token }));
   };

   if (isLoading) {
      return <Spin></Spin>;
   }
   return (
      <form
         onSubmit={handleSubmit(onSubmit)}
         style={{ display: "flex", flexDirection: "column", gap: "20px" }}
      >
         <div>
            <label htmlFor="id">Name</label>
            <input
               type="text"
               id="id"
               placeholder="Enter your ID"
               {...register("id")}
            />
            {errors.id?.message && <p>{errors?.id?.message as string}</p>}
         </div>
         <div>
            <label htmlFor="password">password</label>
            <input
               type="password"
               id="password"
               placeholder="Enter your password"
               {...register("password")}
            />
            {errors.id?.message && <p>{errors?.id?.message as string}</p>}
         </div>
         <Button htmlType="submit">Submit</Button>
      </form>
   );
};

export default SignIn;
