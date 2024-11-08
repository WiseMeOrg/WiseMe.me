import { HelpCircleIcon, Timer, NewspaperIcon,MousePointer2, Check , UsersIcon, Calendar } from "lucide-react";

export const NAV_LINKS = [
    {
        title: "Features",
        href: "/features",
        menu: [
            {
                title: "AI-Powered Planner",
                tagline: "Integrates with Google Calendar for smart scheduling and task management.",
                href: "#features",
                icon: Calendar, // Replace with an appropriate calendar icon
            },
            {
                title: "Task Checklist",
                tagline: "Break down tasks into manageable steps and track your progress.",
                href: "#features",
                icon: Check, // Replace with a checklist icon
            },
            {
                title: "Schedule Customization",
                tagline: "Customize your schedule to optimize work-life balance based on your preferences.",
                href: "#features",
                icon: MousePointer2, // Replace with an icon for customization
            },
            {
                title: "Community Collaboration",
                tagline: "Connect with fellow developers learning at the same time and share knowledge.",
                href: "#features",
                icon: UsersIcon, // Replace with a users or community icon
            },
        ],
        
    },
    {
        title: "Pricing",
        href: "/pricing",
    },
    {
        title: "Resources",
        href: "/resources",
        menu: [
            {
                title: "Blog",
                tagline: "Read articles on the latest trends in tech.",
                href: "/resources/blog",
                icon: NewspaperIcon,
            },
            {
                title: "Help",
                tagline: "Get answers to your questions.",
                href: "/resources/help",
                icon: HelpCircleIcon,
            },
        ]
    }
];
