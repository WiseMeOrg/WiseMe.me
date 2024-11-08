import { MousePointer2, WandSparklesIcon, Car } from "lucide-react";

export const DEFAULT_AVATAR_URL = "https://api.dicebear.com/8.x/initials/svg?backgroundType=gradientLinear&backgroundRotation=0,360&seed=";

export const PAGINATION_LIMIT = 10;


export const PROCESS = [
    {
        title: "Choose your Tech",
        description: "Choose your destination to craft your journey's roadmap",
        icon: MousePointer2,
    },
    {
        title: "Dive with AI",
        description: "Tell about your time constraints, about your busy schedule, your methodology to learn something,",
        icon: WandSparklesIcon,
    },
    {
        title: "Lets Go !!!",
        description: "Get your personalised crafted journey. Optimize, Learn, Connect, Achieve",
        icon: Car,
    },
] as const;


