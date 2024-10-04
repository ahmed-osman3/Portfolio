import { LinkedInLogoIcon } from "@radix-ui/react-icons";
import React from "react";

function AboutSection() {
  return (
    <div className="h-full flex flex-col sm:flex-row md:mx-20 gap-20  sm:justify-between ">
      <h1 className="relative inline-block px-1 py-1.5 text-4xl text-center md:text-start sm:text-6xl md:text-8xl font-bold transition-colors duration-300 ease-in-out group h-fit ">
        <span className="relative z-10 group-hover:text-white">About Me</span>
        <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 ease-in-out bg-[#009080] group-hover:h-full -z-10"></span>
      </h1>

      <p className="text-lg text-center sm:text-start sm:max-w-[40%] xl:max-w-[50%]">
        I'm a Full-Stack Developer with{" "}
        <span className="bg-[#009080]">3+ years</span> of experience, currently
        wrapping up a Bachelor's in Computer Science at{" "}
        <span className="bg-[#009080]">King's College London</span>
        .
        <br />
        <br />
        As a software engineer I enjoy creating products and turning ideas into
        solutions that are{" "}
        <span className="bg-[#009080]">scalable, efficient and sleek</span>
        !
        <br />
        <br />
        In today's fast-paced world, keeping up with the latest technologies is
        crucial, and I'm always learning and evolving to stay ahead of the curve
        .
        <br />
        <br />
        When I'm not coding and fueled by coffee, you'll likely find me swimming
        or at the gym 💪.
        <br />
        <br />
        <span className="flex flex-row items-center gap-4 text-lg justify-center md:justify-normal">
          You can also find me on
          <a
            href="https://www.linkedin.com/in/ahmed-osman-abd/"
            target={"_blank"}
          >
            <LinkedInLogoIcon
              className=" text-white/[0.5] hover:text-white transition duration-100 p-0 cursor-pointer"
              height={"2rem"}
              width={"2rem"}
            />
          </a>
        </span>
      </p>
    </div>
  );
}

export default AboutSection;
