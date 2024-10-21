"use client";

import { Specialty } from "@prisma/client";
import * as React from "react";

export function SelectInput({
  name,
  label,
  placeholder,
  register,
  className = "col-span-full",
  options,
}: {
  name: string;
  label: string;
  register: any;
  placeholder?: string;
  className?: string;
  options: any;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={`${name}`}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <select
        id={name}
        name={name}
        {...register(`${name}`)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-white/85 dark:focus:border-white/85"
      >
        {options.map((option: any) => (
          <option key={option.id} value={option.id}>
            {option.title}
          </option>
        ))}
      </select>
    </div>
  );
}
