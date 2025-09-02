import "./style.scss";

import React, { useState } from "react";
import { Ilaboratoire } from "./types";
import { useNuiEvent } from "@hooks/nuiEvent";
import { fetchNui } from "@hooks/fetchNui";
import { useEscapeKey } from "@hooks/useKeys";

const laboratoriesMenu: React.FC = () => {
	const [quantity, setQuantity] = useState<number>(0);
	const [visible, setVisible] = useState(false);
	const [state, setState] = useState<Ilaboratoire>();

	useNuiEvent<boolean>('nui:laboratories:visible', (status) => {
		setVisible(status);
	});

	useNuiEvent<Ilaboratoire>('nui:laboratories:data', (data) => {
		setState(data);
	});

	useEscapeKey(() => {
		fetchNui('nui:laboratories:close');
		setVisible(false);
	}, visible);

    const updateQuantity = (value: number) => {
        setState(prevState => {
            if (prevState) {
                return {
                    ...prevState,
                    quantityDrugs: prevState.quantityDrugs - value,
                };
            }
            return prevState;
        });
    }

	return (
		<>
			{visible && state && <div className="laboratoires">
				<div className="header">
					<img style={{ width: 492 }} src="https://cdn.eltrane.cloud/3838384859/assets/catalogues/headers/laboratoires.webp" />
				</div>

				<div className="container">
					<div className="state">
						<div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 15 }}>
							<p style={{ textTransform: "uppercase", color: "#fff", fontSize: 12, margin: 0 }}>état de la production</p>

							{state.state == 0 && (
								<img style={{ height: 20, marginLeft: 8 }} src="https://cdn.eltrane.cloud/3838384859/assets/labo/inactif.webp" />
							)}
							{state.state == 1 && (
								<img style={{ height: 20, marginLeft: 8 }} src="https://cdn.eltrane.cloud/3838384859/assets/labo/actif.webp" />
							)}
							{state.state == 2 && (
								<img style={{ height: 20, marginLeft: 8 }} src="https://cdn.eltrane.cloud/3838384859/assets/labo/terminer.webp" />
							)}
						</div>

						{state.state == 0 && (
							<div className="progressbars">
								<div style={{ display: "flex", flexDirection: "column", width: "calc(100% / 3 - 27.5px)" }}>
									<div className="p1">
										<p className="pourcentage">{state.pourcentage[0]} %</p>
										<div className="p1-pr" style={{ height: state.pourcentage[0] + "%" }}></div>
									</div>

									<p className="p-title">{state.items[0]}</p>
								</div>

								<div style={{ display: "flex", flexDirection: "column", width: "calc(100% / 3 - 27.5px)" }}>
									<div className="p2">
										<p className="pourcentage">{state.pourcentage[1]} %</p>
										<div className="p2-pr" style={{ height: state.pourcentage[1] + "%" }}></div>
									</div>

									<p className="p-title">{state.items[1]}</p>
								</div>

								<div style={{ display: "flex", flexDirection: "column", width: "calc(100% / 3 - 27.5px)" }}>
									<div className="p3">
										<p className="pourcentage">{state.pourcentage[2]} %</p>
										<div className="p3-pr" style={{ height: state.pourcentage[2] + "%" }}></div>
									</div>

									<p className="p-title">{state.items[2]}</p>
								</div>
							</div>
						)}

						{state.state == 1 && (
							<div className="progressbars">
								<div style={{ display: "flex", flexDirection: "column", width: "calc(100% / 3 - 27.5px)" }}>
									<div className="p1">
										<p className="pourcentage">{state.pourcentage[0]} %</p>
										<div className="p1-pr" style={{ height: state.pourcentage[0] + "%" }}></div>
									</div>

									<p className="p-title">{state.items[0]}</p>
								</div>

								<div style={{ display: "flex", flexDirection: "column", width: "calc(100% / 3 - 27.5px)" }}>
									<div className="p2">
										<p className="pourcentage">{state.pourcentage[1]} %</p>
										<div className="p2-pr" style={{ height: state.pourcentage[1] + "%" }}></div>
									</div>

									<p className="p-title">{state.items[1]}</p>
								</div>

								<div style={{ display: "flex", flexDirection: "column", width: "calc(100% / 3 - 27.5px)" }}>
									<div className="p3">
										<p className="pourcentage">{state.pourcentage[2]} %</p>
										<div className="p3-pr" style={{ height: state.pourcentage[2] + "%" }}></div>
									</div>

									<p className="p-title">{state.items[2]}</p>
								</div>
							</div>
						)}

						{state.state == 2 && (
							<div>
								<div className="quantity">
									<div className="quantity-container">
										<div
											style={{
												height: "100%",
												display: "flex",
												flexDirection: "column",
												justifyContent: "space-between",
											}}>
											<div
												style={{
													height: 20,
													width: 30,
													fontSize: 10.5,
													lineHeight: 1.9,
													margin: 4,
													marginBottom: -15,
													borderRadius: 3,
													textAlign: "center",
													color: "white",
													backgroundColor: "#ffffff29",
												}}>
												{state.quantityDrugs}
											</div>

											<div
												className="item-image"
												style={{
													height: 90,
													backgroundImage: `url(https://cdn.eltrane.cloud/3838384859/items/${state.image}.webp)`,
												}}
											/>

											<div className="quantity-title">{state.drugName}</div>
										</div>
									</div>

									<div className="quantity-selector">
										<p style={{ color: "#fff", textTransform: "uppercase", fontSize: 11 }}>quantité</p>

										<div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
											<svg
												onClick={() => setQuantity(prevState => prevState > 1 ? prevState - 1 : prevState)}
												width="10"
												height="4"
												viewBox="0 0 18 4"
												fill="none"
												xmlns="http://www.w3.org/2000/svg">
												<path d="M17.8228 0.211975V3.61933H0.166503V0.211975H17.8228Z" fill="white" />
											</svg>

											{/* <div style={{
                                                backgroundColor: "rgba(107, 107, 107, 0.274)",
                                                color: "#fff",
                                                margin: "0 7.5px",
                                                textAlign: "center",
                                                lineHeight: 1.2,
                                                padding: 0,
                                                height: 14,
                                                width: 35,
                                                fontSize: 12
                                            }}>{quantity}</div> */}

											<textarea
												style={{
													backgroundColor: "rgba(107, 107, 107, 0.274)",
													color: "#fff",
													margin: "0 7.5px",
													textAlign: "center",
													lineHeight: 1.2,
													padding: 0,
													height: 14,
													width: 35,
													fontSize: 12,
													resize: "none",
													border: "none",
												}}
                                                value={quantity}
												onChange={e => setQuantity(Number(e.target.value))}>


											</textarea>

											<svg
												onClick={() => setQuantity(prevState => prevState + 1)}
												width="10"
												height="18"
												viewBox="0 0 18 18"
												fill="none"
												xmlns="http://www.w3.org/2000/svg">
												<path
													d="M17.1741 9.93543H10.105V17.1042H7.28395V9.93543H0.247983V7.37992H7.28395V0.178002H10.105V7.37992H17.1741V9.93543Z"
													fill="white"
												/>
											</svg>
										</div>
									</div>
								</div>
							</div>
						)}
					</div>

					{
						<div>
							<div className="state">
								<div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
									<div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
										<p style={{ textTransform: "uppercase", color: "#fff", fontSize: 12, margin: 0 }}>
											quantité de production
										</p>

										<div className="container">
											<p>{state.quantity}</p>
										</div>
									</div>

									<p style={{ textTransform: "uppercase", color: "#FB9D04", fontSize: 12, margin: 0 }}>Niveau {state.lvl}</p>
								</div>
							</div>
						</div>
					}

					{state.state == 0 && (
						<div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
							<div
								onClick={() => {
									fetchNui("nui:laboratories:start");
								}}
								style={{
									background:
										state.paye > 0
											? "linear-gradient(180deg, #FB9D04 0%, rgba(251, 188, 4, 0.47) 100%)"
											: "linear-gradient(180deg, #38DC66 0%, rgba(30, 180, 90, 0.15) 100%)",
								}}
								className="button">
								{state.paye > 0 ? `PAYER LES EMPLOYÉS $ ${state.paye}` : "LANCER LA PRODUCTION"}
							</div>
						</div>
					)}

					{state.state == 1 && (
						<div
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								width: "250px",
								height: 35,
								margin: " auto",
							}}>
							{<div style={{ position: "absolute", color: "#fff", fontSize: 11 }}>TEMPS RESTANT : {state.stateOfButton} MIN</div>}

							<div
								style={{
									borderRadius: 5,
									width: "100%",
									height: "100%",
									background: "linear-gradient(180deg, rgba(51, 150, 60, 0.3) 0%, rgba(30, 180, 90, 0.042) 100%)",
								}}>
								<div
									className="animation-bar-transition"
									style={{
										borderRadius: 5,
										width: (Number(state.stateOfButton) / state.stateOfButtonMax) * 100 + "%",
										height: "100%",
										background: "linear-gradient(180deg, #38DC66 0%, rgba(56, 220, 102, 0.17) 100%)",
									}}></div>
							</div>
						</div>
					)}

					{state.state == 2 && (
						<div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
							<div
								onClick={() => {
									fetchNui("nui:laboratories:gather", {
										quantity,
									}).then((res) => {
                                        if (res) {
                                            updateQuantity(quantity);
                                            setQuantity(0);
                                        }
                                    });
								}}
								className="button"
								style={{
									textTransform: "uppercase",
									background: "linear-gradient(180deg, #FB9D04 0%, rgba(251, 188, 4, 0.47) 100%)",
								}}>
								Récupérer
							</div>
						</div>
					)}
				</div>
			</div>}
		</>
	);
};

export default laboratoriesMenu;
