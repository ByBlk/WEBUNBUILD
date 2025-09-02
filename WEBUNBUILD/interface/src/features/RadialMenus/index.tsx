import React, { useState } from "react";
import { useNuiEvent } from "@hooks/nuiEvent";
import { RadialMenuData } from "./types";
import LoadingBar from "./components/loadingBar";
import RadialMenuBuilder from "./components/RadialMenuBuilder/RadialMenuBuilder";
import { useBackspaceKey, useEscapeKey } from "@hooks/useKeys";
import { fetchNui } from "@hooks/fetchNui";

const RadialMenus: React.FC = () => {
	const [visible, setVisible] = useState(false);
	const [data, setData] = useState<RadialMenuData | undefined>();
	
	useEscapeKey(() => {
		if (visible) {
			fetchNui('nui:radial-menu:close');
			setVisible(false);
		}
	}, visible);

	useBackspaceKey(() => {
		visible && fetchNui('nui:radial-menu:back');
	});

	useNuiEvent<boolean>('nui:radial-menu:visible', (status) => {
		setVisible(status);
	});

	useNuiEvent<RadialMenuData>('nui:radial-menu:data', (data) => {
		setData(data);
	});

	return (<>
		{(data && visible) && <div className="radial-menu-container"> <>
			{data.bar && (
				<LoadingBar
					time="0"
					value={data.bar.value}
					valueString={data.bar.valueString}
					icon="box"
					name ={data.bar.crew}
					subtext={
						<>
							Rang <span className="rank">{data.bar.rank}</span>
						</>
					}
					color={data.bar.color}
					postAsync={{ url: data.bar.postAsync.url, data: data.bar.postAsync.data }}
					placement="start">
					<span>{data.bar.crew}</span>
				</LoadingBar>
			)}
			<RadialMenuBuilder
				title={data.title}
				elements={data.elements}
				hideShortcut={data.hideKey || undefined}
				shortcut={data.key}
				shortcutAction={data.keyAction}
			/>
		</>
		</div>}
	</>);
};

export default RadialMenus;
