import "./style.scss";

import React, { useState } from "react";

import {fetchNui, useNuiEvent} from "@/hook";
import MediaCdn from "@/components/mediaCdn/mediaCdn.tsx";
import {MenuPlaqueData} from "@/features/MenuPlaque/types.ts";

const MenuPlaque: React.FC = () => {
	const [visible, setVisible] = useState(false);
	const [, setData] = useState<MenuPlaqueData | null>(null);
	const [curr, setCurr] = useState("");

	useNuiEvent('nui:menuplaque:visible', (status: boolean) => {
		setVisible(status);
	});

	useNuiEvent('nui:menuplaque:data', (data: MenuPlaqueData) => {
		setData(data);
		setCurr(data?.current ?? "");
	})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCurr(e.target.value);
	}

	const submitData = () => {
		setData({ current: curr });
		fetchNui('menuPlaque', { text: curr });
	}

	return visible ? (
		<div className="MenuPlaque">
			<div className="MenuPlaque_banner">
				<MediaCdn path="assets/menuplate" name="banner.webp" />
			</div>
			<div className="MenuPlaque_title">
				<p>Changement de plaque</p>
			</div>
			<div className="MenuPlaque_preview">
				<MediaCdn path="assets/menuplate" name="empty-plate.webp" />
				<p className="text-preview">{curr}</p>
			</div>
			<div className="MenuPlaque_form">
				<input type="text" onChange={handleChange} minLength={1} maxLength={8} value={curr} />
				<div className={`validate_button ${curr.length < 1 ? "disabled" : ""}`} onClick={submitData}>
					<p>Valider</p>
				</div>
			</div>
		</div>
	) : null;
};

export default MenuPlaque;