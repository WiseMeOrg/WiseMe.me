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
interface LinkItem {
  label: string;
  href: string;
  icon: JSX.Element;
}

const CustomSidebar: React.FC<CustomSidebarProps> = ({ open, setOpen }) => {
  const links : LinkItem[] = [
    // {
      //   label: "",
      //   href: "#",
      //   icon: (
      //     <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      //   ),
    // }
  ];

  return (
    <Sidebar open={open} setOpen={setOpen} animate={false}>
      <SidebarBody className="justify-between gap-10">
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <Logo />

    <SidebarLink link={ {label:"New", href:"/dashboard/journey/new",icon: <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />}} />

          <div className="mt-8 flex flex-col gap-2">
            {links?.length > 0 && links.map((link, idx) => (
              <SidebarLink key={idx} link={link} />
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
