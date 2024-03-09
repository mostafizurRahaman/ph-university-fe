import { Form, Select } from "antd";
import { Controller } from "react-hook-form";
import ErrorMessage from "../ui/ErrorMessage";

export interface IOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface IPHSelectProps {
  label: string;
  name: string;
  options: IOption[];
  placeholder?: string;
}

const PHSelect = ({ label, name, options, placeholder }: IPHSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => {
        return (
          <Form.Item label={label}>
            <Select
              {...field}
              style={{ width: "100%" }}
              placeholder={placeholder}
              options={options}
            />

            {error && <ErrorMessage children={error?.message} />}
          </Form.Item>
        );
      }}
    />
  );
};

export default PHSelect;
