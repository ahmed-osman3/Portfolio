"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  icon: string;
}

const experiences: Experience[] = [
  {
    title: "Junior Developer",
    company: "Tech Startup",
    period: "2018 - 2019",
    description:
      "Started my journey in web development, working on various frontend projects.",
    icon: "💻",
  },
  {
    title: "Mid-level Developer",
    company: "Digital Agency",
    period: "2019 - 2021",
    description:
      "Expanded skills to full-stack development, leading small team projects.",
    icon: "🚀",
  },
  {
    title: "Senior Developer",
    company: "Enterprise Solutions",
    period: "2021 - 2023",
    description:
      "Architected large-scale applications and mentored junior developers.",
    icon: "🏗️",
  },
  {
    title: "Lead Developer",
    company: "Innovation Labs",
    period: "2023 - Present",
    description:
      "Currently leading cutting-edge projects and driving technical decisions.",
    icon: "🎯",
  },
];

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
    <div className="w-full mx-auto px-4 timeline-component">
      <style jsx>{`
        .timeline-component {
          --timeline-background: rgba(31, 41, 55, 0.8);
          --timeline-text: #e0e7ff;
          --timeline-subtext: #a3b8cc;
          --timeline-accent: #009080;
          --timeline-line: #8b9dc3;
        }
      `}</style>
      <h1 className="relative inline-block px-1 py-1.5 text-7xl lg:text-8xl font-bold transition-colors duration-300 ease-in-out group mb-16">
        <span className="relative z-10 group-hover:text-white">Experience</span>
        <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 ease-in-out bg-[#009080] group-hover:h-full -z-10"></span>
      </h1>
      <div className="relative" ref={timelineRef}>
        <motion.div
          className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-[var(--timeline-line)]"
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
            <div
              className={`flex items-center ${
                index % 2 === 0 ? "flex-row-reverse" : ""
              }`}
            >
              <div className="w-1/2" />
              <motion.div
                className="w-12 h-12 absolute left-1/2 transform -translate-x-1/2 -translate-y-6 bg-[var(--timeline-accent)] rounded-full border-4 border-[var(--timeline-line)] shadow-lg flex items-center justify-center text-2xl"
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {experience.icon}
              </motion.div>
              <div
                className={`w-1/2 ${
                  index % 2 === 0 ? "pr-12 text-right" : "pl-12"
                }`}
              >
                <motion.div
                  className="bg-[var(--timeline-background)] backdrop-blur-sm p-6 rounded-lg shadow-xl"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h3 className="text-2xl font-semibold mb-2 text-[var(--timeline-accent)]">
                    {experience.title}
                  </h3>
                  <p className="text-[var(--timeline-subtext)] text-lg mb-1">
                    {experience.company}
                  </p>
                  <p className="text-sm text-[var(--timeline-line)] mb-3">
                    {experience.period}
                  </p>
                  <p className="text-[var(--timeline-text)] leading-relaxed">
                    {experience.description}
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
