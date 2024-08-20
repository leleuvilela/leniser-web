"use client";
import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/style.css";
import React, { useState } from "react";
import Loader from "@/components/common/Loader";
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { QueryClientProvider } from "react-query";
import { queryClient } from "@/lib/query";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
})


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [loading] = useState<boolean>(false);

    return (
        <html lang="en">
            <body suppressHydrationWarning={true} className={cn("font-sans antialiased", fontSans.variable)}>
                <QueryClientProvider client={queryClient}>
                    <div className="dark:bg-boxdark-2 dark:text-bodydark">
                        {loading ? <Loader /> : children}
                    </div>
                    <Toaster />
                </QueryClientProvider>
            </body>
        </html>
    );
}
