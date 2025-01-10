import { SiteContext } from "@/context/SiteContext";
import React, { useContext, useEffect, useState } from "react";

const CustomCursor: React.FC = () => {
	const { deviceType } = useContext(SiteContext);

	const [cursorSize, setCursorSize] = useState(25);

	useEffect(() => {
		const cursor = document.getElementById("custom-cursor");

		const handleMouseMove = (e: MouseEvent) => {
			if (cursor) {
				cursor.style.left = `${e.clientX}px`;
				cursor.style.top = `${e.clientY}px`;
			}
		};

		const handleMouseDown = () => setCursorSize(18);
		const handleMouseUp = () => setCursorSize(25);

		document.addEventListener("mousemove", handleMouseMove);
		document.addEventListener("mousedown", handleMouseDown);
		document.addEventListener("mouseup", handleMouseUp);

		return () => {
			document.removeEventListener("mousemove", handleMouseMove);
			document.removeEventListener("mousedown", handleMouseDown);
			document.removeEventListener("mouseup", handleMouseUp);
		};
	}, []);

	if (deviceType !== "desktop") return null;

	return (
		<div
			id="custom-cursor"
			style={{
				position: "fixed",
				width: `${cursorSize}px`,
				height: `${cursorSize}px`,
				transform: "translate(-50%, -50%)",
				transition: "width 0.2s ease, height 0.2s ease",
				pointerEvents: "none",
				animation: "rotate 40s linear infinite",
				zIndex: 9999,
			}}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 438.529 438.529"
				style={{
					width: "100%",
					height: "100%",
					fill: "black",
				}}>
				<path d="M421.833 285.36c-2.573-9.801-8.233-17.179-16.991-22.128l-75.944-43.966 75.944-43.968c8.758-4.949 14.421-12.322 16.991-22.126 2.566-9.803 1.379-19.082-3.572-27.836L399.99 93.932c-4.948-8.757-12.319-14.419-22.127-16.989-9.802-2.565-19.072-1.376-27.833 3.576l-75.944 43.677v-87.65c0-9.899-3.621-18.464-10.855-25.697C256 3.616 247.433 0 237.537 0h-36.54c-9.9 0-18.464 3.619-25.697 10.849-7.232 7.232-10.85 15.798-10.85 25.697v87.65l-75.945-43.68c-8.757-4.952-18.036-6.145-27.837-3.576-9.803 2.573-17.179 8.232-22.128 16.989l-18.271 31.405c-4.952 8.754-6.14 18.033-3.571 27.836 2.574 9.801 8.232 17.178 16.989 22.126l75.945 43.972-75.945 43.966c-8.757 4.949-14.419 12.323-16.989 22.128-2.568 9.801-1.377 19.075 3.571 27.829l18.272 31.408c4.947 8.761 12.32 14.421 22.126 16.995 9.805 2.562 19.08 1.375 27.837-3.58l75.945-43.681v87.655c0 9.891 3.617 18.466 10.85 25.694 7.233 7.234 15.8 10.848 25.697 10.848h36.54c9.896 0 18.466-3.613 25.693-10.848 7.238-7.229 10.855-15.804 10.855-25.694V314.34l75.944 43.681c8.761 4.948 18.031 6.143 27.833 3.573 9.804-2.574 17.179-8.23 22.127-16.991l18.271-31.405c4.953-8.76 6.141-18.037 3.574-27.838z" />
			</svg>
		</div>
	);
};

export default CustomCursor;
