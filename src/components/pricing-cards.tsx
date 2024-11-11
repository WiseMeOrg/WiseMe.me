"use client"
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn, PLANS } from "@/utils";
import { motion } from "framer-motion";
import { CheckCircleIcon } from "lucide-react";
import Link from "next/link";
import { useState } from 'react';

type Tab = "monthly" | "yearly";

const PricingCards = () => {
    const MotionTabTrigger = motion(TabsTrigger);
    const [activeTab, setActiveTab] = useState<Tab>("monthly");

    // Reorder plans 
    const reorderedPlans = [
        PLANS[1], 
        PLANS[0], 
        PLANS[2]  
    ];

    return (
        <Tabs defaultValue="monthly" className="w-full flex flex-col items-center justify-center">
            <TabsList>
                <MotionTabTrigger
                    value="monthly"
                    onClick={() => setActiveTab("monthly")}
                    className="relative"
                >
                    {activeTab === "monthly" && (
                        <motion.div
                            layoutId="active-tab-indicator"
                            transition={{
                                type: "spring",
                                bounce: 0.5,
                            }}
                            className="absolute top-0 left-0 w-full h-full bg-background shadow-sm rounded-md z-10"
                        />
                    )}
                    <span className="z-20">Monthly</span>
                </MotionTabTrigger>
                <MotionTabTrigger
                    value="yearly"
                    onClick={() => setActiveTab("yearly")}
                    className="relative"
                >
                    {activeTab === "yearly" && (
                        <motion.div
                            layoutId="active-tab-indicator"
                            transition={{
                                type: "spring",
                                bounce: 0.5,
                            }}
                            className="absolute top-0 left-0 w-full h-full bg-background shadow-sm rounded-md z-10"
                        />
                    )}
                    <span className="z-20">Yearly</span>
                </MotionTabTrigger>
            </TabsList>

            {["monthly", "yearly"].map((tabValue) => (
                <TabsContent key={tabValue} value={tabValue} className="grid grid-cols-1 lg:grid-cols-3 gap-5 w-full md:gap-8 flex-wrap max-w-5xl mx-auto pt-6">
                    {reorderedPlans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.1,
                                ease: "easeOut"
                            }}
                            className="relative"
                        >
                            <Card
                                className={cn(
                                    "flex flex-col w-full border-border rounded-xl relative overflow-hidden",
                                    index === 1 && "border-2 border-[#6EC1E4]",
                                    index !== 1 && "blur-[3px] select-none pointer-events-none"
                                )}
                            >
                                {index !== 1 && (
                                    <div className="absolute -right-16 top-8 transform rotate-45 bg-[#6EC1E4] text-white py-1 w-52 text-center text-sm font-medium shadow-lg">
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.5 }}
                                        >
                                            Pro
                                        </motion.div>
                                    </div>
                                )}
                                <CardHeader className={cn(
                                    "border-b border-border",
                                    index === 1 ? "bg-[#6EC1E4]/[0.07]" : "bg-foreground/[0.03]"
                                )}>
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        <CardTitle className={cn(index !== 1 && "text-muted-foreground", "text-lg font-medium")}>
                                            {plan.name}
                                        </CardTitle>
                                        <CardDescription>
                                            {plan.info}
                                        </CardDescription>
                                        <h5 className="text-3xl font-semibold flex items-end">
                                            ${tabValue === "monthly" ? plan.price.monthly : plan.price.yearly}
                                            <div className="text-base text-muted-foreground font-normal">
                                                {plan.name !== "Free" ? `/${tabValue}` : ""}
                                            </div>
                                            {tabValue === "yearly" && plan.name !== "Free" && (
                                                <motion.span
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 10 }}
                                                    transition={{ duration: 0.3, type: "spring", bounce: 0.25 }}
                                                    className="px-2 py-0.5 ml-2 rounded-md bg-[#6EC1E4] text-foreground text-sm font-medium"
                                                >
                                                    -12%
                                                </motion.span>
                                            )}
                                        </h5>
                                    </motion.div>
                                </CardHeader>
                                <CardContent className="pt-6 space-y-4">
                                    {plan.features.map((feature, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 * idx + 0.5 }}
                                            className="flex items-center gap-2"
                                        >
                                            <CheckCircleIcon className="text-[#6EC1E4] w-4 h-4" />
                                            <TooltipProvider>
                                                <Tooltip delayDuration={0}>
                                                    <TooltipTrigger asChild>
                                                        <p className={cn(feature.tooltip && "border-b !border-dashed border-border cursor-pointer")}>
                                                            {feature.text}
                                                        </p>
                                                    </TooltipTrigger>
                                                    {feature.tooltip && (
                                                        <TooltipContent>
                                                            <p>{feature.tooltip}</p>
                                                        </TooltipContent>
                                                    )}
                                                </Tooltip>
                                            </TooltipProvider>
                                        </motion.div>
                                    ))}
                                </CardContent>
                                <CardFooter className="w-full mt-auto">
                                    <motion.div
                                        className="w-full"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.8 }}
                                    >
                                        {index === 1 ? (
                                            <Link
                                                href={plan.btn.href}
                                                className={buttonVariants({ className: "w-full bg-[#6EC1E4] hover:bg-[#6EC1E4]/80 text-white" })}
                                            >
                                                {plan.btn.text}
                                            </Link>
                                        ) : (
                                            <div className={cn(
                                                buttonVariants({ variant: "outline" }),
                                                "w-full cursor-not-allowed opacity-60"
                                            )}>
                                                Coming Soon
                                            </div>
                                        )}
                                    </motion.div>
                                </CardFooter>
                            </Card>
                            {index !== 1 && (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.5, type: "spring" }}
                                    className="absolute inset-0 flex items-center justify-center"
                                >
                                    <div className="bg-black/60 backdrop-blur-sm px-6 py-3 rounded-lg transform -rotate-12">
                                        <p className="text-white text-3xl font-bold tracking-wider">
                                            COMING SOON
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </TabsContent>
            ))}
        </Tabs>
    );
};

export default PricingCards;