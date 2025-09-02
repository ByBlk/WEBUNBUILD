import "./index.scss";
import { useState } from "react";
import { fetchNui, useNuiEvent } from "@/hook";
import { useEscapeKey } from "@hooks/useKeys";
import { getCdnUrl } from "@/utils/misc"; 
import { Slider } from "@mui/material";
import Button from "@/components/button/button";

const VehicleMenu: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [vehicleStatus, setVehicleStatus] = useState(47);
  const [vehicleFuel, setVehicleFuel] = useState(25);
  const [vehicleSpeedLimit, setVehicleSpeedLimit] = useState(50);
  const [vehicleAutoDrive, setVehicleAutoDrive] = useState(false);
  const [vehicleName, setVehicleName] = useState("Argento 7F");
  const [vehicleModel, setVehicleModel] = useState("obey");

  const [vehicleButton, setVehicleButton] = useState({
    automatiqueConduite: false,
    engine: false,
    doors: {
      hood: false,
      trunk: false,
      frontLeft: false,
      frontRight: false,
      backLeft: false,
      backRight: false
    },
    windows: {
      frontLeft: false,
      frontRight: false,
      backLeft: false,
      backRight: false
    }
  });

  useNuiEvent("nui:vehicleMenu:visible", (status: boolean) => {
    setVisible(status);
  });
  
  useEscapeKey(() => {
    fetchNui('nui:vehicleMenu:close');
    setVisible(false);
  }, visible);

  useNuiEvent("nui:vehicleMenu:data", (status: any) => {
    setVehicleStatus(status.status);
    setVehicleFuel(status.fuel);
    setVehicleSpeedLimit(status.speedLimit);
    setVehicleName(status.VehicleName);
    setVehicleModel(status.VehicleModel);
  });

  return visible ? (
    <div className="VehicleMenuContainer">
        <div className="VehicleMenuContainer__header">
          <img src={getCdnUrl("assets/catalogues/headers", "vehicleMenu.png" )} draggable={false}/>
        </div>

        <div className="VehicleMenuContainer__content">
          <h1>{vehicleModel} <span>{vehicleName}</span></h1>
          <div className="VehicleMenuContainer__content__stats">
            <div className="VehicleMenuContainer__content__stats__item">
                <div className="VehicleMenuContainer__content__stats__item__title">
                  <span>Etat du véhicule</span>
                  <span>{vehicleStatus}%</span>
                </div>
                <div className="VehicleMenuContainer__content__stats__item__progress">
                  <div className="VehicleMenuContainer__content__stats__item__progress__bar" style={{ width: `${vehicleStatus}%` }}></div>
                </div>
            </div>
            <div className="VehicleMenuContainer__content__stats__item">
                <div className="VehicleMenuContainer__content__stats__item__title">
                  <span>Essence</span>
                  <span>{vehicleFuel}L</span>
                </div>
                <div className="VehicleMenuContainer__content__stats__item__progress">
                  <div className="VehicleMenuContainer__content__stats__item__progress__bar" style={{ width: `${vehicleFuel}%` }}></div>
                </div>
            </div>
          </div>
          <div className="VehicleMenuContainer__content__conduiteauto">
            <h1>Conduite automatique</h1>
            <div className={`VehicleMenuContainer__content__conduiteauto__button ${vehicleAutoDrive ? 'selected' : ''}`} onClick={() => {setVehicleAutoDrive(!vehicleAutoDrive), fetchNui('nui:vehicleMenu', {autoDrive: vehicleAutoDrive})}}>
              {!vehicleAutoDrive ? (
                <h1>Activer</h1>
              ) : (
                <h1>Désactiver</h1>
              )}
            </div>

            <div className="VehicleMenuContainer__content__conduiteauto__title">
              <span>Limitateur de vitesse</span>
              <span>{vehicleSpeedLimit} km/h</span>
            </div>
            <div className="VehicleMenuContainer__content__conduiteauto__slider">
								<div className="VehicleMenuContainer__content__conduiteauto__slider__progress"></div>
								<Slider
									max={100}
									min={1}
									defaultValue={vehicleSpeedLimit}
									className="cSlider"
                  onChange={(_, value) => setVehicleSpeedLimit(value as number)}
								/>
            </div>
          </div>

          <div className="VehicleMenuContainer__content__doors">
            <h1>Portes</h1>
            <div className={`VehicleMenuContainer__content__doors__button ${vehicleButton.doors.hood ? 'selected' : ''}`} onClick={() => {setVehicleButton({ ...vehicleButton, doors: { ...vehicleButton.doors, hood: !vehicleButton.doors.hood }}), fetchNui('nui:vehicleMenu', {hood: !vehicleButton.doors.hood})}}>
              <h1>Capot</h1>
            </div>
            <div className="VehicleMenuContainer__content__doors__buttonSmallContainer">
              <div className={`VehicleMenuContainer__content__doors__buttonSmallContainer__buttonSmall ${vehicleButton.doors.frontLeft ? 'selected' : ''}`} onClick={() => {setVehicleButton({ ...vehicleButton, doors: { ...vehicleButton.doors, frontLeft: !vehicleButton.doors.frontLeft } }), fetchNui('nui:vehicleMenu', {frontLeft: !vehicleButton.doors.frontLeft})}}>
                <h1>Avant gauche</h1>
              </div>
              <div className={`VehicleMenuContainer__content__doors__buttonSmallContainer__buttonSmall ${vehicleButton.doors.frontRight ? 'selected' : ''}`} onClick={() => {setVehicleButton({ ...vehicleButton, doors: { ...vehicleButton.doors, frontRight: !vehicleButton.doors.frontRight } }), fetchNui('nui:vehicleMenu', {frontRight: !vehicleButton.doors.frontRight})}}>
                <h1>Avant droite</h1>
              </div>
              <div className={`VehicleMenuContainer__content__doors__buttonSmallContainer__buttonSmall ${vehicleButton.doors.backLeft ? 'selected' : ''}`} onClick={() => {setVehicleButton({ ...vehicleButton, doors: { ...vehicleButton.doors, backLeft: !vehicleButton.doors.backLeft } }), fetchNui('nui:vehicleMenu', {backLeft: !vehicleButton.doors.backLeft})}}>
                <h1>Arrière gauche</h1>
              </div>
              <div className={`VehicleMenuContainer__content__doors__buttonSmallContainer__buttonSmall ${vehicleButton.doors.backRight ? 'selected' : ''}`} onClick={() => {setVehicleButton({ ...vehicleButton, doors: { ...vehicleButton.doors, backRight: !vehicleButton.doors.backRight } }), fetchNui('nui:vehicleMenu', {backRight: !vehicleButton.doors.backRight})}}>
                <h1>Arrière droite</h1>
              </div>
            </div>
            <div className={`VehicleMenuContainer__content__doors__button ${vehicleButton.doors.trunk ? 'selected' : ''}`} onClick={() => {setVehicleButton({ ...vehicleButton, doors: { ...vehicleButton.doors, trunk: !vehicleButton.doors.trunk } }), fetchNui('nui:vehicleMenu', {trunk: !vehicleButton.doors.trunk})}}>
              <h1>Coffre</h1>
            </div> 
          </div>

          <div className="VehicleMenuContainer__content__glass">
            <h1>Fenetres</h1>
            <div className="VehicleMenuContainer__content__glass__buttonSmallContainer">
              <div className={`VehicleMenuContainer__content__glass__buttonSmallContainer__buttonSmall ${vehicleButton.windows.frontLeft ? 'selected' : ''}`} onClick={() => {setVehicleButton({ ...vehicleButton, windows: { ...vehicleButton.windows, frontLeft: !vehicleButton.windows.frontLeft } }), fetchNui('nui:vehicleMenu', {windowsFrontLeft: !vehicleButton.windows.frontLeft})}}>
                <h1>Avant gauche</h1>
              </div>
              <div className={`VehicleMenuContainer__content__glass__buttonSmallContainer__buttonSmall ${vehicleButton.windows.frontRight ? 'selected' : ''}`} onClick={() => {setVehicleButton({ ...vehicleButton, windows: { ...vehicleButton.windows, frontRight: !vehicleButton.windows.frontRight } }), fetchNui('nui:vehicleMenu', {windowsFrontRight: !vehicleButton.windows.frontRight})}}>
                <h1>Avant droite</h1>
              </div>
              <div className={`VehicleMenuContainer__content__glass__buttonSmallContainer__buttonSmall ${vehicleButton.windows.backLeft ? 'selected' : ''}`} onClick={() => {setVehicleButton({ ...vehicleButton, windows: { ...vehicleButton.windows, backLeft: !vehicleButton.windows.backLeft } }), fetchNui('nui:vehicleMenu', {windowsBackLeft: !vehicleButton.windows.backLeft})}}>
                <h1>Arrière gauche</h1>
              </div>
              <div className={`VehicleMenuContainer__content__glass__buttonSmallContainer__buttonSmall ${vehicleButton.windows.backRight ? 'selected' : ''}`} onClick={() => {setVehicleButton({ ...vehicleButton, windows: { ...vehicleButton.windows, backRight: !vehicleButton.windows.backRight } }), fetchNui('nui:vehicleMenu', {windowsBackRight: !vehicleButton.windows.backRight})}}>
                <h1>Arrière droite</h1>
              </div>
            </div>
          </div>

          <div className="VehicleMenuContainer__content__Button">
            <Button
              label={!vehicleButton.engine ? "Allumer le moteur" : "Eteindre le moteur"}
              color={!vehicleButton.engine ? "green" : "red"}
              width="100%"
              height="96%"
              callback={() => {
                  setVehicleButton({ ...vehicleButton, engine: !vehicleButton.engine }), fetchNui('nui:vehicleMenu', {engine: !vehicleButton.engine})
              }}
            />
          </div>


        </div>
    </div>
  ) : null;
};

export default VehicleMenu;

    