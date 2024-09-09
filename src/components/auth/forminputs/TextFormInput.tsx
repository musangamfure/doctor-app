import React from "react";

type TextFormInputProps = {
  name: string;
  label: string;
  placeholder?: string;
  register: any;
  type?: string;
  errors?: any;
};

export default function TextFormInput({
  name,
  label,
  placeholder,
  register,
  type = "text",
  errors,
}: TextFormInputProps) {
  return (
    <div>
      <label
        htmlFor={`${name}`}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        {...register(`${name}`, { required: true })}
        name={`${name}`}
        id={`${name}`}
        autoComplete="name"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        placeholder={placeholder}
        type={type}
      />
      {errors[`${name}`] && (
        <span className="text-xs text-red-600 dark:text-red-400">
          {label} is required!
        </span>
      )}
    </div>
  );
}
