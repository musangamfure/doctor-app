import { is } from "date-fns/locale";
import { Loader } from "lucide-react";
import React from "react";

type SubmitButtonProps = {
  title: string;
  buttonType?: "submit" | "reset" | "button" | undefined;
  isLoading?: boolean;
  loadingTitle?: string;
};

export default function SubmitButton({
  title,
  buttonType = "submit",
  isLoading = false,
  loadingTitle,
}: SubmitButtonProps) {
  return (
    <>
      {isLoading ? (
        <button
          type={buttonType}
          disabled
          className="flex w-full justify-center items-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <Loader className="w-4 h-4 mr-2 flex-shrink-0 animate-spin" />
          {loadingTitle}
        </button>
      ) : (
        <button
          type={buttonType}
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {title}
        </button>
      )}
    </>
  );
}
