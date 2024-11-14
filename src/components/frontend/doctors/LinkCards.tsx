import { Specialty } from "@prisma/client";
import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";

type LinkCardProps = {
  className?: string;
  specialties: Specialty[];
};

export default function LinkCards({ className, specialties }: LinkCardProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
      {specialties.map((item) => (
        <Link href={`/speciality/${item.slug}`} key={item.id}>
          <div
            className={twMerge(
              "flex gap-4 rounded-md py-3 border  px-6 bg-slate-100 text-slate-950 border-[#67E8F9] dark:bg-black/90 dark:text-white/85",
              className
            )}
          >
            <h2>{item.title}</h2>
            <span aria-hidden="true">&rarr;</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
