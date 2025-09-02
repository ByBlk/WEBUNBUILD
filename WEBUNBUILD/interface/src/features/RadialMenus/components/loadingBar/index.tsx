import { fetchNui } from "@hooks/fetchNui";
import "./style.scss";

import PropTypes, { Validator } from "prop-types";

import React from "react";
import {getCdnUrl} from "@/utils";

function hexToRgbA(hex: string) {
	let c: any;
	if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
		c = hex.substring(1).split("");
		if (c.length == 3) {
			c = [c[0], c[0], c[1], c[1], c[2], c[2]];
		}
		c = "0x" + c.join("");
		return [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",");
	}
	throw new Error("Bad Hex");
}

const LoadingBar: React.FC<LoadingBarProps> = props => {
	const [value, setValue] = React.useState(props.value ? Number(props.value) : 0);

	React.useEffect(() => {
		if (props.time === "0") {
			return;
		}

		// Make the bar fill up in data.time seconds
		const interval = setInterval(
			() => {
				setValue(value => {
					if (value < 100) {
						return value + 1;
					}
					return value;
				});
			},
			Number(props.time) * 10,
		);

		if (value >= 100) {
			if (props.postAsync && props.postAsync.url) {
				fetchNui(props.postAsync.url, props.postAsync.data);
			}
		}

		return () => {
			clearInterval(interval);
		};
	});

	return (
		<div className="LoadingBar" style={{ placeItems: props.placement || "center" }}>
			<div className="row">
				<div className="icon">
					<img src={getCdnUrl("assets/Illégal/Image/Groupes",props.name.toLowerCase().split(" ").join("") + ".webp")}
						 alt="icon"/>
				</div>
				<div className="col">
					<div className="identity">{props.children}</div>
					<div className="bar">
						<div
							className="fill"
							title={props.color}
							style={
								{
									width: `${value}%`,
									"--loadingbar-color": props.color,
									"--loadingbar-color-hex": hexToRgbA(props.color),
								} as React.CSSProperties
							}>
							<div className={"value " + (!props.valueString ? "bold" : "")}>
								{props.valueString ? props.valueString : `${value}%`}
							</div>
						</div>
					</div>
					{props.subtext && <div className="subtext">{props.subtext}</div>}
				</div>
			</div>
		</div>
	);
};

type LoadingBarProps = {
	children: React.ReactNode;
	time: string;
	value?: string;
	valueString?: string;
	subtext?: React.ReactNode;
	name: string;
	icon: string;
	color: string;
	postAsync: {
		url: string;
		data: any;
	};
	placement?: string;
};

LoadingBar.propTypes = {
	children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired as any,
	time: PropTypes.string.isRequired,
	value: PropTypes.string,
	subtext: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]) as any,
	icon: PropTypes.string.isRequired,
	color: PropTypes.string.isRequired,
	postAsync: PropTypes.shape({
		url: PropTypes.string.isRequired,
		data: PropTypes.any.isRequired,
	}) as Validator<{ url: string; data: any }>,
	placement: PropTypes.string,
};

export default LoadingBar;
