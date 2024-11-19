"use client";

import Link from "next/link";

import { siteConfig } from "../../config/site";
import { cn } from "@/lib/utils";
import { CommandMenu } from "@/components/command-menu";
import { Icons } from "../components/Icons";
import { MainNav } from "@/components/main-nav";
import { MobileNav } from "@/components/mobile-nav";
import ModeToggle from "../components/ModeToggle";
import { buttonVariants } from "../components/ui/button";
import { Session } from "next-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export default function SiteHeader({ session }: { session: Session | null }) {
  const user = session?.user;
  const names = user?.name ?? "";

  function getInitials(name: string) {
    if (!name) return "";
    const nameParts = name.split(" ");
    const initials = nameParts
      .map((part) => part.charAt(0).toUpperCase())
      .join("");

    return initials;
  }

  const router = useRouter();
  async function handleLogout() {
    await signOut();
    router.push("/login");
  }
  return (
    <header className="sticky px-10 py-2 top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur dark:bg-black supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* <CommandMenu /> */}
          </div>
          <nav className="flex gap-2 items-center">
            {session && session.user && user?.email ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer">
                    {user.image ? (
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="medico"
                      />
                    ) : (
                      <AvatarFallback>{getInitials(names)}</AvatarFallback>
                    )}
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
                  <DropdownMenuLabel className="font-light text-muted-foreground">
                    {user.email}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={() => handleLogout()}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="lg:flex items-center max-lg:flex-col lg:px-0 px-3 mb-3 lg:mb-0 text-left lg:space-x-4">
                <Link
                  href="/login"
                  className="max-lg:hidden px-2 py-[7px] border-[1px] rounded-md hover:text-neutral-400 "
                >
                  Sign In
                </Link>
              </div>
            )}

            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
