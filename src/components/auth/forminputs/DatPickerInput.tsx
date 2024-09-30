"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type DatePickerInputProps = {
  date: Date | undefined;
  setDate: any;
  className?: string;
  title: string;
};

export default function DatePickerInput({
  date,
  setDate,
  className = "col-span-full",
  title,
}: DatePickerInputProps) {
  return (
    <div className={cn("grid gap-2", className)}>
      <h2 className="text-sm font-medium text-gray-900"> {title} </h2>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full py-[21px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            {date ? format(date, "PPP") : <span>Pick a date</span>}
            <CalendarIcon className="ml-2 h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
