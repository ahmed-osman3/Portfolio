"use client";

import { useState, useEffect, useRef } from "react";
import { TextEffect } from "@/components/TextWriter";
import { Download } from "lucide-react";
import ExperienceSection from "./(sections)/Experience";
import { FloatingNav } from "@/components/Navbar";
import SkillsSection from "./(sections)/Skills";
import AboutSection from "./(sections)/About";
import ContactFormDialog from "@/components/ContactForm";

const TABS = ["Home", "About Me", "Experience", "Skills"];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState(0);
  const [index, setIndex] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [navScrolled, setNavScrolled] = useState(false);
  const isScrollingProgrammatically = useRef(false);
  const scrollTimeout = useRef<NodeJS.Timeout>();
  const [dialogShown, setDialogShown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Skip scroll handling if we're programmatically scrolling
      if (isScrollingProgrammatically.current) return;

      const pageYOffset = window.pageYOffset;
      let newActiveSection = 0;

      sectionRefs.current.forEach((ref, index) => {
        if (ref && pageYOffset >= ref.offsetTop - 50) {
          newActiveSection = index;
        }
      });

      setActiveSection(newActiveSection);
      setIndex(newActiveSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (index: number) => {
    setNavScrolled(true);
    // Set the active tab immediately
    setIndex(index);

    // Set the flag before scrolling
    isScrollingProgrammatically.current = true;

    // Perform the smooth scroll
    sectionRefs.current[index]?.scrollIntoView({ behavior: "smooth" });

    // Clear any existing timeout
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }

    // Reset the flag after the scroll animation is likely to be complete
    scrollTimeout.current = setTimeout(() => {
      isScrollingProgrammatically.current = false;
    }, 1000); // Adjust this duration based on your scroll animation duration
  };

  return (
    <>
      {!dialogShown && (
        <FloatingNav
          navItems={TABS.map((tab, index) => {
            return {
              name: tab,
              onClick: () => {
                setIndex(index);
                scrollToSection(index);
              },
            };
          })}
          activeIndex={index}
        />
      )}

      <main>
        {TABS.map((tab, index) => (
          <section
            key={index}
            ref={(el) => {
              sectionRefs.current[index] = el;
            }}
            className="min-h-screen flex items-center relative z-10"
          >
            <div className="w-full mx-auto md:px-4">
              {index === 0 && (
                <div className="h-full  w-full flex flex-col items-center">
                  <TextEffect>Hi, I'm Ahmed 👋</TextEffect>
                  <h3 className="text-xl mt-10 w-full text-center font-thin ">
                    Solving problems and building solutions !
                  </h3>
                  <div className="flex gap-4 mt-20 items-center flex-col sm:flex-row w-full justify-center">
                    <a
                      className="rounded-full hover:text-zinc-950 border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2  w-28 hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
                      href="/resume.pdf"
                      target={"_blank"}
                    >
                      <Download />
                      Resume
                    </a>
                    <ContactFormDialog
                      open={dialogShown}
                      setOpen={setDialogShown}
                    />
                  </div>
                </div>
              )}
              {index === 1 && <AboutSection />}
              {index === 2 && <ExperienceSection />}
              {index === 3 && <SkillsSection />}
            </div>
          </section>
        ))}
        <div className="absolute h-full inset-0 background-gradient z-0" />
      </main>
    </>
  );
}
