import { Instagram, Linkedin, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  const footerNavs = [
    {
      label: "Company",
      items: [
        {
          href: "/join/doctors",
          name: "List Your Service",
        },
        {
          href: "javascript:void()",
          name: "Blog",
        },
        {
          href: "javascript:void()",
          name: "Team",
        },
        {
          href: "javascript:void()",
          name: "Careers",
        },
      ],
    },
    {
      label: "Resources",
      items: [
        {
          href: "javascript:void()",
          name: "contact",
        },
        {
          href: "javascript:void()",
          name: "Support",
        },
        {
          href: "javascript:void()",
          name: "Docs",
        },
        {
          href: "javascript:void()",
          name: "Pricing",
        },
      ],
    },
    {
      label: "About",
      items: [
        {
          href: "javascript:void()",
          name: "Terms",
        },
        {
          href: "javascript:void()",
          name: "License",
        },
        {
          href: "javascript:void()",
          name: "Privacy",
        },
        {
          href: "javascript:void()",
          name: "About US",
        },
      ],
    },
  ];

  const socialLinks = [
    {
      href: "",
      name: "LinkedIn",
      icon: Linkedin,
      color: "#000000",
    },
    {
      href: "",
      name: "Facebook",
      icon: Youtube,
      color: "#1877f2",
    },
    {
      href: "",
      name: "Instagram",
      icon: Instagram,
      color: "#e1306c",
    },
    {
      href: "",
      name: "Twitter",
      icon: Twitter,
      color: "#1da1f2",
    },
  ];

  return (
    <footer className="text-gray-500 bg-white  px-4 dark:bg-black dark:text-white/85 py-5 max-w-screen-xl mx-auto md:px-8">
      <div className="gap-6 justify-between md:flex">
        <div className="flex-1">
          <div className="max-w-xs">
            <h3 className="scroll-m-20 text-2xl text-white/65 font-extrabold tracking-tight lg:text-3xl">
              Medico
            </h3>
            <p className="leading-relaxed mt-2 text-[15px]">
              Lorem Ipsum has been the industry&#39;s standard dummy text ever
              since the 1500s.
            </p>
          </div>
        </div>
        <div className="flex-1 mt-10 space-y-6 items-center justify-between sm:flex md:space-y-0 md:mt-0">
          {footerNavs.map((item, idx) => (
            <ul className="space-y-4" key={idx}>
              <h4 className="text-gray-800 dark:text-white font-semibold">
                {item.label}
              </h4>
              {item.items.map((el, idx) => (
                <li key={idx}>
                  <a
                    href={el.href}
                    className="hover:underline hover:text-indigo-600"
                  >
                    {el.name}
                  </a>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      <div className="mt-8 py-6 border-t items-center justify-between sm:flex">
        <div className="mt-4 sm:mt-0">
          © {new Date().getFullYear()} Float UI All rights reserved.
        </div>
        <div className="mt-6 sm:mt-0">
          <ul className="flex items-center space-x-4">
            {socialLinks.map((item, i) => {
              const Icon = item.icon;
              return (
                <li
                  key={i}
                  className="w-10 h-10 border rounded-full flex items-center justify-center dark:bg-white/85"
                >
                  <a href={item.href}>
                    {Icon && <Icon color={item.color} className="w-6 h-6" />}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </footer>
  );
}
