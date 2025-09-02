import "./style/index.scss";
import "./Speedometer/style/index.scss";

import React, { useState } from "react";
import { useNuiEvent } from "@/hook";
import { HealthArmorComponent, MicrophoneComponent, StaffBoardComponent, InteractNotifComponent, TutoFA, NotificationsComponent, ProgressComponent, WeaponComponent } from "./components/";
import Speedometer from "./Speedometer/index";
import { SafeZoneComponent } from "./Safezone/components";
import WeatherTime from "@/features/Hud/components/WeatherTime.tsx";
import {ILocalisation, IWeatherTimeData} from "@/features/Hud/types.ts";
import Localisation from "@/features/Hud/components/Localisation.tsx";
import { WeaponProps } from './types';

const Hud: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [healthArmorData, setHealthArmorData] = useState({ visible: false, health: 0, armor: 0 });
  const [microphoneData, setMicrophoneData] = useState({ visible: false, type: 1 });
  const [staffBoardData, setStaffBoardData] = useState({ visible: false, players: 0, staff: 0, reports: 0 });
  const [interactNotifData, setInteractNotifData] = useState({ visible: false });
  const [safezoneVisible, setSafezoneVisible] = useState({ visible: false });
  const [speedometerData, setSpeedometerData] = useState({ visible: false, fuelState: 0, speedState: 0, motorState: 0, HeadlightTop: false, HeadlightBottom: false, TursignalLeft: false, TursignalRight: false, isSiren: false, isSirenSound: false, is911: false });
  const [weatherTimeData, setWeatherTimeData] = useState<IWeatherTimeData | null>(null);
  const [localisationData, setLocalisationData] = useState<ILocalisation | null>(null);
  const [weaponData, setWeaponData] = useState<WeaponProps>({ visible: false, weapon: "", bullets: 0, maxBullets: 0 });

  useNuiEvent('nui:hud:visible', (status: boolean) => {
    setVisible(status);
  });

  useNuiEvent('nui:hud:visible:healthArmor', (data: any) => {
    setHealthArmorData(data);
  });

  useNuiEvent('nui:hud:visible:microphone', (data: any) => {
    setMicrophoneData(data);
  });

  useNuiEvent('nui:hud:visible:staffboard', (data: any) => {
    setStaffBoardData(data);
  });

  useNuiEvent('nui:hud:visible:interactNotif', (data: any) => {
    setInteractNotifData(data);
  });

  useNuiEvent('nui:safezone:visible', (data: any) => {
    setSafezoneVisible(data);
  });

  useNuiEvent('nui:speedometer:visible', (data: any) => {
    setSpeedometerData(data) ;
  });

  useNuiEvent('nui:weather-time:visible', (data: IWeatherTimeData) => {
    setWeatherTimeData(data);
  })

  useNuiEvent('nui:localisationHud:visible', (data: ILocalisation) => {
    console.log("localisationHud", data);
    setLocalisationData(data);
  })

  useNuiEvent('nui:weapon:data', (data: WeaponProps) => {
    setWeaponData(data);
  });

  return (
      <div className="hud">
        {visible && (
          <>
            <HealthArmorComponent data={{ visible: healthArmorData.visible, health: healthArmorData.health, armor: healthArmorData.armor }} />
            <MicrophoneComponent data={{ visible: microphoneData.visible, type: microphoneData.type }} />
            <StaffBoardComponent data={{ visible: staffBoardData.visible, players: staffBoardData.players, staff: staffBoardData.staff, reports: staffBoardData.reports }} />
            <InteractNotifComponent data={{ visible: interactNotifData.visible }} />
            <TutoFA />
            <Speedometer data={{ visible: speedometerData.visible, fuelState: speedometerData.fuelState, speedState: speedometerData.speedState, motorState: speedometerData.motorState, TursignalLeft: speedometerData.TursignalLeft, TursignalRight: speedometerData.TursignalRight, HeadlightTop: speedometerData.HeadlightTop, HeadlightBottom: speedometerData.HeadlightBottom, isSiren: speedometerData.isSiren, isSirenSound: speedometerData.isSirenSound, is911: speedometerData.is911 }} />
            <SafeZoneComponent data={{ visible: safezoneVisible.visible }} />
            <ProgressComponent />
            <WeatherTime data={{ visible: weatherTimeData?.visible ?? false, hour: weatherTimeData?.hour ?? 0, minute: weatherTimeData?.minute ?? 0, weather: weatherTimeData?.weather ?? "" }} />
            <Localisation data={{ visible: localisationData?.visible ?? false, color: localisationData?.color ?? "", icon: localisationData?.icon ?? "", position: localisationData?.position ?? "" }} />
            <WeaponComponent visible={weaponData.visible} weapon={weaponData.weapon} bullets={weaponData.bullets} maxBullets={weaponData.maxBullets} />
          </>
        )}
        <NotificationsComponent visible={visible}/>
      </div>
  );
};

export default Hud;