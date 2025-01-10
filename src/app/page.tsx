"use client";
import ImageSection from "@/components/ImageSection";
import LandingText from "@/components/LandingText";
import ExploreButton from "@/components/ExploreButton";
import { SiteContext } from "@/context/SiteContext";
import { memo, useContext, useMemo } from "react";
import Link from "next/link";

export default function Home() {
	const {
		deviceType,
		showMobile,
		setShowMobile,
		expandedSection,
		setExpandedSection,
	} = useContext(SiteContext);

	const handleExpand = useMemo(
		() => (element: HTMLDivElement | null) => {
			setExpandedSection((prev) => (prev === element ? null : element));
		},
		[setExpandedSection]
	);

	return (
		<main
			className={`relative overflow-hidden ${
				expandedSection ? " active" : ""
			}`}>
			<section
				className={`relative ${
					expandedSection ? "h-dvh" : "min-h-dvh"
				}`}>
				{(deviceType === "tablet" ||
					deviceType === "desktop" ||
					!showMobile) && (
					<HeaderItem
						deviceType={deviceType}
						setShowMobile={setShowMobile}
					/>
				)}
				{(deviceType === "tablet" ||
					deviceType === "desktop" ||
					showMobile) && (
					<div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 min-h-dvh">
						<ImageSection
							heading={"Our<br> Approach"}
							description={
								"United by love for creativity and innovation,<br> our team is the driving force<br> behind the brand's success and<br> the creation of extraordinary seating solutions."
							}
							imgSrc="https://images.unsplash.com/photo-1554104707-a76b270e4bbb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
							onExpand={handleExpand}
							isExpanded={expandedSection}
						/>
						<ImageSection
							heading={"Our<br> Technology"}
							description={
								"United by love for creativity and innovation,<br> our team is the driving force<br> behind the brand's success and<br> the creation of extraordinary seating solutions."
							}
							imgSrc="https://images.unsplash.com/photo-1502743780242-f10d2ce370f3?q=80&w=2031&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
							onExpand={handleExpand}
							isExpanded={expandedSection}
						/>
						<ImageSection
							heading={"Our<br> Story"}
							description={
								"United by love for creativity and innovation,<br> our team is the driving force<br> behind the brand's success and<br> the creation of extraordinary seating solutions."
							}
							imgSrc="https://images.unsplash.com/photo-1428765048792-aa4bdde46fea?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
							onExpand={handleExpand}
							isExpanded={expandedSection}
						/>
						<ImageSection
							heading={"Our<br> Design Team"}
							description={
								"United by love for creativity and innovation,<br> our team is the driving force<br> behind the brand's success and<br> the creation of extraordinary seating solutions."
							}
							imgSrc="https://images.unsplash.com/photo-1503914068268-5413b35b45ad?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
							onExpand={handleExpand}
							isExpanded={expandedSection}
						/>
					</div>
				)}
			</section>
		</main>
	);
}

const HeaderItem = memo(function HeaderMenu({
	deviceType,
	setShowMobile,
}: any) {
	return (
		<div className="md:absolute md:top-0 md:left-0 w-full p-8 z-10 md:grid md:grid-cols-4 flex flex-col gap-4">
			<Link
				href={"/"}
				className="flex items-start justify-start font-normal text-lg gap-2">
				<svg
					width="24px"
					height="24px"
					viewBox="0 -2 32 32"
					fill="none"
					xmlns="http://www.w3.org/2000/svg">
					<path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M18.2627 26.9922L29.2549 16C31.085 14.1699 32 11.9607 32 9.37258C32 6.78442 31.085 4.57528 29.2549 2.74517C27.4247 0.915055 25.2155 0 22.6274 0C20.0392 0 17.8301 0.915055 16 2.74517C14.1699 0.915055 11.9607 0 9.37258 0C6.78442 0 4.57528 0.915055 2.74517 2.74517C0.915056 4.57528 0 6.78442 0 9.37258C0 11.9607 0.915056 14.1699 2.74517 16L13.7373 26.9922C14.9869 28.2418 17.0131 28.2418 18.2627 26.9922Z"
						fill="url(#paint0_radial_103_1602)"
					/>
					<defs>
						<radialGradient
							id="paint0_radial_103_1602"
							cx={0}
							cy={0}
							r={1}
							gradientUnits="userSpaceOnUse"
							gradientTransform="translate(8.07998 9.66157) rotate(59.8757) scale(18.7297 20.4872)">
							<stop stopColor="#FFAA00" />
							<stop offset={1} stopColor="#F05206" />
						</radialGradient>
					</defs>
				</svg>
				Visionary
			</Link>

			<LandingText
				className="header-copy max-md:text-3xl max-md:mt-10"
				text={`Where Form <br> and Function Unite`}
				textType="lines"
				animation={{
					duration: 1,
					stagger: 0.1,
					y: 70,
					opacity: 0,
				}}
			/>
			<div className="col-span-2 md:ps-8 max-md:mt-5 grid gap-8">
				<LandingText
					className="text-6xl md:text-5xl uppercase font-normal header-content"
					text={`ELEVATING COMFORT ${
						deviceType === "desktop" && "<br>"
					} WITH EVERY CURVE`}
					textType="lines"
					animation={{
						duration: 1,
						stagger: 0.5,
						y: 70,
						opacity: 0,
					}}
				/>

				<ExploreButton
					onClick={() => {
						if (deviceType !== "desktop") {
							setShowMobile(true);
						}
					}}
					fadeUp={deviceType !== "desktop"}
				/>
			</div>
		</div>
	);
});
