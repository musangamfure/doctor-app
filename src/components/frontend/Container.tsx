import { twMerge } from "tailwind-merge";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={twMerge(
        "max-w-[1440px]  w-screen xl:px-20 px-3 md:px-8 sm:px-8 mx-auto ",
        className
      )}
    >
      {children}
    </div>
  );
}
