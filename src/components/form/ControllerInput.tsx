import { Input } from "antd";
import { Controller } from "react-hook-form";

interface IInputProps {
   label?: string;
   name: string;
   type: string;
   className?: string;
   inputClassName?: string;
   labelClassName?: string;
   placeholder?: string;
   errorClassName?: string;
   error?: string;
}

const ControllerInput = ({
   name,
   type,
   className,
   label,
   placeholder,
   error,
}: IInputProps) => {
   return (
      <div
         className={`${className}`}
         style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "100%",
         }}
      >
         <label
            style={{
               fontSize: "16px",
               textTransform: "capitalize",
               margin: "10px 0px",
               display: "block",
            }}
            htmlFor={name}
         >
            {label}
         </label>
         <Controller
            name={name}
            render={({ field }) => {
               return (
                  <Input
                     {...field}
                     type={type}
                     id={name}
                     placeholder={placeholder}
                  />
               );
            }}
         ></Controller>

         {error && (
            <p style={{ color: "red", fontSize: "16px" }}>
               {error?.charAt(1).toUpperCase()} {error?.slice(1)}
            </p>
         )}
      </div>
   );
};

export default ControllerInput;
