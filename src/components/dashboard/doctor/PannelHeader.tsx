import { Calendar, LucideIcon } from "lucide-react";
import React from "react";
import NewButton from "./NewButton";
import { cn } from "@/lib/utils";

export default function PannelHeader({
  title,
  count,
  icon: Icon,
  className,
}: {
  title: string;
  count: string | undefined;
  icon: LucideIcon;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "py-3 px-6 border-b border-b-gray-200 flex justify-between items-center",
        className
      )}
    >
      <div className="flex py-[2.1px] items-center gap-1 text-sm font-medium">
        <Icon className="w-4 h-4 flex-shrink-0 text-gray-500" />
        <span>{title}</span>
        <span className="w-6 h-6 text-gray-950 rounded-full border border-gray-200 flex items-center justify-center dark:text-white shadow-sm">
          {count}
        </span>
      </div>
      <div className="md:hidden block">
        <NewButton title="New Service" href="/dashboard/services/new" />
      </div>
    </div>
  );
}
