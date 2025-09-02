import { Slider } from "@mui/material";
import "./style.scss";

import React, { useState } from "react";
import { BRIGHT_COLORS, FULL_COLORS } from "@/staticData";
import { ColorPickerProps } from "./types";

const ColorPicker: React.FC<ColorPickerProps> = ({ changeOpacity, changeColor1, changeColor2, changeColorFard, showOpacity, showColor1, showColor2, showColorFard, colors }) => {
	const [offset1, setOffset1] = useState(0);
	const [offset2, setOffset2] = useState(0);
	const [offset3, setOffset3] = useState(0);
	const [opacity, setOpacity] = useState(100);

	return (
		<>
			{!showOpacity && !showColor1 && showColor2 && <div></div>}
			{(showOpacity || showColor1 || showColor2) && (
				<div className="colorPicker">
					{showColor1 && (
						<div className="Container">
							<div className="span">Couleurs</div>
							<div className="colorPick" onWheel={(ev) => {
								if (ev?.deltaY < 0) {
									if (offset1 < 0) setOffset1(offset1 + 25);
								}
								if (ev?.deltaY > 0) {
									if (offset1 > 25 * FULL_COLORS.length * -1 + 25 * 11) setOffset1(offset1 - 25);
								}
							}}>
								{FULL_COLORS.map((c, i) => (
									<div
										key={i}
										className={["color", colors?.color1 === i + 1 ? 'selected' : '', ((colors?.color1 === undefined && i + 1) === 1 ? 'selected' : '')].join(' ')}
										onClick={() => changeColor1(i + 1)}
										style={{
											background: `linear-gradient(180deg, ${c}FF 0%, ${c}FF 100%)`,
											transform: `translateX(${offset1}px)`,
										}}><div style={{
											background: `linear-gradient(180deg, ${c}FF  0%, ${c}66 100%)`,
										}}></div></div>
								))}
							</div>
						</div>
					)}

					{showColor2 && (
						<div className="Container">
							<div className="span">Couleurs secondaires</div>
							<div className="colorPick" onWheel={(ev) => {
								if (ev?.deltaY < 0) {
									if (offset2 < 0) setOffset2(offset2 + 25);
								}
								if (ev?.deltaY > 0) {
									if (offset2 > 25 * FULL_COLORS.length * -1 + 25 * 11) setOffset2(offset2 - 25);
								}
							}}>
								{FULL_COLORS.map((c, i) => (
									<div
										key={i}
										className={["color", colors?.color2 === i + 1 ? 'selected' : '', ((colors?.color1 === undefined && i + 1) === 1 ? 'selected' : '')].join(' ')}
										onClick={() => changeColor2(i + 1)}
										style={{
											background: `linear-gradient(180deg, ${c}FF  0%, ${c}66 100%)`,
											transform: `translateX(${offset2}px)`,
										}}><div style={{
											background: `linear-gradient(180deg, ${c}FF  0%, ${c}66 100%)`,
										}}></div></div>
								))}
							</div>
						</div>
					)}

					{showColorFard && (
						<div className="Container">
							<div className="span">Couleurs secondaires</div>
							<div className="colorPick" onWheel={(ev) => {
								if (ev?.deltaY < 0) {
									if (offset3 < 0) setOffset3(offset3 + 25);
								}
								if (ev?.deltaY > 0) {
									if (offset3 > 25 * BRIGHT_COLORS.length * -1 + 25 * 11) setOffset3(offset3 - 25);
								}
							}}>
								{BRIGHT_COLORS.map((c, i) => (
									<div
										key={i}
										className={["color", colors?.colorF === i + 1 ? 'selected' : '', ((colors?.color1 === undefined && i + 1) === 1 ? 'selected' : '')].join(' ')}
										onClick={() => changeColorFard(i + 1)}
										style={{
											background: `linear-gradient(180deg, ${c}FF  0%, ${c}66 100%)`,
											transform: `translateX(${offset3}px)`,
										}}><div style={{
											background: `linear-gradient(180deg, ${c}FF  0%, ${c}66 100%)`,
										}}></div></div>
								))}
							</div>
						</div>
					)}

					{showOpacity && (
						<>
							<div className="span">Opacité</div>
							<div className="opacityContainer">
								<div className="opacity">
									<Slider value={colors?.opacity ?? 100} onChange={(_e, newValue) => {
										setOpacity(newValue as number);
										changeOpacity(newValue as number);
									}} />
								</div>
								<div className="opacityValue">{opacity}%</div>
							</div>
						</>
					)}
				</div >
			)}
		</>
	);
};

export default ColorPicker;
