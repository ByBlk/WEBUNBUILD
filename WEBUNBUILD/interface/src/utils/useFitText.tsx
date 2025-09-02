import { useEffect, useRef, useState } from "react";

const useFitText = (initialFontSize = 16, containerWidth = 126) => {
    const [fontSize, setFontSize] = useState(initialFontSize);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const adjustFontSize = () => {
            const textElement = textRef.current;
            if (textElement) {
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