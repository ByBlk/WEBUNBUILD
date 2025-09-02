import React, { useState } from "react";
import './style.scss'
import { IMenuBuilderListElement } from "@/components/menuBuilder/types";
import { Slider } from "@mui/material";
import { IVisageMenuItem } from "../types";
import { setArrayLength } from "@/components/menuBuilder";
import { APPREARANCE_COLORS } from "../staticData";

const ApperanceSelector: React.FC<{
	showOpacity: boolean;
	showColor1: boolean;
	showColor2: boolean;
	items: IMenuBuilderListElement[];
	itemValue?: IMenuBuilderListElement;
	opacityValue: number;
	setValue: Function;
	setCurrentCategory: Function;
	color1Value: number | undefined;
	color2Value: number | undefined;
	currentCategory?: IVisageMenuItem | null;
	overrideColors?: string[];
}> = ({ showOpacity: showOpacity, showColor1, showColor2, items, itemValue, opacityValue, setValue, currentCategory, color1Value, color2Value, overrideColors }) => {
	const [offset1, setOffset1] = useState(0);
	const [offset2, setOffset2] = useState(0);

	const changeColor1 = (e: number) => {
		setValue("color1", e);
	};

	const changeColor2 = (e: number) => {
		setValue("color2", e);
	};

	const changeOpacity = (e: number) => {
		setValue("opacity", e);
	};

	return (
		<div className="apperanceSelector">
			<div className="VisionMenu-itemList">
				{currentCategory?.choices?.includes('items') && setArrayLength(items, 9).map((item, index) => (
					<div
						key={"key" + item?.id + index + item?.category + item?.subCategory}
						className={
							item?.isPlaceholder
								? "VisionMenu-placeholder"
								: "VisionMenu-item " + (JSON.stringify(itemValue) === JSON.stringify(item) ? "selected" : "")
						}
						onClick={() => {
							setValue("item", item);
						}}>
						{!item?.isPlaceholder && (
							<>
								<img src={item.img} />
								<div className={"VisionMenu-name "}>{item.label}</div>
							</>
						)}
						{item?.isPlaceholder && (
							<>
								<div className={"VisionMenu-placeholder "}></div>
							</>
						)}
					</div>
				))}
			</div>
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
									if (offset1 > 25 * (overrideColors ?? APPREARANCE_COLORS).length * -1 + 25 * 11) setOffset1(offset1 - 25);
								}
							}}>
								{(overrideColors ?? APPREARANCE_COLORS).map((c, i) => (
									<div
										key={i}
										className={["color", color1Value === i + 1 ? 'selected' : '', ((color1Value === undefined && i + 1) === 1 ? 'selected' : '')].join(' ')}
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
									if (offset2 > 25 * APPREARANCE_COLORS.length * -1 + 25 * 11) setOffset2(offset2 - 25);
								}
							}}>
								{APPREARANCE_COLORS.map((c, i) => (
									<div
										key={i}
										className={["color", color2Value === i + 1 ? 'selected' : '', ((color2Value === undefined && i + 1) === 1 ? 'selected' : '')].join(' ')}
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

					{showOpacity && (
						<>
							<div className="span">Opacité</div>
							<div className="opacityContainer">
								<div className="opacity">
									<Slider value={opacityValue ?? 100} onChange={(_e, newValue) => {
										changeOpacity(newValue as number);
									}} />
								</div>
								<div className="opacityValue">{opacityValue}%</div>
							</div>
						</>
					)}
				</div>
			)}
		</div>
	);
};

export default ApperanceSelector;
