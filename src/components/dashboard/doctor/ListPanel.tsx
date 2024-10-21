import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { BriefcaseMedical, Dot } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function ListPanel() {
  const tags = Array.from({ length: 50 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`
  );
  return (
    <ScrollArea className={cn("h-[25rem] w-full px-4")}>
      {tags.map((tag) => (
        <Link
          key={tag}
          href={"/dashboard/doctor/appointments/view/1"}
          className="border w-full mb-2 shadow-sm text-sm inline-block py-2 px-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 dark:border-gray-700"
        >
          <div className="flex justify-between items-center pb-3">
            <h3>William Larsen</h3>
            <span>4:00pm</span>
          </div>
          <div className="flex items-center pb-2 gap-4">
            <div className="flex items-center">
              <Dot className="h-4 w-4 mr-1 text-green-500" />
              <span className="text-sm">Follow Up</span>
            </div>
            <div className="flex items-center">
              <BriefcaseMedical className="h-4 w-4 mr-1 " />
              <span className="text-sm">Exam</span>
            </div>
          </div>
        </Link>
      ))}
    </ScrollArea>
  );
}
