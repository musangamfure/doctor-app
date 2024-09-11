import { Icon, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { twMerge } from "tailwind-merge";
import Link from "next/link";

type CustomButtonProps = {
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
  href?: string | undefined;
  className?: string;
};

export default function CustomButton({
  title,
  icon: Icon,
  href,
  className,
}: CustomButtonProps) {
  return (
    <>
      {href ? (
        <Button asChild className={className}>
          <Link href={href} className="flex items-center">
            {Icon && <Icon className="mr-2 h-4 w-4" />}
            {title}
          </Link>
        </Button>
      ) : (
        <Button className={className}>
          {Icon && <Icon className="mr-2 h-4 w-4" />}
          {title}
        </Button>
      )}
    </>
  );
}
