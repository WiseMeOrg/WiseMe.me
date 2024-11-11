// app/layout.tsx
"use client";
import React, { useState } from "react";
import CustomSidebar from "@/components/dashboard/SidebarD";
import { cn } from "@/utils";
import { ThemeProvider } from "next-themes";
import NavSidebar from "@/components/dashboard/SideNav";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathName = usePathname();
  // const hideSidebarRoutes = [
  //   "",
  //   // "/community", "/analytics"
  // ]; 
  // const shouldRenderSidebar = hideSidebarRoutes.some(route => pathName.includes(route));


  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div
        className={cn(
          "flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 border border-neutral-200 dark:border-neutral-700 overflow-hidden",
          "h-screen"
        )}
      >
        <NavSidebar open={open} setOpen={setOpen} />
        {
        // !shouldRenderSidebar && 

        <CustomSidebar open={open} setOpen={setOpen} />
        }


        <div className="flex flex-1 h-screen w-screen">
          <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-[#383b42] flex flex-col gap-2 flex-1 w-full h-full">
            {children}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
