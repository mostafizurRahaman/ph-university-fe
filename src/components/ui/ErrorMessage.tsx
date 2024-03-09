import { Flex } from "antd";
import { ReactNode } from "react";
import { MdError } from "react-icons/md";
interface IErrorMessage {
  children: ReactNode;
}

const ErrorMessage = ({ children }: IErrorMessage) => {
  return (
    <Flex
      style={{
        color: "red",
      }}
      justify="flex-start"
      align="center"
      gap={10}
    >
      <MdError size={16}></MdError>
      <p>{children}</p>
    </Flex>
  );
};

export default ErrorMessage;
