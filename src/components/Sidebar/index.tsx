"use client";

import React from "react";
import Link from "next/link";
import { BotIcon, UsersIcon, SettingsIcon, LayoutDashboardIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";

const menuItems = [
    {
        icon: <LayoutDashboardIcon className="h-5 w-5" />,
        label: "Dashboard",
        route: "/",
    },
    {
        icon: <UsersIcon className="h-5 w-5" />,
        label: "Members",
        route: "/members",
    },
    {
        icon: <SettingsIcon className="h-5 w-5" />,
        label: "Settings",
        route: "/settings",
    },
    {
        icon: <ReportIcon />,
        label: "Reports",
        route: "/reports",
    }
];



const Sidebar = () => {
    const currentRoute = usePathname();

    return (
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
            <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
                <TooltipProvider>
                    <Link
                        href="#"
                        className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                        prefetch={false}
                    >
                        <BotIcon className="h-4 w-4 transition-all group-hover:scale-110" />
                        <span className="sr-only">Bot Admin</span>
                    </Link>
                    {menuItems.map((item) => (
                        <Tooltip key={item.route}>
                            <TooltipTrigger asChild>
                                <Link
                                    href={item.route}
                                    className={`flex h-9 w-9 items-center justify-center rounded-lg text-accent-foreground transition-colors ${currentRoute === item.route ? 'bg-accent' : ''} hover:text-foreground md:h-8 md:w-8`}
                                    prefetch={false}

                                >
                                    {item.icon}
                                    <span className="sr-only">{item.label}</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">{item.label}</TooltipContent>
                        </Tooltip>
                    ))}
                </TooltipProvider>
            </nav>
        </aside>
    );
};

function ReportIcon() {
    return (
        <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
            <path d="M10 9H8" />
            <path d="M16 13H8" />
            <path d="M16 17H8" />
        </svg>
    )
}
export default Sidebar;
