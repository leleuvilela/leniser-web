import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Dashboard from "@/components/Dashboard";

export const metadata: Metadata = {
    title:
        "Leniser Dashboard",
};

export default function Home() {

    return (
        <>
            <DefaultLayout>
                <Dashboard />
            </DefaultLayout>
        </>
    );
}
