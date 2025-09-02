import React from 'react';
import TElement from './types';
import styles from "./List.module.scss";

interface MainProps {
	title: string;
	elements: TElement[];
	first?: TElement;
	last?: TElement;
	maxHeight?: string;
	fallback?: string;
}

interface CircleProps {
	color: string;
	padding: boolean;
}

const Circle: React.FC<CircleProps> = ({ color, padding }) => {
	return (
		<React.Fragment>
			{padding && (
				<div className={styles.circlePadding}>
					<div className={styles.inner} style={{ backgroundColor: color }}></div>
				</div>
			) || (
					<div className={styles.circle} style={{ backgroundColor: color }}></div>
				)}
		</React.Fragment>
	)
}

const Item: React.FC<MainProps> = ({ title, elements, maxHeight, first, last, fallback }) => {
	return (
		<div className={`${styles.list}`}>
			<div className={styles.title}>{title}</div>
			<div className={styles.items} style={{ maxHeight: maxHeight ? `${maxHeight}` : "auto" }}>
				{first && (
					<div className={`${styles.item}`} onClick={() => first.onClick && first.onClick()}>
						<div className={styles.row}>
							<div className={styles.label}>
								{first.circle && <Circle color={first.circle.backgroundColor} padding={first.circle.padding} />}
								{first.icon && <img className={styles.icon} src={first.icon} alt={first.name} />}
								{first.input && (
									<input
										type={first.input.type}
										placeholder={first.name}
										onKeyDown={(e: React.KeyboardEvent) => e.key === "Enter" && first.input?.onEnter && first.input.onEnter(e)}
									/>
								) || (
									<span>{first.name}</span>
								)}
							</div>
							{first.endlabel && (
								<div className={styles.endlabel}>
									{first.endlabel.input && (
										<input
											type="number"
											defaultValue={first.endlabel.value}
											max={first.endlabel.max}
											onBlur={first.onBlur}
										/>) || (
											<span>{first.endlabel.value}</span>
										)}
								</div>
							)}
						</div>
					</div>
				)}
				
				{elements.map((e, i) => (
					<div key={i} className={`${styles.item} ${e.selected ? styles.selected : ""}`} onClick={() => e.onClick && e.onClick()}>
						<div className={styles.row}>
							<div className={styles.label}>
								{e.circle && <Circle color={e.circle.backgroundColor} padding={e.circle.padding} />}
								{e.icon && <img className={styles.icon} src={e.icon} alt={e.name} />}
								<span>{e.name}</span>
								{e.delete && (
									<img
										src={e.delete.icon}
										alt="Delete"
										className={styles.deleteIcon}
										onClick={e.delete.onClick}
									/>
								)}
							</div>
							{e.endlabel && (
								<div className={styles.endlabel}>
									{e.endlabel.input && (
										<input
											type="number"
											defaultValue={e.endlabel.value}
											max={e.endlabel.max}
											onBlur={e.onBlur}
											/>) || (
											<span>{e.endlabel.value}</span>
										)}
								</div>
							)}
						</div>
					</div>
				))}

				{elements.length === 0 && fallback && (
					<div className={`${styles.item}`} style={{ pointerEvents: "none" }}>
						<div className={styles.row}>
							<div className={styles.label}>
								<span>{fallback}</span>
							</div>
						</div>
					</div>
				)}

				{last && (
					<div className={`${styles.item}`} onClick={() => last.onClick && last.onClick()}>
						<div className={styles.row}>
							<div className={styles.label}>
								{last.circle && <Circle color={last.circle.backgroundColor} padding={last.circle.padding} />}
								{last.icon && <img className={styles.icon} src={last.icon} alt={last.name} />}
								<span>{last.name}</span>
							</div>
							{last.endlabel && (
								<div className={styles.endlabel}>
									{last.endlabel.input && (
										<input
											type="number"
											defaultValue={last.endlabel.value}
											max={last.endlabel.max}
											onBlur={last.onBlur}
										/>) || (
											<span>{last.endlabel.value}</span>
										)}
								</div>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Item;
