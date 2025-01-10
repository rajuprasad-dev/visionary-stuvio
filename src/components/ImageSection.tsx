"use client";
import React, { useContext, useEffect, useRef } from "react";
import { gsap } from "gsap";
import LandingText from "./LandingText";
import CircularImage from "./CircularImage";
import { SiteContext } from "@/context/SiteContext";

const ImageSection = ({
	id = null,
	heading = "",
	description = "",
	imgSrc = "",
	isExpanded = null,
	onExpand = () => {},
	setExpandedId = () => {},
}: {
	id: number | null;
	heading: string;
	description: string;
	imgSrc: string;
	isExpanded: HTMLDivElement | null;
	onExpand: (isExpanded: HTMLDivElement | null) => void;
	setExpandedId: (id: number | null) => void;
}) => {
	const overlay = useRef<HTMLImageElement | null>(null);
	const container = useRef<HTMLDivElement | null>(null);
	const wrapper = useRef<HTMLDivElement | null>(null);
	const desc = useRef<any>(null);
	const circluarImg = useRef<any>(null);
	const { deviceType } = useContext(SiteContext);

	useEffect(() => {
		const element = container.current;

		if (element) {
			gsap.to(element, {
				opacity: 1,
				y: "0px",
				duration: 1,
				ease: "power2.out",
			});
		}
	}, []);

	useEffect(() => {
		const element = wrapper.current;

		if (element) {
			if (isExpanded) {
				gsap.to(element, {
					opacity: isExpanded !== element ? 0 : 1,
					y: isExpanded !== element ? "20px" : "0px",
					pointerEvents: isExpanded !== element ? "none" : "",
					duration: 0.6,
					ease: "power2.out",
				});
			} else {
				gsap.to(element, {
					opacity: 1,
					y: "0px",
					pointerEvents: "auto",
					duration: 0.6,
					ease: "power2.out",
				});
			}
		}
	}, [isExpanded]);

	const handleMouseEnter = () => {
		if (overlay.current && deviceType === "desktop") {
			gsap.to(overlay.current, {
				clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
				y: "0",
				opacity: 1,
				duration: 0.8,
				ease: "power4.out",
			});
		}
	};

	const handleMouseLeave = () => {
		if (overlay.current && !isExpanded && deviceType === "desktop") {
			gsap.to(overlay.current, {
				clipPath: "polygon(0 0, 100% 0, 100% 4%, 0 4%)",
				duration: 0.6,
				y: "-20px",
				ease: "power3.in",
				onComplete: () => {
					gsap.set(overlay.current, {
						clipPath:
							"polygon(0 99.9%, 100% 99.9%, 100% 100%, 0 100%)",
						transform: "translateY(200px)",
					});
				},
			});
		}
	};

	const handleOpen = () => {
		const element = container.current;
		const wrapperElem = wrapper.current;

		if (element && wrapperElem) {
			const { innerWidth, innerHeight } = window;
			const { left } = wrapper.current?.getBoundingClientRect() || {
				left: 0,
			};

			gsap.to(element, {
				width: `${innerWidth + 1}px`,
				height: `${innerHeight}px`,
				left: `${-left - 2}px`,
				duration: 0.8,
				ease: "power4.out",
				position: "absolute",
				onComplete: () => {},
			});
			const animteText = wrapper.current?.querySelector(".animte-text");
			if (animteText) {
				animteText.classList.add("!text-6xl");
			}
			desc.current?.trigger();
			circluarImg.current?.handleTrigger();

			const wrapperEle = wrapper.current;
			if (wrapperEle) {
				wrapperEle.classList.add("active-section");
				onExpand(wrapperEle ?? null);
				setExpandedId(id);
			}
		}
	};

	const handleClose = () => {
		const element = container.current;
		const wrapperElem = wrapper.current;

		if (element && wrapperElem) {
			wrapper.current?.classList.remove("active-section");

			gsap.to(element, {
				width: "100%",
				height: "100%",
				left: "0",
				position: "relative", // Reset to original positioning
				duration: 0.8,
				ease: "power4.out",
				onComplete: () => {},
			});
			const animteText = wrapper.current?.querySelector(".animte-text");
			if (animteText) {
				animteText.classList.remove("!text-6xl");
			}
			desc.current?.reverse();
			circluarImg.current?.handleReverse();
			onExpand(null);
			setExpandedId(null);
		}
	};

	const handleClick = () => {
		const element = container.current;

		if (element) {
			if (isExpanded !== wrapper.current) {
				handleOpen();
			} else {
				handleClose();
			}
		}
	};

	return (
		<div
			ref={wrapper}
			className="relative cursor-pointer h-full max-sm:h-dvh image-section"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onClick={handleClick}>
			<div
				ref={container}
				className="relative p-10 overflow-hidden flex items-end h-full max-sm:h-dvh opacity-0 translate-y-5">
				<img
					ref={overlay}
					src={imgSrc}
					alt="Background"
					style={{
						clipPath:
							deviceType === "desktop"
								? "polygon(0 99%, 100% 99%, 100% 100%, 0 100%)"
								: "unset",
						transform:
							deviceType === "desktop"
								? "translateY(200px)"
								: "0",
					}}
					className="absolute top-0 bottom-0 right-0 left-0 w-full h-full object-cover bg-img"
				/>
				<div className="w-full grid grid-cols-1 md:grid-cols-4 h-full">
					<LandingText
						text={heading}
						textType="lines"
						className={`relative md:col-span-2 z-10 uppercase text-6xl md:text-4xl leading-tight animte-text max-w-[300px] mt-auto ${
							!isExpanded &&
							"max-md:absolute max-md:top-1/2 -translate-y-1/2"
						}`}
						animation={{
							duration: 1,
							stagger: 0.05,
							y: 50,
							opacity: 0,
						}}
					/>
					<LandingText
						ref={desc}
						text={description}
						textType="lines"
						className="relative mt-auto pb-4 md:ps-8 z-10 text-base font-light leading-tight animte-description max-w-[300px]"
						animation={{
							duration: 0.6,
							stagger: 0.08,
							y: 50,
							opacity: 0,
						}}
						notNow={true}
					/>
					<div className="relative flex flex-col md:items-center items-end justify-end gap-5">
						<CircularImage ref={circluarImg} imgSrc={imgSrc} />

						<span
							className={`flex items-center gap-1 font-light transition-all ${
								isExpanded ? "opacity-100" : "opacity-0"
							}`}>
							<span>Scroll down to explore</span>{" "}
							<svg
								fill="#ffffff"
								height="12px"
								width="12px"
								id="Layer_1"
								xmlns="http://www.w3.org/2000/svg"
								xmlnsXlink="http://www.w3.org/1999/xlink"
								viewBox="0 0 242.133 242.133"
								xmlSpace="preserve">
								<path
									id="XMLID_24_"
									d="M190.919,212.133h-69.853c-8.284,0-15,6.716-15,15s6.716,15,15,15h106.065c8.284,0,15-6.716,15-15V121.066 c0-8.284-6.716-15-15-15s-15,6.716-15,15v69.854L25.607,4.394c-5.858-5.858-15.356-5.858-21.213,0 c-5.858,5.858-5.858,15.356,0,21.213L190.919,212.133z"
								/>
							</svg>
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ImageSection;
