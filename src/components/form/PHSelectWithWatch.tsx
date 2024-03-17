import { Form, Select } from "antd";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import ErrorMessage from "../ui/ErrorMessage";
import { useEffect } from "react";

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
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const PHSelectWithWatch = ({
  label,
  name,
  options,
  placeholder,
  disabled,
  mode,
  setValue,
}: IPHSelectProps) => {
  //   ** Access the control from useFromContext():
  const { control } = useFormContext();
  const inputValue = useWatch({
    name,
    control,
  });

  useEffect(() => {
    setValue(inputValue);
  }, [inputValue, setValue]);

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

export default PHSelectWithWatch;
