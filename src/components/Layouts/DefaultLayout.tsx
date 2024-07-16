"use client";
import React, { useState, ReactNode } from "react";
import Sidebar from "@/components/Sidebar";

export default function DefaultLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <div className="flex">
                <Sidebar />

                <div className="relative flex flex-1 flex-col lg:ml-72">

                    <main>
                        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
