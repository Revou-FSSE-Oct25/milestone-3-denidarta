import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import GlobalNavigation from "@/component/GlobalNavigation";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
	subsets: ["latin"],
	variable: "--font-bricolage",
});

export const metadata: Metadata = {
	title: "RevoShop",
	description: "Student assignment milestone 3",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} ${bricolage.variable} antialiased`}
			>
				<GlobalNavigation />
				{children}
			</body>
		</html>
	);
}
