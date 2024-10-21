import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ShadSelectInput({
  options,
  label,
  optionTitle,
  selectedOptions,
  setSelectedOptions,
}: {
  options: { label: string; value: string }[];
  label: string;
  optionTitle?: string;
  selectedOptions: any;
  setSelectedOptions: any;
}) {
  return (
    <Select onValueChange={(value) => setSelectedOptions(value)}>
      <h3 className="font-semibold">{optionTitle}</h3>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{optionTitle}</SelectLabel>
          {options.map((option, i) => {
            return (
              <SelectItem key={i} value={option.value}>
                {option.label}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
