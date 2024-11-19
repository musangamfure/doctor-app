"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { siteConfig } from "../../config/site";
import { cn } from "@/lib/utils";

import { docsConfig } from "../../config/docs";

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-4 flex items-center space-x-2 lg:mr-6">
        <span className="scroll-m-20 text-2xl text-gray-600 dark:text-white/65 font-extrabold tracking-tight lg:text-3xl">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="flex items-center gap-4 text-sm lg:gap-6">
        {docsConfig.mainNav?.map((link, i) => {
          return (
            <Link
              key={i}
              href={link.href}
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === link.href
                  ? "text-foreground/90"
                  : "text-foreground/60"
              )}
            >
              {link.title}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
