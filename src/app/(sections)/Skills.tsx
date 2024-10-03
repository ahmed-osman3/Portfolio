import {
  Code,
  Database,
  Globe,
  Server,
  Smartphone,
  Terminal,
  Layers,
  PenTool,
  FileJson,
  Braces,
  Palette,
  Coffee,
  Snowflake,
  LayoutGrid,
  Cpu,
  GitBranch,
  Box,
  Figma,
  GraduationCap,
  Calendar,
  Book,
} from "lucide-react";
import {
  RiCss3Fill,
  RiFlutterFill,
  RiHtml5Fill,
  RiJavaFill,
  RiJavascriptFill,
  RiNextjsFill,
  RiNodejsFill,
  RiReactjsFill,
} from "react-icons/ri";
import {
  SiCypress,
  SiDigitalocean,
  SiDjango,
  SiDocker,
  SiExpress,
  SiFigma,
  SiGit,
  SiPostgresql,
  SiPostman,
  SiPython,
  SiSocketdotio,
  SiTypescript,
  SiVisualstudiocode,
  SiVitest,
} from "react-icons/si";
import { TbBrandAws, TbBrandReactNative } from "react-icons/tb";
import { motion, Variants } from "framer-motion";
import { IconType } from "react-icons";

const skillCategories = [
  {
    name: "Front-end",
    icon: Globe,
    skills: [
      { name: "JavaScript", icon: RiJavascriptFill },
      { name: "TypeScript", icon: SiTypescript },
      { name: "React", icon: RiReactjsFill },
      { name: "HTML5", icon: RiHtml5Fill },
      { name: "CSS3", icon: RiCss3Fill },
      { name: "Next.js", icon: RiNextjsFill },
      { name: "Flutter", icon: RiFlutterFill },
      { name: "React Native", icon: TbBrandReactNative },
      { name: "Vitest", icon: SiVitest },
    ],
  },
  {
    name: "Back-end",
    icon: Server,
    skills: [
      { name: "Node.js", icon: RiNodejsFill },
      { name: "Python", icon: SiPython },
      { name: "Express", icon: SiExpress },
      { name: "Java", icon: RiJavaFill },
      { name: "Socket.io", icon: SiSocketdotio },
      { name: "PostgreSQL", icon: SiPostgresql },
    ],
  },
  {
    name: "Tools",
    icon: PenTool,
    skills: [
      { name: "Docker", icon: SiDocker },
      { name: "VS Code", icon: SiVisualstudiocode },
      { name: "Postman", icon: SiPostman },
      { name: "Figma", icon: SiFigma },
      { name: "AWS", icon: TbBrandAws },
      { name: "Git", icon: SiGit },
      { name: "Cloud Computing", icon: SiDigitalocean },
    ],
  },
];

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

const SkillsCard = ({
  category,
}: {
  category: (typeof skillCategories)[0];
}) => {
  return (
    <motion.div
      key={category.name}
      className="bg-[var(--timeline-background)] border border-transparent dark:border-white/[0.2] p-6 rounded-lg shadow-xl overflow-hidden"
      whileHover={"hover"}
      initial="initial"
      variants={cardVariants}
      transition={{ stiffness: 300 }}
    >
      <div className="flex items-center mb-6">
        <div className="bg-[#009080] p-3 rounded-full mr-4">
          <category.icon className="w-6 h-6 text-white" />
        </div>
        <motion.h3 className="relative text-2xl font-semibold mb-1 text-[var(--timeline-text)] w-fit">
          {category.name}
          <motion.span
            className="absolute bottom-0 left-0 w-full h-[2px] bg-[#009080]"
            variants={underlineVariants}
          />
        </motion.h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <span
            key={skill.name}
            className="bg-white/[.1] px-3 py-1 rounded-full text-sm transition-all duration-300 hover:bg-[#009080] hover:text-white flex items-center"
          >
            <skill.icon className="w-4 h-4 mr-2" />
            {skill.name}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

const EducationCard = () => {
  return (
    <motion.div
      className="bg-[var(--timeline-background)] border border-transparent dark:border-white/[0.2] p-6 rounded-lg shadow-xl overflow-hidden"
      whileHover={"hover"}
      initial="initial"
      variants={cardVariants}
      transition={{ stiffness: 300 }}
    >
      <div className="flex items-center justify-between  mb-4">
        <motion.h3 className="relative text-2xl font-semibold text-[var(--timeline-text)] w-fit">
          BSc Computer Science
          <motion.span
            className="absolute bottom-0 left-0 w-full h-[2px] bg-[#009080]"
            variants={underlineVariants}
          />
        </motion.h3>
        <span className="font-thin">Sep 2021 - Jun 2025</span>
      </div>

      <div className="flex items-center justify-between  mb-4">
        <p className="font-medium">King's College London</p>
        <span className="font-thin">London, UK</span>
      </div>
      <motion.h4 className="relative text-lg font-semibold mb-2 flex items-center w-fit">
        Key Modules
      </motion.h4>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {[
          "Data Structures & Algorithms",
          "Internet Systems",
          "Software Engineering",
          "Machine Learning",
        ].map((module) => (
          <li key={module} className="flex items-center">
            <span className="w-2 h-2 bg-[#009080] rounded-full mr-2"></span>
            {module}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default function SkillsSection() {
  return (
    <>
      <div className="h-full flex flex-col md:mx-20 gap-20">
        <h1 className="relative inline-block px-1 py-1.5 text-7xl lg:text-8xl font-bold transition-colors duration-300 ease-in-out group h-fit w-fit">
          <span className="relative z-10 group-hover:text-white h-fit">
            Skills
          </span>
          <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 ease-in-out bg-[#009080] group-hover:h-full -z-10"></span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category) => (
            <SkillsCard category={category} />
          ))}
        </div>
      </div>
      <div className="flex flex-col md:mx-20 mt-20 gap-8 mb-20">
        <h1 className="relative inline-block px-1 py-1.5 text-5xl lg:text-6xl font-bold transition-colors duration-300 ease-in-out group h-fit w-fit">
          <span className="relative z-10 group-hover:text-white h-fit">
            Education
          </span>
          <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 ease-in-out bg-[#009080] group-hover:h-full -z-10"></span>
        </h1>
        <EducationCard />
      </div>
    </>
  );
}
