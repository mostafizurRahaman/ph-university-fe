import { DatePicker, Form } from "antd";
import { Controller } from "react-hook-form";
import ErrorMessage from "../ui/ErrorMessage";
import dayjs from "dayjs";

interface IPHDatePickerProps {
  label: string;
  name: string;
  placeholder?: string;
  disabled?: boolean;
}

const PHDatePicker = ({
  label,
  name,
  disabled = false,
}: IPHDatePickerProps) => {
  return (
    <Controller
      name={name}
      render={({
        field: { onChange, value, ...field },
        fieldState: { error },
      }) => {
        return (
          <Form.Item label={label}>
            <DatePicker
              disabled={disabled}
              {...field}
              size="large"
              style={{ width: "100%" }}
              value={value ? dayjs(value) : null}
              onChange={(value) => {
                if (value) {
                  console.log(value, dayjs(value).toDate());
                  onChange(dayjs(value).toDate());
                }
              }}
            />
            {error && <ErrorMessage children={error?.message} />}
          </Form.Item>
        );
      }}
    />
  );
};

export default PHDatePicker;
