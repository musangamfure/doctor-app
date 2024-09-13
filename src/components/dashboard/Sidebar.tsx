"use client";
import {
  BarChart,
  Bell,
  Folder,
  Globe,
  Grid2X2,
  Home,
  LineChart,
  Package,
  Package2,
  Plus,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import LogoutButton from "../auth/forminputs/LogoutButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "../ui/badge";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
// import LogoutButton from "./LogoutButton";
// import { getCategories } from "@/actions/categories";

export default async function Sidebar() {
  //   const categories = (await getCategories()) || [];
  const pathName = usePathname();
  const sideBarLinks = [
    {
      label: "Dashboard",
      icon: <Home className="h-4 w-4" />,
      path: "/dashboard",
    },
    {
      label: "Products",
      icon: <Package className="h-4 w-4" />,
      path: "/dashboard/products",
    },
    {
      label: "Orders",
      icon: <ShoppingCart className="h-4 w-4" />,
      path: "/dashboard/orders",
      badge: (
        <Badge
          className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
          color=""
        >
          12
        </Badge>
      ),
    },
    {
      label: "Customers",
      icon: <Users className="h-4 w-4" />,
      path: "/dashboard/customers",
    },
    {
      label: "Analytics",
      icon: <LineChart className="h-4 w-4" />,
      path: "/dashboard/categories",
    },

    {
      label: "Settings",
      icon: <Settings className="h-4 w-4" />,
      path: "/dashboard/settings",
    },
    {
      label: "Online",
      icon: <Globe className="h-4 w-4" />,
      path: "/",
    },
  ];

  return (
    <div className="hidden border-r bg-muted/40 md:block dark:bg-black">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            <span className="font-bold text-xl">Medico</span>
          </Link>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {sideBarLinks.map((item, i) => {
              return (
                <Link
                  key={i}
                  href={item.path}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                    pathName === item.path ? "bg-muted text-primary" : ""
                  )}
                >
                  {item.icon}
                  {item.label}
                  {item.badge && item.badge}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="mt-auto p-4">
          <Card x-chunk="dashboard-02-chunk-0">
            <CardHeader className="p-2 pt-0 md:p-4">
              <CardTitle>Upgrade to Pro</CardTitle>
              <CardDescription>
                Unlock all features and get unlimited access to our support
                team.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
              <Button size="sm" className="w-full">
                Upgrade
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
