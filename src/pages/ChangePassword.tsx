/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, Flex } from "antd";
import PHFrom from "../components/form/PHFrom";
import ControllerInput from "../components/form/ControllerInput";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { changePasswordValidationSchema } from "../ValidationSchema/validationSchema";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useChangePasswordMutation } from "../redux/features/auth/authApi";
import { toast } from "sonner";
import { IResponse } from "../types";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hook";
import { logOut } from "../redux/features/auth/authSlice";

const ChangePassword = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  // ** Change Password Mutation **
  const [changePassword] = useChangePasswordMutation();

  //   ** Handle Submit **
  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    const id = toast.loading("Password Changing....");

    try {
      const res = (await changePassword(data)) as IResponse<any>;

      console.log(res);
      if (res.data?.success) {
        toast.success("Password Changed Successfully", { id, duration: 2000 });
        navigate("/login");
        dispatch(logOut());
      } else {
        toast.error(res.error?.data.message, { id, duration: 2000 });
      }
    } catch (err) {
      toast.success("Something went wrong!!!", { id, duration: 2000 });
    }
  };

  return (
    <Flex
      style={{
        width: "100%",
        height: "100dvh",
      }}
      align="center"
      justify="center"
    >
      <Col
        span={12}
        style={{
          background: "white",
          border: "1px solid #ddd",
          borderRadius: "10px",
          padding: "20px",
        }}
      >
        <PHFrom
          onSubmit={handleSubmit}
          resolver={zodResolver(changePasswordValidationSchema)}
        >
          <h2
            style={{
              textTransform: "uppercase",
              paddingBottom: "20px",
            }}
          >
            Change your Password
          </h2>
          <ControllerInput
            type="password"
            name="oldPassword"
            label="Old Password"
            placeholder="Enter Old Password"
          />
          <ControllerInput
            type="password"
            name="newPassword"
            label="Password"
            placeholder="Enter Password"
          />
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </PHFrom>
      </Col>
    </Flex>
  );
};

export default ChangePassword;
