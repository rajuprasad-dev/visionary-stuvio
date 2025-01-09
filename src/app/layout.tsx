import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.scss";

const geistSans = Jost({
	subsets: ["latin"],
});
export const metadata: Metadata = {
	title: "Visionary - Stuvio",
	description: "Visionary - Stuvio | Project",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${geistSans.className} antialiased`}>
				{children}
			</body>
		</html>
	);
}
