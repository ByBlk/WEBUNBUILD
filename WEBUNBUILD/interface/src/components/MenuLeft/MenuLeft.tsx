import "./MenuLeft.scss";
import React from "react";
import { MenuLeftProps } from "./types.ts";
import MediaCdn from "@/components/mediaCdn/mediaCdn.tsx";

const MenuLeft: React.FC<MenuLeftProps> = ({ children, banner }) => {
    return (
        <div className="MenuLeft">
            <div className="MenuLeft_banner">
                <MediaCdn path={banner.path} name={banner.name} />
            </div>
            {children}
        </div>
    )
}

export default MenuLeft;