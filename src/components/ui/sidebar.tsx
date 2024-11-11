"use client";
import { cn } from "@/utils";
import Link, { LinkProps } from "next/link";
import React, { useState, createContext, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconHome, IconMenu2, IconX } from "@tabler/icons-react";

interface Links {
  label: string;
  href: string;
  icon: React.JSX.Element | React.ReactNode;
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

  const mobileNavLinks = [
    {
      label: "Home",
      href: "/home",
      icon: <IconHome />,
    },
    {
      label: "Profile",
      href: "/profile",
      icon: <IconHome />,
    },
    {
      label: "Settings",
      href: "/settings",
      icon: <IconHome />,
    },
  ];

  return (
    <>
      <DesktopSidebar {...props} />
      {/* <MobileSidebar {...(props as React.ComponentProps<"div">)} /> */}
      <MobileSidebar
        navLinks={mobileNavLinks} // Pass the navLinks array here
        className="custom-class"
      // open={open}
      // setOpen={setOpen}
      // animate={animate}
      >
        {/* Optional children */}
      </MobileSidebar>
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
        "h-10 px-4 py-4 flex flex-row md:hidden items-center justify-between bg-neutral-100 dark:bg-neutral-800 w-full",
        className
      )}
      {...props} // Spread remaining custom props here
    >
      <div className="flex justify-end z-20 w-full">
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
                  <SidebarLink key={index} link={link} />
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

  return (
    <motion.div initial={{ opacity: 0, x: 10, }} animate={{ opacity: 1, x: [-20, 5, 0], }} transition={{ duration: 0.8, delay: 0.6, ease: [0.4, 0.0, 0.2, 1], }}>

      <Link
        href={link.href}
        className={cn(
          "flex items-center justify-start gap-2  group/sidebar py-2 bg-[#6EC1E4] bg-opacity-30 rounded-md p-3",
          className
        )}
        {...props}
      >
        {link.icon}

        <motion.span
          animate={{
            display: (open ? "inline-block" : "none"),
            opacity: (open ? 1 : 0),
          }}
          className="text-neutral-700 dark:text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
        >
          {link.label}
        </motion.span>
      </Link>
    </motion.div>

  );
};
