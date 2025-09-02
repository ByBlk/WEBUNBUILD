import { useEffect } from "react";
import { fetchNui } from "./fetchNui";

export const useMouseWheel = () => {
	useEffect(() => {
		// listen for mouse wheel event, and send it to the server using postAsync
		// mouseUp and mouseDown are the only events that are sent to the server

		const onMouseWheel = (event: WheelEvent) => {
			if (event.deltaY > 0) {
				console.log("mouseDown");
				fetchNui("mouseDown");
			} else {
				console.log("mouseUp");
				fetchNui("mouseUp");
			}
		};
		document.addEventListener("wheel", onMouseWheel);
		return () => document.removeEventListener("wheel", onMouseWheel);
	});
};
