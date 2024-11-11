"use client";
import { cn } from "@/utils";
import Link, { LinkProps } from "next/link";
import React, { useState, createContext, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconHome, IconMenu2, IconX } from "@tabler/icons-react";
import { HomeIcon, Waypoints, BarChart, Compass, CalendarDays, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";

interface Links {
  label: string;
  href: string;
  icon: React.JSX.Element | React.ReactNode;
  children?: Links[]; // Nested links
}

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined
);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  const [openState, setOpenState] = useState(false);

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate: animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({
  children,
  open,
  setOpen,
  animate,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
};

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
  const mobileNavLinks: Links[] = [
    {
      label: "Home",
      href: "/dashboard/journey",
      icon: <HomeIcon className="text-white bg-gray-400 p-2 rounded-sm w-[35px] h-[35px]" />,
    },
    {
      label: "Journey",
      href: "/dashboard/journey",
      icon: <IconHome className="text-neutral-800 dark:text-neutral-200" />,
      children: [
        {
          label: "New",
          href: "/dashboard/journey/new",
          icon: <IconHome className="text-neutral-800 dark:text-neutral-200" />,
        }
      ],
    },
    {
      label: "Analytics",
      href: "/dashboard/analytics",
      icon: <IconHome className="text-neutral-800 dark:text-neutral-200" />,
    },
    {
      label: "Community",
      href: "/dashboard/community",
      icon: <IconHome className="text-neutral-800 dark:text-neutral-200" />,
    },
    {
      label: "Calendar",
      href: "/dashboard/calendar",
      icon: <IconHome />,
    },
    {
      label: "Profile",
      href: "/dashboard/profile",
      icon: <IconHome className="text-neutral-800 dark:text-neutral-200" />,
      children: [
        {
          label: "General Settings",
          href: "/dashboard/profile/settings",
          icon: <IconHome className="text-neutral-800 dark:text-neutral-200" />,
        },
      ],
    },
  ];

  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar
        navLinks={mobileNavLinks}
        className="custom-class"
      />
    </>
  );
};

export const DesktopSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) => {
  const { open, setOpen, animate } = useSidebar();
  return (
    <>
      <motion.div
        className={cn(
          "h-full px-4 py-4 hidden  md:flex md:flex-col bg-neutral-100 dark:bg-[#292A2E] w-[370px] flex-shrink-0",
          className
        )}
        animate={{
          width: animate ? (open ? "370px" : "60px") : "370px",
        }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        {...props}
      >
        {children}
      </motion.div>
    </>
  );
};

export const MobileSidebar = ({
  className,
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate,
  navLinks, // Accept navLinks as a prop
  ...props
}: {
  className?: string;
  children?: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
  navLinks?: Links[]; // Define type for navLinks as an array of Links
  [key: string]: any; // Accepting additional custom props
}) => {
  const { open, setOpen } = useSidebar();
  const sidebarOpen = openProp !== undefined ? openProp : open;
  const sidebarSetOpen = setOpenProp !== undefined ? setOpenProp : setOpen;

  return (
    <div
      className={cn(
        "h-12 px-4 py-4 flex flex-row md:hidden items-center justify-between bg-neutral-100 dark:bg-neutral-800 w-full",
        className
      )}
      {...props} // Spread remaining custom props here
    >
      <div className="flex justify-between z-20 w-full items-center">
       
      <Link href="#" className="font-black flex space-x-2 gap-4 items-center text-xl text-black  z-20">
    <Image
      src="/assets/logo.png"
      alt="WiseMe"
      width={24}
      height={24}
      quality={100}
      className="rounded-sm bg-foreground/10  "
    />
    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-medium  text-black dark:text-white whitespace-pre">
      WiseMe
    </motion.span>
  </Link>
  

        <IconMenu2
          className="text-neutral-800 dark:text-neutral-200"
          onClick={() => sidebarSetOpen(!sidebarOpen)}
        />
      </div>
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            className={cn(
              "fixed h-full w-full inset-0 bg-white dark:bg-neutral-900 p-10 z-[100] flex flex-col justify-between",
              className
            )}
          >
            <div
              className="absolute right-10 top-10 z-50 text-neutral-800 dark:text-neutral-200"
              onClick={() => sidebarSetOpen(!sidebarOpen)}
            >
              <IconX />
            </div>
            {navLinks && (
              <div className="flex flex-col gap-4 mt-12">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: [-20, 5, 0] }}
                    transition={{ delay: index * 0.3, duration: 0.8, ease: [0.4, 0.0, 0.2, 1] }}
                  >
                    <SidebarLink link={link} />
                    {link.children && (
                      <div className="ml-8">
                        {link.children.map((childLink, childIndex) => (
                          <motion.div
                            key={childIndex}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: [-20, 5, 0] }}
                            transition={{ delay: (index + childIndex) * 0.3, duration: 0.8, ease: [0.4, 0.0, 0.2, 1] }}
                            className="mt-3"
                          >
                            <SidebarLink link={childLink} />
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const SidebarLink = ({
  link,
  className,
  ...props
}: {
  link: Links;
  className?: string;
  props?: LinkProps;
}) => {
  const { open, animate } = useSidebar();
  const pathname = usePathname();

  // Check if the current path includes the link's href
  const isActive = pathname.includes(link.href);

  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: [-20, 5, 0] }}
      transition={{ duration: 0.8, delay: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
    >
      <Link
        href={link.href}
        className={cn(
          "flex items-center justify-start gap-2 group/sidebar py-2 rounded-md p-3",
          isActive
            ? "bg-[#6EC1E4] bg-opacity-70"
            : "bg-[#6EC1E4] bg-opacity-30 hover:bg-opacity-100",
          className
        )}
        {...props}
      >
        {link.icon}
        <motion.span
          animate={{
            display: "inline-block",
            opacity: 1,
          }}
          className={cn(
            "text-sm transition duration-150 whitespace-pre inline-block !p-0 !m-0",
            isActive
              ? "text-white"
              : "text-neutral-700 dark:text-neutral-200 group-hover/sidebar:translate-x-1"
          )}
        >
          {link.label}
        </motion.span>
      </Link>
    </motion.div>
  );
};