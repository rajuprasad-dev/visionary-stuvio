"use client";
import React, {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useRef,
	useMemo,
	useCallback,
} from "react";
import { gsap } from "gsap";

type LandingTextProps = {
	text: string;
	textType?: "lines" | "words" | "chars";
	className?: string;
	animation?: {
		duration: number;
		stagger: number;
		y?: number;
		opacity?: number;
	};
	notNow?: boolean;
};

const LandingText = forwardRef<any, LandingTextProps>(
	(
		{
			text,
			textType = "chars",
			animation: animationProp = {
				duration: 1,
				stagger: 0.1,
				y: 50,
				opacity: 0,
			},
			className,
			notNow = false,
		},
		ref
	) => {
		const textRef = useRef<HTMLDivElement>(null);
		const tl = useRef<GSAPTimeline | null>(null);

		const animation = useMemo(
			() => ({
				duration: animationProp.duration ?? 1,
				stagger: animationProp.stagger ?? 0.1,
				y: animationProp.y ?? 50,
				opacity: animationProp.opacity ?? 0,
			}),
			[animationProp]
		);

		const getLandingText = () => {
			switch (textType) {
				case "words":
					return text.split(" ").map((word, i) => (
						<span key={i} className="landing-text-word">
							{word}&nbsp;
						</span>
					));
				case "chars":
					return text.split("").map((char, i) => (
						<span key={i} className="landing-text-char">
							{char}
						</span>
					));
				case "lines":
					return text.split("<br>").map((line, i) => (
						<span key={i} className="landing-text-line">
							{line.trim()}
							<br />
						</span>
					));
				default:
					return text.split("").map((char, i) => (
						<span key={i} className="landing-text-char">
							{char}
						</span>
					));
			}
		};

		const handleTrigger = useCallback(() => {
			if (!textRef.current) return;

			const targets = textRef.current.querySelectorAll(
				textType === "words"
					? ".landing-text-word"
					: textType === "lines"
					? ".landing-text-line"
					: ".landing-text-char"
			);

			if (targets.length > 0) {
				gsap.fromTo(
					targets,
					{ y: animation.y, opacity: animation.opacity },
					{
						y: 0,
						opacity: 1,
						stagger: animation.stagger,
						duration: animation.duration,
						overwrite: true,
					}
				);
			}
		}, [textType, animation]);

		const handleReverse = useCallback(() => {
			if (!textRef.current) return;

			const targets = textRef.current.querySelectorAll(
				textType === "words"
					? ".landing-text-word"
					: textType === "lines"
					? ".landing-text-line"
					: ".landing-text-char"
			);

			gsap.set(targets, {
				y: animation.y,
				opacity: animation.opacity,
			});
		}, [textType, animation]);

		useImperativeHandle(ref, () => ({
			trigger: handleTrigger,
			reverse: handleReverse,
		}));

		useEffect(() => {
			if (!notNow) {
				handleTrigger();
			} else {
				handleReverse();
			}
		}, [handleTrigger, handleReverse, notNow]);

		return (
			<div ref={textRef} className={`landing-text ${className || ""}`}>
				{getLandingText()}
			</div>
		);
	}
);

LandingText.displayName = "LandingText";
export default LandingText;
