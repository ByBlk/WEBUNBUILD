import { CircularProgress } from "@mui/material";
import React from "react";

interface Props {
	state: "error" | "loading" | "maintenance";
	retry: () => void;
}

export const BoutiqueStates: React.FC<Props> = ({ state, retry }) => {
	return (
		<>
			{state === "loading" && (
				<div className="Loading-Container">
					<div className="Loading-Text">Chargement de la boutique en cours...</div>
					<div className="Loading-Progress">
						<CircularProgress />
					</div>
				</div>
			)}

			{state === "error" && (
				<div className="Error-Container">
					<div className="Error-Text">Erreur lors du chargement du catalogue</div>
					<div className="Error-Buttons">
						<div className="Button" onClick={() => window.history.back()}>
							<div className="Label">Retourner sur la boutique</div>
						</div>
						<div className="Button" onClick={() => retry()}>
							<div className="Label">Réessayer</div>
						</div>
					</div>
				</div>
			)}

			{state === "maintenance" && (
				<div className="Maintenance-Container">
					<div className="Maintenance-Text">Maintenance en cours</div>
					<div className="Maintenance-Subtitle">
						La boutique véhicules est actuellement en maintenance
						<br />
						merci de réessayer plus tard.
					</div>
					<div className="Maintenance-Buttons">
						<div className="Button" onClick={() => window.history.back()}>
							<div className="Label">Retourner sur la boutique</div>
						</div>
						<div className="Button" onClick={() => retry()}>
							<div className="Label">Réessayer</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};
