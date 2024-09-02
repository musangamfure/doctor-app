interface ContainerProps {
  children: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return (
    <div className="max-w-[1440px] w-screen xl:px-20 px-3 md:px-8 sm:px-8 mx-auto ">
      {children}
    </div>
  );
}
