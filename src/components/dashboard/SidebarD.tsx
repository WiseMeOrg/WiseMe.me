// components/ui/sidebar/CustomSidebar.tsx
import React, { Dispatch, SetStateAction, use, useEffect } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { IconArrowLeft, IconBrandTabler, IconSettings, IconUserBolt } from "@tabler/icons-react";
import Image from "next/image";
import ThemeSwitch from "@/components/dashboard/ThemeSwitch";
import Link from "next/link";
import { motion } from 'framer-motion';
import { useState } from "react";
import { usePathname } from "next/navigation";
import path from "path";

interface CustomSidebarProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
interface LinkItem {
  label: string;
  href: string;
  icon: JSX.Element;
}

const CustomSidebar: React.FC<CustomSidebarProps> = ({ open, setOpen }) => {
  const pathName = usePathname();
  const [links, setLinks] = useState<LinkItem[]>([]);
  useEffect(() => {
    // Set the links based on the current path
    if (pathName.includes('/profile')) {
      setLinks([
        {
          label: "My Profile",
          href: "/dashboard/profile",
          icon: (
            <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
          ),
        },
        {
          label: "General Settings",
          href: "/dashboard/profile/settings",
          icon: (
            <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
          ),
        },
      ]);
    }
    else if (pathName.includes('/journey')) {
      setLinks([
        {
          label: "New",
          href: "/dashboard/journey/new",
          icon: (
            <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
          ),
        }
      ]);
    }
    else if (pathName.includes('/calendar')) {
      setLinks([
        {
          label: "View",
          href: "/dashboard/calendar",
          icon: (
            <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
          ),
        },
        {
          label: "Sync With Google Calendar",
          href: "",
          icon: (
            <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
          ),
        }
      ]);
    }
    else {
      setLinks([]);
    }
  }, [pathName]);


  return (
    <Sidebar open={open} setOpen={setOpen} animate={false}>
      <SidebarBody className="justify-between gap-10">
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <Logo />

          {/* <SidebarLink link={{ label: "New", href: "/dashboard/journey/new", icon: <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" /> }} /> */}

          <div className="mt-8 flex flex-col gap-2">
            {links?.length > 0 && links.map((link, idx) => (
              <motion.div
              key={idx} 
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: [10, -5, 0],
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.4, 0.0, 0.2, 1],
                  delay: idx * 0.3,
                }}
                className="text-2xl px-0 md:text-5xl w-[100%] lg:text-7xl font-semibold text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
              >
                <SidebarLink key={idx} link={link} />
              </motion.div>
            ))}
          </div>
        </div>
        {/* <div>
        </div> */}
      </SidebarBody>
    </Sidebar>
  );
};

const Logo = () => (
  <Link href="#" className="font-black flex space-x-2 gap-4 pt-10 items-center mb-8 text-2xl text-black py-1 relative z-20">
    <Image
      src="/assets/logo.png"
      alt="WiseMe"
      width={28}
      height={28}
      quality={100}
      className="rounded-sm bg-foreground/10  "
    />
    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-medium  text-black dark:text-white whitespace-pre">
      WiseMe
    </motion.span>
  </Link>
);

export default CustomSidebar;
