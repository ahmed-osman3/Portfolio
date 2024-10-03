"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, Variants } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

type PresetType = "slide";

type TextEffectProps = {
  children: string;
  preset?: PresetType;
};

const defaultContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
  exit: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const presetVariants: Record<PresetType, Variants> = {
  slide: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  },
};

const AnimationComponent: React.FC<{
  segment: string;
  variants: Variants;
  underline?: boolean;
}> = React.memo(({ segment, variants, underline }) => {
  // Regex to identify emoji characters
  const isEmoji = /\p{Emoji}/u.test(segment); // Updated regex for better detection

  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const elementRef = useRef<HTMLSpanElement>(null);

  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (isReversing: boolean) => ({
      pathLength: isReversing ? 0 : 1,
      opacity: 1,
      transition: {
        pathLength: { type: "spring", duration: 2, bounce: 0 },
        opacity: { duration: 0.5 },
      },
    }),
  };

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleAnimationEnd = () => setIsAnimating(false);
    element.addEventListener("animationend", handleAnimationEnd);

    return () => {
      element.removeEventListener("animationend", handleAnimationEnd);
    };
  }, []);

  const handleMouseEnter = () => {
    if (underline) setIsHovered(true);

    if (isEmoji && !isAnimating) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsAnimating(false);
      }, 2500);
    }
  };

  return (
    <motion.span
      variants={variants}
      className={cn(
        isEmoji ? `wave ${isAnimating ? "waveAnimate" : ""}` : "",
        underline ? `relative text-[#009080] ` : "",
        "inline-block whitespace-pre"
      )}
      ref={isEmoji ? elementRef : undefined}
      onMouseEnter={isEmoji || underline ? handleMouseEnter : undefined}
      onMouseLeave={underline ? () => setIsHovered(false) : undefined}
    >
      {underline && (
        <motion.svg
          aria-hidden="true"
          viewBox="0 0 418 42"
          className="absolute left-0 top-1/3 fill-teal-500"
          preserveAspectRatio="xMidYMid meet"
          width="100%"
          height="100%"
          initial="hidden"
          animate="visible"
        >
          <motion.path
            d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203"
            variants={draw}
            custom={isHovered}
            strokeWidth="4"
            fill="none"
            stroke="#009080"
          />
        </motion.svg>
      )}
      {segment}
    </motion.span>
  );
});

AnimationComponent.displayName = "AnimationComponent";

export function TextEffect({ children, preset = "slide" }: TextEffectProps) {
  const segments = children.split(/(\s+)/); // Split by whitespace for words

  const MotionTag = motion.h3; // Use 'h3' as specified
  const selectedVariants = presetVariants[preset];

  return (
    <AnimatePresence mode="popLayout">
      <MotionTag
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={defaultContainerVariants}
        className={cn("whitespace-pre-wrap text-4xl sm:text-6xl md:text-8xl")}
      >
        <AnimationComponent
          key={`word-${0}-Hi,`}
          segment={"Hi, "}
          variants={selectedVariants}
        />
        <AnimationComponent
          key={`word-${1}-I'm`}
          segment={"I'm "}
          variants={selectedVariants}
        />
        <AnimationComponent
          key={`word-${2}-Ahmed`}
          segment={"Ahmed "}
          variants={selectedVariants}
          underline
        />
        <AnimationComponent
          key={`word-${3}-👋`}
          segment={"👋"}
          variants={selectedVariants}
        />
      </MotionTag>
    </AnimatePresence>
  );
}
