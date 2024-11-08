// components/ui/sidebar/CustomSidebar.tsx
import React, { Dispatch, SetStateAction } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { IconArrowLeft, IconBrandTabler, IconSettings, IconUserBolt } from "@tabler/icons-react";
import Image from "next/image";
import ThemeSwitch from "@/components/dashboard/ThemeSwitch";
import Link from "next/link";
import { motion } from 'framer-motion';

interface CustomSidebarProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const CustomSidebar: React.FC<CustomSidebarProps> = ({ open, setOpen }) => {
  const links = [
    {
      label: "Dashboard",
      href: "#",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Profile",
      href: "#",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Settings",
      href: "#",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];

  return (
    <Sidebar open={open} setOpen={setOpen} animate={false}>
      <SidebarBody className="justify-between gap-10">
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <Logo />
          <div className="mt-8 flex flex-col gap-2">
            {links.map((link, idx) => (
              <SidebarLink key={idx} link={link} />
            ))}
          </div>
        </div>
        <div>
          <SidebarLink
            link={{
              label: "Jiya Gupta",
              href: "#",
              icon: (
                <Image
                  src=""
                  className="h-7 w-7 flex-shrink-0 rounded-full"
                  width={50}
                  height={50}
                  alt="Avatar"
                />
              ),
            }}
          />
        </div>
      </SidebarBody>
    </Sidebar>
  );
};

const Logo = () => (
  <Link href="#" className="font-black flex space-x-2 gap-4 pt-10 items-center text-2xl text-black py-1 relative z-20">
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
