import { cn } from "@/lib/utils";
import React from "react";

type TextFormInputProps = {
  name: string;
  label: string;
  placeholder?: string;
  register: any;
  type?: string;
  errors?: any;
  className?: string;
  isRequired?: boolean;
};

export default function TextFormInput({
  name,
  label,
  placeholder,
  register,
  type = "text",
  errors,
  className = "col-span-full",
  isRequired = true,
}: TextFormInputProps) {
  return (
    <div className={cn("grid gap-2", className)}>
      <label
        htmlFor={`${name}`}
        className="block text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        {...register(`${name}`, { required: isRequired })}
        name={`${name}`}
        id={`${name}`}
        autoComplete="name"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-950 focus:border-gray-600 block w-full py-3  dark:bg-black dark:border-white/15 dark:placeholder-black dark:text-white "
        placeholder={placeholder}
        type={type}
      />
      {errors[`${name}`] && isRequired && (
        <span className="text-xs text-red-600 dark:text-red-400">
          {label} is required!
        </span>
      )}
    </div>
  );
}
