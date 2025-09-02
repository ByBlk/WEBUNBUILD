import { fetchNui } from "@hooks/fetchNui";
import { playOnHoverSound } from "@utils/playSound";
import React, { useEffect, useState } from "react";

interface Props {
	data: any;
	server: "FA" | "WL";
}

export const BoutiqueHeader: React.FC<Props> = ({ data, server }) => {
	const [displayError, setDisplayError] = useState<boolean>(false);

	const [displayPremiumEndingSoon, setDisplayPremiumEndingSoon] = useState<boolean>(false);

	const formatEndDate = (date: number) => {
		const endDate = new Date(date * 1000);
		return `${endDate.getDate()}/${endDate.getMonth() + 1}/${endDate.getFullYear()}`;
	};

	useEffect(() => {
		if (!data.unique_id || Number(data.unique_id) === 0) {
			setDisplayError(true);
		}

		if (data.premium > 0 && data.premiumEndDate) {
			const endDate = new Date(data.premiumEndDate * 1000);
			const today = new Date();

			const diff = endDate.getTime() - today.getTime();
			const days = Math.floor(diff / (1000 * 60 * 60 * 24));

			if (days < 7 && days > 0) {
				setDisplayPremiumEndingSoon(true);
			} else {
				setDisplayPremiumEndingSoon(false);
			}
		}
	}, [data]);

	const HeaderFA: React.FC = () => {
		return (
			<>
				{data.source && data.fullname && (
					<div className="Character">
						<span
							onClick={() => {
								fetchNui("nui:shop-header:buy-premium");
								playOnHoverSound();
							}}>
							<p style={{ background: "linear-gradient(180deg, #d850ca 0%, #db6bdd 100%)", color: "white" }}>{data.source}</p>
							{data.fullname}
						</span>
					</div>
				)}

				<div className="TopButtons">
					{data.premium === 0 ? (
						<span
							style={{ color: data.premium > 0 ? "rgba(56, 220, 102, 1)" : "white" }}
							onClick={() => {
								fetchNui("nui:shop-header:buy-premium");
								playOnHoverSound();
							}}>
							<p style={{ background: "linear-gradient(180deg, #d850ca 0%, #db6bdd 100%)", color: "white" }}>Premium</p>
							S'abonner
						</span>
					) : null}
					{data.premium === 0 ? (
						<span
							style={{ color: data.premium > 0 ? "rgba(56, 220, 102, 1)" : "white" }}
							onClick={() => {
								fetchNui("nui:shop-header:buy-premium-plus");
								playOnHoverSound();
							}}>
							<p
								style={{
									background: "linear-gradient(180deg, #393939 0%, #070707 96.77%)",
									color: "white",
									//paddingRight: "30px",
								}}>
								Premium&nbsp;<p className="plusColor">+</p>
							</p>
							S'abonner
						</span>
					) : (
						<span
							style={{ color: data.premium > 0 ? "rgba(56, 220, 102, 1)" : "white" }}
							onClick={() => {
								fetchNui(data.premium === 1 ? "nui:shop-header:buy-premium" : "nui:shop-header:buy-premium-plus");
								playOnHoverSound();
							}}>
							<p
								style={{
									background:
										data.premium === 1
											? "linear-gradient(180deg, #d850ca 0%, #db6bdd 100%)"
											: "linear-gradient(180deg, #393939 0%, #070707 96.77%)",
									color: "white",
									//paddingRight: data.premium === 2 ? "30px" : "",
								}}>
								{data.premium === 2 ? (
									<>
										Premium&nbsp;<p className="plusColor">+</p>
									</>
								) : (
									"Premium"
								)}
							</p>
							{data.premium > 0 ? "Actif" : "S'abonner"}
						</span>
					)}
					<span
						onClick={() => {
							fetchNui("nui:shop-header:buy-coins");
							playOnHoverSound();
						}}>
						<p style={{ background: "linear-gradient(180deg, #fae293 0%, #ffad00 100%)" }}>
							{data.credit || data.balance || 0}
							<img src="https://cdn.eltrane.cloud/3838384859/icons/logo.webp" alt="logo" />
						</p>
						Coins
					</span>
					<span
						onClick={() => {
							navigator.clipboard.writeText(data.unique_id);
							playOnHoverSound();
						}}>
						<p style={{ background: "linear-gradient(180deg, #5e6cb6 0%, #5e6cb6 100%)" }}>
							{Number(data.unique_id) === 0 ? "Erreur" : data.unique_id}
						</p>
						ID Boutique
					</span>
				</div>

				{displayError && (
					<div className="TopButtonsError">
						<div className="TopButtonsError__icon">
							<img src="https://cdn.eltrane.cloud/3838384859/svg/error.svg" alt="error" />
						</div>
						<div className="TopButtonsError__content">
							<h1>Une erreur est survenue!</h1>
							<p>
								Il semblerait que vos données boutique sont momentanément indisponibles.
								<br />
								Veuillez réessayer ultérieurement.
							</p>
						</div>
					</div>
				)}

				{displayPremiumEndingSoon && (
					<div className="TopButtonsError">
						<div className="TopButtonsError__icon">
							<img src="https://cdn.eltrane.cloud/3838384859/svg/error.svg" alt="error" />
						</div>
						<div className="TopButtonsError__content">
							<h1>Votre abonnement Premium arrive à expiration!</h1>
							<p>
								Votre abonnement Premium arrive à expiration le {formatEndDate(data.premiumEndDate)}.
								<br />
								Pensez à vous réabonner pour ne pas perdre vos avantages!
							</p>
						</div>
					</div>
				)}
			</>
		);
	};

	const HeaderWL: React.FC = () => {
		return (
			<>
				<div className="TopButtons">
					<span
						style={{ color: data.premium ? "rgba(56, 220, 102, 1)" : "white" }}
						onClick={() => {
							fetchNui("nui:shop-header:buy-subscriber");
							playOnHoverSound();
						}}>
						<p style={{ background: "linear-gradient(180deg, #f67f20 0%, #f03424 96.77%)", color: "white" }}>Subscriber</p>
						{data.premium ? "Actif" : "S'abonner"}
					</span>
					<span
						onClick={() => {
							fetchNui("nui:shop-header:buy-coins");
							playOnHoverSound();
						}}>
						<p style={{ background: "linear-gradient(180deg, #fae293 0%, #ffad00 100%)" }}>
							{data.credit || data.balance || 0}
							<img src="https://cdn.eltrane.cloud/3838384859/icons/logo.webp" alt="logo" />
						</p>
						Coins
					</span>
					<span
						onClick={() => {
							navigator.clipboard.writeText(data.unique_id);
							playOnHoverSound();
						}}>
						<p style={{ background: "linear-gradient(180deg, #5e6cb6 0%, #5e6cb6 100%)" }}>
							{Number(data.unique_id) === 0 ? "Erreur" : data.unique_id}
						</p>
						ID Boutique
					</span>
				</div>

				{displayError && (
					<div className="TopButtonsError">
						<div className="TopButtonsError__icon">
							<img src="https://cdn.eltrane.cloud/3838384859/svg/error.svg" alt="error" />
						</div>
						<div className="TopButtonsError__content">
							<h1>Une erreur est survenue!</h1>
							<p>
								Il semblerait que vos données boutique sont momentanément indisponibles.
								<br />
								Veuillez réessayer ultérieurement.
							</p>
						</div>
					</div>
				)}
			</>
		);
	};

	return <>{server === "FA" ? <HeaderFA /> : <HeaderWL />}</>;
};
