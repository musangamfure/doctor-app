import { Card, CardContent } from "@/components/ui/card";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

type RadioGroupInputProps = {
  name: string;
  register: any;
  errors?: any;
  title: string;
  className?: string;
  radioOptions: radioOptions[];
};

export type radioOptions = {
  value: string;
  label: string;
};

export function RadioGroupInput({
  name,
  register,
  className = "col-span-full",
  radioOptions,
  title,
  errors,
}: RadioGroupInputProps) {
  return (
    <div className={cn(className)}>
      <h3 className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {title}
      </h3>
      <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        {radioOptions.map((option, i) => {
          return (
            <li
              key={i}
              className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600"
            >
              <div className="flex items-center ps-3">
                <input
                  id={`${option.value}`}
                  {...register(name, { required: true })}
                  type="radio"
                  value={option.value}
                  name={name}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />

                <label
                  htmlFor="horizontal-list-radio-license"
                  className="w-full py-2.5 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  {option.label}
                </label>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
