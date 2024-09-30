"use client";
import { Plus, X } from "lucide-react";
import React, { useState } from "react";

export default function ArrayInput({
  title,
  items,
  setItems,
  placeholder,
}: {
  title: string;
  items: string[];
  setItems: any;
  placeholder?: string;
}) {
  const [value, setValue] = useState<string>("");
  const [showForm, setShowForm] = useState(false);

  const handleAdd = () => {
    if (value.trim() !== "") {
      setItems([...items, value]);
      setValue("");
    }
  };

  const handleRemove = (index: number) => {
    const updatedSpecialities = [...items];
    updatedSpecialities.splice(index, 1);
    setItems(updatedSpecialities);
  };

  return (
    <div className="py-4 col-span-full">
      <div className="grid grid-cols-2">
        {showForm ? (
          <div className="col-span-full">
            <div className="flex items-center w-full ">
              <div className="relative w-full">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <Plus className="w-4 h-4 text-muted-foreground" />
                </div>
                <input
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  type="text"
                  id="voice-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder={placeholder}
                />
              </div>
              <button
                type="button"
                onClick={handleAdd}
                className="shrink-0 inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <Plus className="w-4 h-4 me-2" />
                Add
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="shrink-0 ml-2 py-2.5 px-3 rounded-lg bg-red-400 flex items-center justify-center"
              >
                <X className="w-4 h-4 text-white " />
              </button>
            </div>
          </div>
        ) : (
          <div className="col-span-full">
            <button
              onClick={() => setShowForm(true)}
              type="button"
              className="flex w-full items-center space-x-2 text-slate-900 dark:text-slate-100"
            >
              <Plus />
              <span>{title}</span>
            </button>
          </div>
        )}
        <div className="flex flex-wrap gap-6 col-span-full mt-4 cursor-pointer">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-center bg-slate-400 text-slate-100 dark:bg-slate-500 px-3 py-2 rounded-lg gap-2"
            >
              <p className="flex">{item}</p>
              <X className="w-4 h-4 me-2" onClick={() => handleRemove(index)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
