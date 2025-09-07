import { NextIntlClientProvider } from "next-intl";
import React from "react";
import { Inter } from "next/font/google";
import "../globals.css";
import { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { AppSidebar } from "@/components/app-sidebar";
import {
    SidebarHeader,
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
});

const metaContent = {
    vi: {
        title: "Admin Panel | Enjoysport",
        description:
            "Hệ thống quản trị viên Enjoysport - Quản lý sự kiện thể thao, giải chạy, đạp xe và các hoạt động thể thao trên toàn quốc.",
        keywords: [
            "admin enjoysport",
            "quản trị",
            "sự kiện thể thao",
            "giải chạy",
            "đạp xe",
            "bơi lội",
            "marathon",
            "triathlon",
            "Enjoysport",
            "admin panel",
            "thể thao",
        ],
    },
    en: {
        title: "Admin Panel | Enjoysport",
        description:
            "Enjoysport Admin System - Manage sports events, running races, cycling and sports activities nationwide.",
        keywords: [
            "enjoysport admin",
            "admin panel",
            "sports events",
            "running race",
            "cycling",
            "swimming",
            "event management",
            "marathon",
            "triathlon",
            "Enjoysport",
            "administration",
        ],
    },
};

type GenerateMetadataProps = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({
    params,
}: GenerateMetadataProps): Promise<Metadata> {
    const { locale } = await params;
    const meta = metaContent[locale === "en" ? "en" : "vi"];

    return {
        title: meta.title,
        description: meta.description,
        openGraph: {
            title: meta.title,
            description: meta.description,
            images: [
                {
                    url: "https://enjoysport.vn/admin-logo.jpg",
                },
            ],
            url: process.env.NEXT_PUBLIC_DOMAIN || "https://admin.enjoysport.vn",
            type: "website",
        },
        alternates: {
            canonical: process.env.NEXT_PUBLIC_DOMAIN || "https://admin.enjoysport.vn",
        },
        keywords: meta.keywords,
        robots: {
            index: false,
            follow: false,
            nocache: true,
            googleBot: {
                index: false,
                follow: false,
                noimageindex: true,
            },
        },
        authors: [{ name: "Enjoysport Admin" }],
        publisher: "Enjoysport",
        other: {
            homepage: process.env.NEXT_PUBLIC_DOMAIN || "https://admin.enjoysport.vn",
        },
    };
}

export default async function RootLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}>) {
    const { locale } = await params;

    return (
        <html lang={locale} suppressHydrationWarning>
            <body className={`${inter.className} antialiased`}>
                <NextIntlClientProvider>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <SidebarProvider
                            style={
                                {
                                    "--sidebar-width": "calc(var(--spacing) * 72)",
                                    "--header-height": "calc(var(--spacing) * 12)",
                                } as React.CSSProperties
                            }
                        >
                            <AppSidebar variant="inset" />
                            <SidebarInset>
                                {children}
                            </SidebarInset>
                        </SidebarProvider>
                    </ThemeProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
