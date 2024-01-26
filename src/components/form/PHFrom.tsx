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
}

interface IFormConfig {
   defaultValues?: Record<string, unknown>;
}

const PHFrom = ({ onSubmit, children, styles, defaultValues }: IPHForm) => {
   const formConfig: IFormConfig = {};

   if (defaultValues) {
      formConfig["defaultValues"] = defaultValues;
   }

   const methods = useForm(formConfig);

   return (
      <FormProvider {...methods}>
         <form onSubmit={methods.handleSubmit(onSubmit)} style={styles}>
            {children}
         </form>
      </FormProvider>
   );
};

export default PHFrom;
