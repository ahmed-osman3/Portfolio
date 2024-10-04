"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Github, Menu, MoonIcon, X } from "lucide-react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export const MobileNavbar = ({
  navItems,
  className,
  activeIndex,
}: {
  navItems: {
    name: string;
    link?: string;
    icon?: JSX.Element;
    onClick?: () => void;
  }[];
  className?: string;
  activeIndex: number;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className={cn("fixed top-0 left-0 right-0 z-50", className)}>
      <div className="flex justify-between items-center p-4 bg-white dark:bg-[#4c547e] shadow-md">
        <button onClick={toggleMenu} className="text-black dark:text-white">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <a
          href="http://www.github.com/ahmed-osman3/Portfolio"
          className="text-black dark:text-white"
        >
          <GitHubLogoIcon className="w-6 h-6" />
        </a>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="bg-white dark:bg-[#4c547e] shadow-md"
          >
            {navItems.map((navItem, idx) => (
              <button
                key={`nav-item-${idx}`}
                className={cn(
                  "w-full px-4 py-3 text-left text-sm font-medium",
                  activeIndex === idx
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-black dark:text-white"
                )}
                onClick={() => {
                  navItem.onClick?.();
                  setIsOpen(false);
                }}
              >
                <span className="flex items-center space-x-2">
                  {navItem.icon && <span>{navItem.icon}</span>}
                  <span>{navItem.name}</span>
                </span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Navigation({
  navItems: items,
  className,
  activeIndex,
}: {
  navItems: {
    name: string;
    link?: string;
    icon?: JSX.Element;
    onClick?: () => void;
  }[];
  className?: string;
  activeIndex: number;
}) {
  return (
    <div className="md:hidden">
      {" "}
      {/* Only show on mobile */}
      <MobileNavbar navItems={items} activeIndex={activeIndex} />
    </div>
  );
}

export const FloatingNav = ({
  navItems,
  className,
  activeIndex,
}: {
  navItems: {
    name: string;
    link?: string;
    icon?: JSX.Element;
    onClick?: () => void;
  }[];
  className?: string;
  activeIndex: number;
}) => {
  const { scrollYProgress } = useScroll();

  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      const direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.1 && current > 0.1) {
        // setVisible(false);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          //   setVisible(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          " hidden md:flex max-w-fit  fixed top-5 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-[#4c547e] bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 pl-8 py-2  items-center justify-center space-x-4",
          className
        )}
      >
        {navItems.map((navItem, idx) => (
          <button
            key={`link=${idx}`}
            className={cn(
              "relative   items-center flex space-x-1 dark:hover:text-white hover:text-neutral-500",
              activeIndex == idx ? "text-white" : "text-white/[0.5]"
            )}
            onClick={navItem.onClick}
          >
            <span className="block sm:hidden">{navItem.icon}</span>
            <span className="hidden sm:block text-sm">{navItem.name}</span>
          </button>
        ))}
        <button className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white/[0.5] px-4 py-2 rounded-full hover:text-white duration-100 transition">
          <a href="http://www.github.com/ahmed-osman3/Portfolio">
            <GitHubLogoIcon className="" />
          </a>

          <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent  h-px" />
        </button>
      </motion.div>
      <Navigation navItems={navItems} activeIndex={activeIndex} />
    </AnimatePresence>
  );
};

