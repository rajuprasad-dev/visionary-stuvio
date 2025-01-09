"use client";
import CustomCursor from "@/components/CustomCursor";
import { SiteProvider } from "@/context/SiteContext";

type TemplateProps = {
	children: React.ReactNode;
};

const Template = ({ children }: TemplateProps) => {
	return (
		<SiteProvider>
			<CustomCursor />
			{children}
		</SiteProvider>
	);
};

export default Template;
