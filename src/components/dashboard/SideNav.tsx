import React, { Dispatch, SetStateAction } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/side-nav";
import { IconSettings } from "@tabler/icons-react";
import Image from "next/image";
import ThemeSwitch from "@/components/dashboard/ThemeSwitch";
import Link from "next/link";
// import { useRouter } from 'next/router';
import { HomeIcon, Waypoints, BarChart, Compass, CalendarDays, LogOut } from "lucide-react";
import default_user from '../../../public/assets/default_user.png';
import { usePathname } from 'next/navigation'
import { useRouter } from "next/navigation";
import { useClerk } from "@clerk/nextjs";
import { motion } from "framer-motion";
interface NavSidebarProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const NavSidebar: React.FC<NavSidebarProps> = ({ open, setOpen }) => {
  const router = useRouter();

  const { user, signOut } = useClerk();

  const pathname = usePathname();
  const links = [
    {
      label: "Journey",
      href: "/dashboard/journey",
      icon: Waypoints,
    },
    {
      label: "Analytics",
      href: "/dashboard/analytics",
      icon: BarChart,
    },
    {
      label: "Community",
      href: "/dashboard/community",
      icon: Compass,
    },
    // {
    //   label: "Settings",
    //   href: "/dashboard/settings",
    //   icon: IconSettings,
    // },
    {
      label: "Calendar",
      href: "/dashboard/calendar",
      icon: CalendarDays,
    },
  ];

  return (
    <Sidebar open={open} setOpen={setOpen} animate={false}>
      <SidebarBody className="justify-between gap-10">
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <Logo />
          <div className="mt-8 flex flex-col gap-2">
            {links.map((link, idx) => {
              const isActive = pathname.includes(link.href);
              const IconComponent = link.icon;
              return (
                <motion.div initial={{ opacity: 0, x: 10, }} animate={{ opacity: 1, x: [-10, 5, 0], }} transition={{ duration: 0.7, ease: [0.4, 0.0, 0.2, 1], }} whileHover={{
                  y: -5,
                }}
                >
                  <SidebarLink
                    key={idx}
                    link={{
                      ...link,
                      icon: (
                        <IconComponent
                          className={`${isActive ? 'text-white bg-[#6EC1E4] shadow-md  shadow-[#6EC1E4]' : 'text-[#6EC1E4] bg-[#A7A9A7] dark:bg-[#D9D9D9] dark:bg-opacity-10 bg-opacity-10'
                            } p-2 rounded-sm w-[35px] h-[35px]`}
                        />
                      ),
                    }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-3 border-b-[1px] border-gray-600 py-6">
            <motion.div initial={{ opacity: 0, x: 10, }} animate={{ opacity: 1, x: [-10, 5, 0], }} transition={{ duration: 0.7, ease: [0.4, 0.0, 0.2, 1], }} whileHover={{
              y: -5,
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
            }}
            >
              <SidebarLink
                link={{
                  label: "Jiya Gupta",
                  href: "/dashboard/profile",
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
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 10, }} animate={{ opacity: 1, x: [-10, 5, 0], }} transition={{ duration: 0.7, ease: [0.4, 0.0, 0.2, 1], }} whileHover={{
              y: -5,
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
            }}
            >
              <LogOut onClick={() => signOut()} className="cursor-pointer text-[#6EC1E4] bg-[#D9D9D9] bg-opacity-10 p-2 rounded-sm w-[35px] h-[35px]" />
            </motion.div>
          </div>
          <ThemeSwitch />
        </div>
      </SidebarBody>
    </Sidebar>
  );
};

const Logo = () => (
  <Link href="/" className="font-normal flex items-center text-sm text-black py-1 relative z-20">
    <motion.div initial={{ opacity: 0, x: 10, }} animate={{ opacity: 1, x: [-10, 5, 0], }} transition={{ duration: 0.7, ease: [0.4, 0.0, 0.2, 1], }} whileHover={{
      y: -3,
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
    }}
    >
      <HomeIcon className="text-white bg-gray-400 p-2 rounded-sm w-[35px] h-[35px]" />
    </motion.div>
  </Link>
);

export default NavSidebar;
