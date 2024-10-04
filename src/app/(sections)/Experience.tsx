"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { RiFlutterFill, RiNextjsFill, RiReactjsFill } from "react-icons/ri";
import { TbBrandReactNative } from "react-icons/tb";
import {
  SiExpress,
  SiFigma,
  SiGooglecloud,
  SiGrafana,
  SiMysql,
  SiPostgresql,
  SiPrisma,
  SiTypescript,
} from "react-icons/si";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/Tooltip";

interface Technology {
  icon: React.ReactElement;
  name: string;
}

interface Experience {
  title: string;
  company: string;
  role: string;
  period: string;
  technologies: Technology[];
  description: string;
}

const experiences: Experience[] = [
  {
    title: "Software Engineer",
    company: "J.P. Morgan",
    role: "Full-stack / Devops",
    period: "June 2024 - Aug 2024 ",
    technologies: [
      { icon: <RiNextjsFill />, name: "Next.js" },
      { icon: <SiTypescript className="rounded" />, name: "TypeScript" },
      { icon: <SiExpress />, name: "Express.js" },
      { icon: <SiPrisma />, name: "Prisma" },
      { icon: <SiPostgresql />, name: "PostgreSQL" },
      { icon: <SiGrafana />, name: "Grafana" },
    ],
    description:
      "Developed full-stack devops tool to analayse and visualise build performances of teams within Execute, a single-dealer platform that handles over $1 trillion in daily trading volume.",
  },
  {
    title: "Software Engineer",
    role: "Placement",
    company: "Zebra",
    period: "July 2023 - June 2024",
    technologies: [
      { icon: <RiReactjsFill />, name: "React" },
      { icon: <SiTypescript className="rounded" />, name: "TypeScript" },
      { icon: <RiFlutterFill />, name: "Flutter" },
      { icon: <SiFigma />, name: "Figma" },
    ],
    description:
      "Developed a large-scale SaaS platform with React and TypeScript, supporting 5 million users. Simplified development with Micro-Frontends and improved user experience with efficient data fetching. Automated UI updates by integrating design tools whilst contributing to component library supporting both Web and Mobile components using React and Flutter respectively.",
  },
  {
    title: "BGN Hackathon",
    company: "Google",
    role: "Winner",
    period: "Oct 2022",
    technologies: [
      { icon: <TbBrandReactNative />, name: "React Native" },
      { icon: <SiMysql />, name: "MySQL" },
      { icon: <SiGooglecloud />, name: "Google Cloud Platform" },
    ],
    description:
      "Built a location-based story-sharing app that won 1st place at a hackathon. Used Google Cloud APIs for geolocation and React Native for the mobile interface.",
  },
];

const ExperienceCard = ({ experience }: { experience: Experience }) => {
  const cardVariants = {
    initial: {},
    hover: {
      backgroundColor: "rgb(255 255 255 / 0.2)",
      transition: { duration: 0.3 },
    },
  };

  const underlineVariants: Variants = {
    initial: { scaleX: 0, originX: 0 },
    hover: {
      scaleX: 1,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  return (
    <motion.div
      className="relative bg-[var(--timeline-background)] border border-transparent dark:border-white/[0.2] p-6 rounded-lg shadow-xl overflow-hidden"
      variants={cardVariants}
      whileHover="hover"
      initial="initial"
      transition={{ stiffness: 300 }}
    >
      <motion.h3 className="relative text-2xl font-semibold mb-1 text-[var(--timeline-text)] w-fit">
        {experience.title}
        <motion.span
          className="absolute bottom-0 left-0 w-full h-[2px] bg-[#009080]"
          variants={underlineVariants}
        />
      </motion.h3>
      <p className="relative text-[var(--timeline-subtext)] text-lg mb-1">
        {experience.company}
      </p>
      <p className="relative text-[var(--timeline-text)] leading-relaxed text-sm text-start">
        {experience.description}
      </p>
      <div className="relative justify-evenly p-1 flex mt-4 text-black rounded hover:text-[#009080]">
        <TooltipProvider>
          {experience.technologies.map((tech, index) => (
            <Tooltip key={index} delayDuration={100}>
              <TooltipTrigger asChild>
                <motion.div className="p-2 bg-white text-3xl rounded-full text-black hover:text-[#009080] transition duration-300 cursor-pointer">
                  {tech.icon}
                </motion.div>
              </TooltipTrigger>
              <TooltipContent className="bg-white">
                <p className="text-black">{tech.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>
    </motion.div>
  );
};

export default function ExperienceSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveIndex(Number(entry.target.getAttribute("data-index")));
          }
        });
      },
      { threshold: 0.5 }
    );

    const timelineItems =
      timelineRef.current?.querySelectorAll(".timeline-item");
    timelineItems?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full mx-auto timeline-component">
      <style jsx>{`
        .timeline-component {
          --timeline-background: "";
          --timeline-text: #e0e7ff;
          --timeline-subtext: #a3b8cc;
          --timeline-accent: #009080;
          --timeline-line: #8b9dc3;
        }
      `}</style>
      <h1 className="relative inline-block md:mx-20 px-1 py-1.5 my-16 w-full mt- text-4xl text-center md:text-start sm:text-6xl md:text-8xl  font-bold transition-colors duration-300 ease-in-out group h-fit md:w-fit">
        <span className="relative z-10 group-hover:text-white">Experience</span>
        <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 ease-in-out bg-[#009080] group-hover:h-full -z-10"></span>
      </h1>
      <Timeline />
    </div>
  );
}

const Timeline = () => {
  const [isMobile, setIsMobile] = useState(false);

  const [activeIndex, setActiveIndex] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveIndex(Number(entry.target.getAttribute("data-index")));
          }
        });
      },
      { threshold: 0.5 }
    );

    const timelineItems =
      timelineRef.current?.querySelectorAll(".timeline-item");
    timelineItems?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const checkSize = () => {
      setIsMobile(window.innerWidth < 768); // 768px is the 'md' breakpoint in Tailwind
    };

    checkSize();
    window.addEventListener("resize", checkSize);

    return () => window.removeEventListener("resize", checkSize);
  }, []);

  return isMobile ? (
    <div className="relative md:px-10" ref={timelineRef}>
      <motion.div
        className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-white md:transform md:-translate-x-1/2"
        style={{ height: lineHeight }}
      />
      {experiences.map((experience, index) => (
        <motion.div
          key={index}
          className="timeline-item relative mb-24 md:mb-0"
          data-index={index}
          initial={{ opacity: 0, y: 50 }}
          animate={activeIndex >= index ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: index * 0.2 }}
        >
          <div className="flex items-center md:justify-center">
            {/* Timeline dot */}
            <div className="w-8 h-8 absolute left-0 md:left-1/2 transform md:-translate-x-1/2 flex items-center justify-center">
              <div className="w-3 h-3 bg-[#009080] rounded-full" />
            </div>

            {/* Content */}
            <div className="w-full md:w-1/2 pl-12 md:pl-0 md:pr-12 md:even:pl-12 md:even:pr-0">
              <div className="md:even:text-right">
                <ExperienceCard experience={experience} />
              </div>
              <motion.div
                className="text-left md:even:text-right text-[var(--timeline-text)] mt-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 + 0.2 }}
              >
                <h3 className="text-lg font-medium">{experience.period}</h3>
              </motion.div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  ) : (
    <div className="relative md:px-10" ref={timelineRef}>
      <motion.div
        className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-white"
        style={{ height: lineHeight, top: 0 }}
      />
      {experiences.map((experience, index) => (
        <motion.div
          key={index}
          className="timeline-item relative mb-24"
          data-index={index}
          initial={{ opacity: 0, y: 50 }}
          animate={activeIndex >= index ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: index * 0.2 }}
        >
          <div className="flex items-center justify-center">
            {/* Left side */}
            <div className="w-1/2 flex justify-end pr-12 ">
              {index % 2 === 0 ? (
                <ExperienceCard experience={experience} />
              ) : (
                <motion.div
                  className="text-right text-[var(--timeline-text)]"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.2 }}
                >
                  <h3 className="text-lg font-medium">{experience.period}</h3>
                </motion.div>
              )}
            </div>

            {/* Center timeline dot */}
            <div className="w-12 h-12 absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
              <div className="w-4 h-4 bg-[#009080] rounded-full" />
            </div>

            {/* Right side */}
            <div className="w-1/2 pl-12">
              {index % 2 === 1 ? (
                <ExperienceCard experience={experience} />
              ) : (
                <motion.div
                  className="text-left text-[var(--timeline-text)]"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.2 }}
                >
                  <h3 className="text-lg font-medium">{experience.period}</h3>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
