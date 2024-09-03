import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";

export default function LinkCards({ className }: { className?: string }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
      {[...Array(6)].map((_, i) => (
        <Link href={"#"} key={i}>
          <div
            className={twMerge(
              "flex gap-4 rounded-md py-3 px-6 bg-slate-800 text-slate-50",
              className
            )}
          >
            <h2>Anxienty</h2>
            <span aria-hidden="true">&rarr;</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
