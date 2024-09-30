import { is } from "date-fns/locale";
import { Loader } from "lucide-react";
import React from "react";
import { twMerge } from "tailwind-merge";

type SubmitButtonProps = {
  title: string;
  buttonType?: "submit" | "reset" | "button" | undefined;
  isLoading?: boolean;
  loadingTitle?: string;
  className?: string;
};

export default function SubmitButton({
  title,
  buttonType = "submit",
  isLoading = false,
  loadingTitle,
  className,
}: SubmitButtonProps) {
  return (
    <>
      {isLoading ? (
        <button
          type={buttonType}
          disabled
          className={twMerge(
            "flex  justify-center items-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
            className
          )}
        >
          <Loader className="w-4 h-4 mr-2 flex-shrink-0 animate-spin" />
          {loadingTitle}
        </button>
      ) : (
        <button
          type={buttonType}
          className={twMerge(
            " text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-white dark:text-gray-900 dark:hover:bg-white/85 dark:hover:text-gray-950 dark:focus:ring-white",
            className
          )}
        >
          {title}
        </button>
      )}
    </>
  );
}
