import { Form, Input } from "antd";
import { Controller } from "react-hook-form";
import ErrorMessage from "../ui/ErrorMessage";

interface IInputProps {
  label?: string;
  name: string;
  type: string;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  placeholder?: string;
}

const ControllerInput = ({
  name,
  type,
  className,
  label,
  placeholder,
}: IInputProps) => {
  return (
    <div
      className={`${className}`}
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => {
          return (
            <Form.Item label={label}>
              <Input
                {...field}
                type={type}
                id={name}
                placeholder={placeholder}
              />
              {error && <ErrorMessage children={error.message} />}
            </Form.Item>
          );
        }}
      ></Controller>
    </div>
  );
};

export default ControllerInput;
