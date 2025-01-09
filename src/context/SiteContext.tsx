import React, { createContext, useState, useEffect } from "react";

interface SiteContextType {
	showMobile: boolean;
	setShowMobile: React.Dispatch<React.SetStateAction<boolean>>;
	deviceType: "mobile" | "tablet" | "desktop";
	setDeviceType: React.Dispatch<
		React.SetStateAction<"mobile" | "tablet" | "desktop">
	>;
}

export const SiteContext = createContext<SiteContextType>({
	showMobile: false,
	setShowMobile: () => {},
	deviceType: "desktop",
	setDeviceType: () => {},
});

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [showMobile, setShowMobile] = useState(false);
	const [deviceType, setDeviceType] = useState<
		"mobile" | "tablet" | "desktop"
	>("desktop");

	useEffect(() => {
		const updateDeviceType = () => {
			const width = window.innerWidth;
			if (width < 768) {
				setDeviceType("mobile");
			} else if (width >= 768 && width < 1024) {
				setDeviceType("tablet");
			} else {
				setDeviceType("desktop");
			}
		};

		updateDeviceType();

		window.addEventListener("resize", updateDeviceType);

		return () => {
			window.removeEventListener("resize", updateDeviceType);
		};
	}, []);

	return (
		<SiteContext.Provider
			value={{ showMobile, setShowMobile, deviceType, setDeviceType }}>
			{children}
		</SiteContext.Provider>
	);
};
