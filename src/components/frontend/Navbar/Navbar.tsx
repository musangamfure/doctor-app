"use client";
import Container from "../Container";
import ProductNav from "./ProductNav";
import { useState } from "react";
import SolutionNav from "./SolutionNav";
import OpenSourceNav from "./OpenSourceNav";
import Link from "next/link";
import { Menu } from "lucide-react";

type Props = {};

const Navbar = (props: Props) => {
  const [showNav, setShowNav] = useState(true);

  return (
    <Container>
      <div className="text-white bg-blue-950 py-5 px-3">
        <button className="hidden"></button>
        <div className="flex items-center max-lg:justify-between max-lg:flex-row-reverse ">
          <div className="flex justify-between items-center max-lg:w-full ">
            <div className="lg:hidden">
              <a
                href=""
                className="px-2 py-[6px] border-[1px] rounded-md hover:text-neutral-400"
              >
                Sign up
              </a>
            </div>
            <a className="text-2xl" href="/">
              Doctor
            </a>
            <button
              type="button"
              className="lg:hidden cursor-pointer"
              onClick={() => {
                setShowNav(!showNav);
              }}
            >
              <div
                className={`w-[23px] h-[2px] transition ease-in duration-150  bg-white ${
                  showNav
                    ? "rotate-45 mb-0  translate-y-[1px]"
                    : "rotate-0 mb-1"
                } `}
              ></div>
              <div
                className={`w-[23px] h-[2px] transition ease-in duration-150 bg-white ${
                  showNav ? "hidden mb-0" : "mb-1"
                } `}
              ></div>
              <div
                className={`w-[23px] h-[2px] transition ease-in duration-150 bg-white  ${
                  showNav ? "-rotate-45 mb-0" : "rotate-0"
                }`}
              >
                {" "}
                <Menu className="scroll-m-20 text-2xl text-gray-600 dark:text-white/65 font-extrabold tracking-tight lg:text-3xl" />
              </div>
            </button>
          </div>
          <div
            className={` flex w-full max-lg:absolute transition ease-in duration-200 top-20 z-40  ${
              showNav
                ? "max-lg:translate-x-0 max-lg:scale-100"
                : " max-lg:max-h-0 max-lg:scale-y-50 max-lg:-translate-y-1/4"
            }`}
          >
            <div className="flex max-lg:flex-col lg:items-center lg:justify-between max-lg:justify-between max-sm:w-10/12 max-sm:mx-auto sm:ml-auto max-lg:w-[320px] lg:w-full max-lg:max-h-[500px]  overflow-y-auto lg:mb-0 max-lg:bg-white max-lg:rounded-lg">
              {/* <nav className="mt-0 px-3 lg:px-6 text-[15.5px] mb-0 max-lg:py-10 max-lg:px-5">
                <ul className="flex lg:items-center lg:space-x-2 max-lg:flex-col max-lg:text-neutral-700 max-lg:text-xl max-lg:font-medium max-lg:space-y-6 max-lg:h-auto  overflow-y-auto">
                  <OpenSourceNav />
                  <ProductNav />
                  <SolutionNav />

                  <li>
                    <a className="max-lg:font-semibold  flex items-center p-1 hover:text-neutral-300">
                      About us
                    </a>
                  </li>
                </ul>
              </nav> */}
              <div className="lg:flex items-center max-lg:flex-col lg:px-0 px-3 mb-3 lg:mb-0 text-left lg:space-x-4">
                <div className="max-lg:flex justify-center max-lg:border-[1px] max-lg:mr-4 rounded-md max-lg:bg-neutral-800">
                  <Link
                    href="/login"
                    className="hover:text-neutral-400 max-lg:py-2 max-lg:text-[16px] max-lg:font-semibold "
                  >
                    Sign in
                  </Link>
                </div>
                <Link
                  href="/register"
                  className="max-lg:hidden px-2 py-[5px] border-[1px] rounded-md hover:text-neutral-400 "
                >
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Navbar;
