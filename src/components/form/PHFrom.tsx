/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form } from "antd";
import { CSSProperties, ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

interface IPHForm {
  onSubmit: SubmitHandler<FieldValues>;
  children: ReactNode;
  styles?: CSSProperties;
  defaultValues?: Record<string, unknown>;
  resolver?: any;
}

interface IFormConfig {
  defaultValues?: Record<string, unknown>;
  resolver?: any;
}

const PHFrom = ({
  onSubmit,
  children,
  styles,
  defaultValues,
  resolver,
}: IPHForm) => {
  const formConfig: IFormConfig = {};

  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }

  //  ** set the resolver to formConfig:
  if (resolver) {
    formConfig["resolver"] = resolver;
  }

  const methods = useForm(formConfig);

  const submit: SubmitHandler<FieldValues> = (data) => {
    onSubmit(data);
    methods.reset();
  };

  return (
    <FormProvider {...methods}>
      <Form
        layout="vertical"
        onFinish={methods.handleSubmit(submit)}
        style={styles}
      >
        {children}
      </Form>
    </FormProvider>
  );
};

export default PHFrom;
