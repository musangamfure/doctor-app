import { MainNavItem, SidebarNavItem } from "../types/nav";

export interface DocsConfig {
  mainNav: MainNavItem[];
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Doctors",
      href: "/doctors",
    },

    {
      title: "Telehealth",
      href: "/category?mode=Telehealth",
    },

    {
      title: "In-Person",
      href: "category?mode=In-person%20doctor%20Visit",
    },
    // {
    //   title: "Weight Loss",
    //   href: "/weight-loss",
    // },
    // {
    //   title: "Urgent Care",
    //   href: "/urgent-care",
    // },
    {
      title: "Work with Us",
      href: "/join/doctors",
    },
  ],
};
