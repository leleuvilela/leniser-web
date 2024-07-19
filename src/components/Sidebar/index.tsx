"use client";

import React from "react";
import Link from "next/link";
import SidebarItem from "@/components/Sidebar/SidebarItem";
import useLocalStorage from "@/hooks/useLocalStorage";
import { MdDashboard, MdSettings, MdPeople } from "react-icons/md";

const menuGroups = [
    {
        name: "MENU",
        menuItems: [
            {
                icon: <MdDashboard />,
                label: "Dashboard",
                route: "/",
            },
            {
                icon: <MdPeople />,
                label: "Members",
                route: "/members",
            }
        ],
    },
    {
        name: "CONFIGS",
        menuItems: [
            {
                icon: <MdSettings />,
                label: "Settings",
                route: "/settings",
            }
        ]
    }
];

const Sidebar = () => {
    const [pageName, setPageName] = useLocalStorage("selectedMenu", "dashboard");

    return (
        <aside
            className={`fixed left-0 top-0 z-9999 flex h-screen w-72 flex-col overflow-y-hidden bg-lime-100 duration-300 ease-linear dark:bg-boxdark translate-x-0
                }`}
        >
            <div className="flex items-center justify-center gap-2 px-6 py-5 lg:py-6">
                <Link href="/">
                    <h2 className="font-bold text-2xl text-center">Leniser</h2>
                </Link>
            </div>

            <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
                <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
                    {menuGroups.map((group, groupIndex) => (
                        <div key={groupIndex}>
                            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
                                {group.name}
                            </h3>

                            <ul className="mb-6 flex flex-col gap-1.5">
                                {group.menuItems.map((menuItem, menuIndex) => (
                                    <SidebarItem
                                        key={menuIndex}
                                        item={menuItem}
                                        pageName={pageName}
                                        setPageName={setPageName}
                                    />
                                ))}
                            </ul>
                        </div>
                    ))}
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;
