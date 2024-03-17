import { Form, TimePicker } from "antd";
import { Controller } from "react-hook-form";
import ErrorMessage from "../ui/ErrorMessage";
import dayjs from "dayjs";

interface ITimeInput {
  name: string;
  label: string;
}

const PHTimeInput = ({ name, label }: ITimeInput) => {
  return (
    <Controller
      name={name}
      render={({
        field: { onChange, value, ...field },
        fieldState: { error },
      }) => (
        <Form.Item
          label={label}
          style={{
            width: "100%",
          }}
        >
          <TimePicker
            style={{
              width: "100%",
            }}
            value={value ? dayjs(value) : null}
            {...field}
            onChange={(value) => {
              console.log(dayjs(value, "HH:mm").toDate());
              onChange(dayjs(value, "HH:mm").toDate());
            }}
            size="large"
            format="HH:mm"
          />
          {error && <ErrorMessage children={error?.message} />}
        </Form.Item>
      )}
    />
  );
};

export default PHTimeInput;
