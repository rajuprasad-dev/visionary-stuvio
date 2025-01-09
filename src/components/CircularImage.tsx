import Link from "next/link";
import React, {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useRef,
} from "react";
import { gsap } from "gsap";

type CircularImageProps = {
	imgSrc: string;
};

const CircularImage = forwardRef<any, CircularImageProps>(
	({ imgSrc = "" }, ref) => {
		const overlay = useRef<HTMLAnchorElement | null>(null);

		const handleTrigger = () => {
			if (!overlay.current) return;
			const targets = overlay.current;

			gsap.fromTo(
				targets,
				{ rotate: "-90deg", scale: 0.6, opacity: 0 },
				{
					rotate: 0,
					scale: 1,
					opacity: 1,
					duration: 0.5,
				}
			);
		};
		const handleReverse = () => {
			if (!overlay.current) return;
			const targets = overlay.current;

			gsap.to(targets, {
				rotate: "-90deg",
				scale: 0.6,
				opacity: 0,
				duration: 0.2,
			});
		};

		useImperativeHandle(ref, () => ({
			handleTrigger,
			handleReverse,
		}));
		useEffect(handleReverse, []);

		return (
			<Link href={"/"} ref={overlay} className="z-10 relative">
				<img
					src={imgSrc}
					alt="Background"
					className="w-52 aspect-square rounded-full overflow-hidden object-cover"
				/>
				<span className="absolute bottom-4 right-0 w-12 h-12 bg-slate-100 rounded-full p-2 text-slate-950 flex items-center justify-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 20 20"
						className="w-full  h-full">
						<path
							stroke="#000"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth=".5"
							d="m4.343 4.343 11.314 11.314m0 0h-9.9m9.9 0v-9.9"
						/>
					</svg>
				</span>
			</Link>
		);
	}
);
CircularImage.displayName = "CircularImage";
export default CircularImage;
