import { Button } from "@/components/ui/button";
import { Loader, Plus, X } from "lucide-react";
import React from "react";

type TimesComponentProps = {
  handleAddAllTime: () => void;
  handleAddTime: (time: string) => void;
  handleRemoveTime: (time: string) => void;
  handleRemoveAllTime: () => void;
  handleSubmit: () => void;
  selected: string[];
  timesArray: string[];
  loading: boolean;
  day: string;
};

export default function TimesComponent({
  handleAddAllTime,
  handleAddTime,
  handleRemoveTime,
  handleSubmit,
  selected,
  timesArray,
  loading,
  day,
  handleRemoveAllTime,
}: TimesComponentProps) {
  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 border-gray-200 dark:border-gray-600 shadow rounded-md divide-x divide-gray-200 dark:divide-gray-600">
      <div className="p-4">
        <h2 className="py-4 font-semibold">
          Select your avaiability for{" "}
          <span className="capitalize "> {day}</span>
        </h2>
        <div className="grid grid-cols-3 gap-2 py-4">
          <button
            onClick={handleAddAllTime}
            className="flex items-center justify-center p-2 border-2 border-gray-500 dark:border-gray-600 rounded-md  hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-semibold"
          >
            <span className="">Add All</span>
            <Plus className="w-3 h-3 ml-2" />
          </button>
          {timesArray.map((time, i) => {
            return (
              <button
                onClick={() => handleAddTime(time)}
                key={i}
                className="flex items-center justify-center p-2 border border-gray-200 dark:border-gray-600 rounded-md  hover:bg-gray-100 dark:hover:bg-gray-800 text-sm"
              >
                <span className="">{time}</span>
                <Plus className="w-3 h-3 ml-2" />
              </button>
            );
          })}
        </div>
      </div>
      <div className="p-4">
        {selected.length > 0 ? (
          <div className="">
            <h2 className="py-4 font-semibold">Here is your selected time</h2>
            <div className="grid grid-cols-3 gap-2 py-4">
              {selected.map((time, i) => {
                return (
                  <button
                    onClick={() => handleRemoveTime(time)}
                    key={i}
                    className="flex items-center justify-center p-2  bg-green-200 dark:bg-white dark:text-gray-900 rounded-md hover:bg-green-300 dark:hover:bg-gray-800 dark:hover:text-gray-100 text-sm"
                  >
                    <span className="dark:text-green-600">{time}</span>
                    <X className="w-3 h-3 ml-2 dark:text-green-950 " />
                  </button>
                );
              })}
            </div>
            <div className=" flex justify-between border-t border-gray-200 pt-4">
              {loading ? (
                <Button disabled>
                  <Loader className="w-4 h-3 animate-spin" />
                  Saving...
                </Button>
              ) : (
                <Button onClick={handleSubmit}>Save Settings</Button>
              )}

              <button
                onClick={handleRemoveAllTime}
                className="flex items-center justify-center p-2 border-2 border-red-400 dark:border-gray-600 rounded-md  hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-semibold"
              >
                <span className="">Clear All</span>
                <X className="w-4 h-3 ml-2" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex h-[60%] items-center justify-center">
            <p className=" text-gray-400 dark:text-gray-500">
              No times selected. Please choose your availability.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
