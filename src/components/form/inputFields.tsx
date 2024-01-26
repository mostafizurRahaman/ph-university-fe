
import { useFormContext } from "react-hook-form";

interface IInputProps {
   label?: string;
   name: string;
   type: string;
   className?: string;
   inputClassName?: string;
   labelClassName?: string;
   placeholder?: string;
   errorClassName?: string;
}

const InputFields = ({
   label,
   name,
   type,
   className,
   placeholder,
   labelClassName,
   errorClassName,
   inputClassName,
}: IInputProps) => {
   // **  useFromContext to use FromProvider :
   const {
      register,
      formState: { errors },
   } = useFormContext();
   return (
      <div className={className}>
         {label && (
            <label className={` ${labelClassName}`} htmlFor={name}>
               {label}
            </label>
         )}
         <input
            className={` ${inputClassName}`}
            type={type}
            id={name}
            placeholder={placeholder}
            {...register(name)}
         />
         {errors[name] && (
            <p className={` ${errorClassName}`}>
               {" "}
               {errors[name]?.message as string}
            </p>
         )}
      </div>
   );
};

export default InputFields;
