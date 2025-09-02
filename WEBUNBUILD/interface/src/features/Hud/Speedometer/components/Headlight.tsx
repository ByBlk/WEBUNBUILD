import React from "react";
import MediaCdn from "@/components/mediaCdn/mediaCdn.tsx";

interface HeadlightProps {
	data: {
		HeadlightTop: boolean;
		HeadlightBottom: boolean;
	};
}
const HeadlightComponent: React.FC<HeadlightProps> = ({ data }) => {
	return (
		<div className="HeadlightComponent">
			<div className='icon'>
				{(data.HeadlightTop ?
						<MediaCdn path={"assets/hud"} name="HeadlightTop-blue.svg" />
					:
						<MediaCdn path={"assets/hud"} name="HeadlightTop.svg" props={{ style: { opacity: .3 } }} />
				)}
			</div>
			<div className='icon'>
				{(data.HeadlightBottom ?
						<MediaCdn path={"assets/hud"} name="HeadlightBottom-green.svg" />
					:
						<MediaCdn path={"assets/hud"} name="HeadlightBottom.svg" />
				)}
			</div>
		</div>
	);
};

export default HeadlightComponent;