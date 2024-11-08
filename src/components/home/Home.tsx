"use client";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "../ui/hero-highlight";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
export function HeroHighlightDemo() {
  return (
    <HeroHighlight>
      <motion.h1
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="text-2xl px-0 md:text-5xl w-[100%] lg:text-7xl font-semibold text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
      > 
        Accelerate Your Learning Journey with{" "}
        <Highlight className="text-black dark:text-white">
        Power Of AI
        </Highlight>
        <p className="mb-8 mt-8 text-lg tracking-tight text-muted-foreground md:text-xl text-balance">
                            Creaft your Personalised Learning Roadmap at WiseMe
                            <br className="hidden md:block" />
                            <span className="hidden md:block">Optimize . Learn . Connect . Achieve</span>
                        </p>
                        <div className="flex items-center justify-center whitespace-nowrap gap-4 z-50">
                            <Button asChild>
                                <Link href="#waitlist" className="flex items-center">
                                    Craft Your Jounrney Now
                                    <ArrowRightIcon className="w-4 h-4 ml-2" />
                                </Link>
                            </Button>
                            </div>

      </motion.h1>
      
    </HeroHighlight>
  );
}
