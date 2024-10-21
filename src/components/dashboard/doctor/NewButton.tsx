import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function NewButton({
  title,
  href,
  className,
}: {
  title: string;
  href: string;
  className?: string;
}) {
  return (
    <Button variant="outline" className={cn("text-sm", className)} asChild>
      <Link href={href}>
        <Plus className="w-4 h-4 mr-1" />
        {title}
      </Link>
    </Button>
  );
}
