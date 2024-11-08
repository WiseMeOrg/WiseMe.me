// components/ui/sidebar/NavSidebar.tsx
import React, { Dispatch, SetStateAction } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/side-nav";
import { IconArrowLeft, IconBrandTabler, IconSettings, IconUserBolt } from "@tabler/icons-react";
import Image from "next/image";
import ThemeSwitch from "@/components/dashboard/ThemeSwitch";
import Link from "next/link";
import { motion } from 'framer-motion';
import { HomeIcon, MessageCircleReplyIcon, Waypoints, Compass, BarChart, CalendarDays, LogOut } from "lucide-react";
import default_user from '../../../public/assets/default_user.png'
interface NavSidebarProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const NavSidebar: React.FC<NavSidebarProps> = ({ open, setOpen }) => {
  const links = [
    {
      label: "Journey",
      href: "/journey",
      icon: (
        <Waypoints className="text-white bg-[#6EC1E4] p-2 rounded-sm w-[35px] h-[35px]" />

      ),
    },
    {
      label: "Analytics",
      href: "/analytics",
      icon: (
        <BarChart className="text-[#6EC1E4] bg-[#D9D9D9] bg-opacity-10 p-2 rounded-sm w-[35px] h-[35px]" />
      ),
    },
    {
      label: "Community",
      href: "/commmunity",
      icon: (
        <Compass className="text-[#6EC1E4] bg-[#D9D9D9] bg-opacity-10 p-2 rounded-sm w-[35px] h-[35px]" />
      ),
    },
    {
      label: "Setings",
      href: "/settings",
      icon: (
        <IconSettings className="text-[#6EC1E4] bg-[#D9D9D9] bg-opacity-10 p-2 rounded-sm w-[35px] h-[35px]" />
      ),
    },
    {
      label: "Calendar",
      href: "/calendar",
      icon: (
        <CalendarDays className="text-[#6EC1E4] bg-[#D9D9D9] bg-opacity-10 p-2 rounded-sm w-[35px] h-[35px]" />
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



        <div className="flex flex-col gap-10">

          <div className="flex flex-col gap-3 border-b-[1px] border-gray-600 py-6">
            <SidebarLink
              link={{
                label: "Jiya Gupta",
                href: "#",
                icon: (
                  <Image
                    src={default_user}
                    className="h-11 w-10 flex-shrink-0 rounded-sm"
                    width={60}
                    height={70}
                    alt="Avatar"
                  />
                ),
              }}
            />

            <LogOut className="text-[#6EC1E4] bg-[#D9D9D9] bg-opacity-10 p-2 rounded-sm w-[35px] h-[35px]" />
          </div>

          <ThemeSwitch />

        </div>
      </SidebarBody>
    </Sidebar>
  );
};

const Logo = () => (
  <Link href="#" className="font-normal flex  items-center text-sm text-black py-1 relative z-20">
    {/* <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" /> */}

    <HomeIcon className="text-white bg-gray-400 p-2 rounded-sm w-[35px] h-[35px]" />
  </Link>
);

export default NavSidebar;
