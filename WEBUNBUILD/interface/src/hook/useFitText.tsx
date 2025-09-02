import { useEffect, useRef, useState } from "react";

const useFitText = (initialFontSize = 16, containerWidth = 126) => {
	const [fontSize, setFontSize] = useState(initialFontSize);
	const textRef = useRef(null);

	useEffect(() => {
		const adjustFontSize = () => {
			if (textRef.current) {
				const textElement: HTMLDivElement = textRef.current as HTMLDivElement;
				let currentFontSize = initialFontSize;
				textElement.style.fontSize = `${currentFontSize}px`;

				while (textElement.scrollWidth > containerWidth && currentFontSize > 0) {
					currentFontSize -= 1;
					textElement.style.fontSize = `${currentFontSize}px`;
				}
				setFontSize(currentFontSize);
			}
		};

		adjustFontSize();
		window.addEventListener("resize", adjustFontSize);

		return () => {
			window.removeEventListener("resize", adjustFontSize);
		};
	}, [initialFontSize, containerWidth]);

	return { fontSize, textRef };
};

export default useFitText;
