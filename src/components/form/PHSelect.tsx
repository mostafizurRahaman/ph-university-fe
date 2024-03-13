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
  options: IOption[] | undefined;
  placeholder?: string;
  disabled?: boolean;
  mode?: "multiple" | undefined;
}

const PHSelect = ({
  label,
  name,
  options,
  placeholder,
  disabled,
  mode,
}: IPHSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => {
        return (
          <Form.Item label={label}>
            <Select
              mode={mode}
              {...field}
              size="large"
              disabled={disabled}
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
