import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type TextAreaInputProps = {
  name: string;
  label: string;
  placeholder?: string;
  register: any;
  type?: string;
  errors?: any;
  className?: string;
};

export default function TextAreaInput({
  label,
  name,
  register,
  errors,
  placeholder,
  className = "col-span-full",
}: TextAreaInputProps) {
  return (
    <div className={cn("grid gap-2", className)}>
      <label
        htmlFor={`${name}`}
        className="block text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <Textarea
        {...register(`${name}`, { required: true })}
        name={`${name}`}
        id={`${name}`}
        placeholder={placeholder}
      />
      {errors[`${name}`] && (
        <span className="text-xs text-red-600 dark:text-red-400">
          {label} is required!
        </span>
      )}
    </div>
  );
}
