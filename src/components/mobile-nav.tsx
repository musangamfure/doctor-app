"use client";

import * as React from "react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";

import { docsConfig } from "../../config/docs";
import { siteConfig } from "../../config/site";
import { cn } from "@/lib/utils";

import { ScrollArea } from "../components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet";
import { Menu } from "lucide-react";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);

  const mainNavLinks = [
    {
      name: "Doctors",
      path: "/doctors",
    },

    {
      name: "Telehealth",
      path: "/telehealth",
    },

    {
      name: "In-Person",
      path: "/in-person",
    },
    {
      name: "Weight Loss",
      path: "/weight-loss",
    },
    {
      name: "Urgent Care",
      path: "/urgent-care",
    },
    {
      name: "Work with Us",
      path: "/join/doctors",
    },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Link href="/" className="mr-4 flex items-center space-x-2 lg:mr-6">
          <span className="scroll-m-20 text-2xl text-gray-600 dark:text-white/65 font-extrabold tracking-tight lg:text-3xl md:hidden">
            {siteConfig.name}
          </span>
        </Link>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <MobileLink
          href="/"
          className="flex items-center"
          onOpenChange={setOpen}
        >
          <Link href="/" className="mr-4 flex items-center space-x-2 lg:mr-6">
            <span className="scroll-m-20 text-2xl text-gray-600 dark:text-white/65 font-extrabold tracking-tight lg:text-3xl">
              {siteConfig.name}
            </span>
          </Link>
        </MobileLink>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="flex flex-col space-y-3">
            {docsConfig.mainNav?.map(
              (item) =>
                item.href && (
                  <MobileLink
                    key={item.href}
                    href={item.href}
                    onOpenChange={setOpen}
                  >
                    {item.title}
                  </MobileLink>
                )
            )}
          </div>
          {/* <div className="flex flex-col space-y-2">
            {docsConfig.sidebarNav.map((item, index) => (
              <div key={index} className="flex flex-col space-y-3 pt-6">
                <h4 className="font-medium">{item.title}</h4>
                {item?.items?.length &&
                  item.items.map((item) => (
                    <React.Fragment key={item.href}>
                      {!item.disabled &&
                        (item.href ? (
                          <MobileLink
                            href={item.href}
                            onOpenChange={setOpen}
                            className="text-muted-foreground"
                          >
                            {item.title}
                            {item.label && (
                              <span className="ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline">
                                {item.label}
                              </span>
                            )}
                          </MobileLink>
                        ) : (
                          item.title
                        ))}
                    </React.Fragment>
                  ))}
              </div>
            ))}
          </div> */}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        if (href) {
          router.push(href.toString());
          onOpenChange?.(false);
        }
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  );
}
