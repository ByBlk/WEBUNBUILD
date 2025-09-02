import React from "react";
import MediaCdn from "@/components/mediaCdn/mediaCdn";

interface IInventoryActionButtonsProps {
    logo: string;
    title: string;
}
const Header: React.FC<IInventoryActionButtonsProps> = props => {
	return (
		<div className="craft-header">
            <MediaCdn path="assets/icons" name={props.logo} />
            <p>{props.title}</p>
		</div>
	);
};

export default Header;
