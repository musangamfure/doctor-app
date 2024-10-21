"use client";

import * as React from "react";

import { MultiSelect } from "react-multi-select-component";

export default function MultiSelectInput({
  options,
  label,
  optionTitle,
  selectedOptions,
  setSelectedOptions,
  className,
}: {
  options: { label: string; value: string }[];
  label: string;
  optionTitle: string;
  selectedOptions: any;
  setSelectedOptions: any;
  className?: string;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={label}
        className="block font-medium text-gray-900 leading-6 dark:text-slate-50 mb-2"
      >
        {optionTitle}
      </label>
      <div className="">
        <MultiSelect
          options={options}
          value={selectedOptions}
          onChange={setSelectedOptions}
          labelledBy={optionTitle}
        />
      </div>
    </div>
  );
}
