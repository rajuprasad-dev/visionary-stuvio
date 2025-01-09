import { gsap } from "gsap";
import { useEffect, useRef } from "react";

const ExploreButton = ({
	onClick,
	fadeUp,
}: {
	onClick?: () => void;
	fadeUp?: boolean;
}) => {
	const element = useRef<HTMLButtonElement | null>(null);

	const handleTrigger = () => {
		if (!element.current) return;
		const targets = element.current;
		const text = targets.querySelector("span");

		gsap.fromTo(
			targets,
			{ width: "40px" },
			{
				width: "220px",
				opacity: 1,
				duration: 0.5,
				onComplete: () => {
					if (!text) return;
					gsap.to(text, {
						y: "0px",
						opacity: 1,
						duration: 0.5,
					});
				},
			}
		);

		if (fadeUp) {
			gsap.fromTo(
				targets,
				{ y: 70, opacity: 0 },
				{
					y: 0,
					opacity: 1,
					stagger: 50,
					duration: 1,
					overwrite: true,
					onComplete: () => {
						gsap.fromTo(
							targets,
							{ height: "48px", width: "48px" },
							{
								width: "240px",
								opacity: 1,
								duration: 0.5,
								onComplete: () => {
									if (!text) return;
									gsap.to(text, {
										y: "0px",
										opacity: 1,
										duration: 0.5,
									});
								},
							}
						);
					},
				}
			);
		}
	};

	useEffect(handleTrigger, [fadeUp]);

	return (
		<button
			ref={element}
			onClick={onClick}
			className="w-10 h-10 border border-slate-950 flex items-center justify-center rounded-full overflow-hidden uppercase text-sm duration-200 hover:bg-slate-950 hover:text-white">
			<span className="-translate-y-10">EXPLORE EXPERIENCE</span>
		</button>
	);
};

export default ExploreButton;
