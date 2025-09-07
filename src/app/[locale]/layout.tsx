import { NextIntlClientProvider } from "next-intl";
import React from "react";
import { Inter } from "next/font/google";
import "../globals.css";
import { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
});

const metaContent = {
    vi: {
        title: "Trang chủ | Vietnam MTB Series",
        description:
            "Khám phá các sự kiện thể thao, giải chạy, đạp xe, bơi lội và nhiều hoạt động hấp dẫn khác trên toàn quốc. Đăng ký, theo dõi và cập nhật thông tin sự kiện mới nhất cùng MTB Series.",
        keywords: [
            "sự kiện thể thao",
            "giải chạy",
            "đạp xe",
            "bơi lội",
            "marathon",
            "triathlon",
            "MTB Series",
            "Vietnam",
            "giải đua",
            "thể thao",
        ],
    },
    en: {
        title: "Home | Vietnam MTB Series",
        description:
            "Discover sports events, running races, cycling, swimming and many other exciting activities nationwide. Register, follow and update the latest event information with MTB Series.",
        keywords: [
            "sports events",
            "running race",
            "cycling",
            "swimming",
            "event",
            "marathon",
            "triathlon",
            "MTB Series",
            "Vietnam",
            "race",
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
                    url: "https://enjoysport.vn/_next/image?url=https%3A%2F%2Fhcm03.vstorage.vngcloud.vn%2Fv1%2FAUTH_63bc1636b6fd456893cd154b1d53ded7%2Fticket%2F51mpSQdA.jpg&w=1920&q=75",
                },
            ],
            url: process.env.NEXT_PUBLIC_DOMAIN || "https://mtbseries.vn",
            type: "website",
        },
        alternates: {
            canonical: process.env.NEXT_PUBLIC_DOMAIN || "https://mtbseries.vn",
        },
        keywords: meta.keywords,
        robots: {
            index: true,
            follow: true,
            nocache: false,
            googleBot: {
                index: true,
                follow: true,
                noimageindex: false,
            },
        },
        authors: [{ name: "MTB Series" }],
        publisher: "MTB Series",
        other: {
            homepage: process.env.NEXT_PUBLIC_DOMAIN || "https://mtbseries.vn",
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
                            {children}
                        </SidebarProvider>
                    </ThemeProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
