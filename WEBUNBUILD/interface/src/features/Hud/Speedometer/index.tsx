import {Turnsignal, MotorComponent, SpeedComponent, FuelComponent, HeadlightComponent} from "./components";
import SirenComponent from "@/features/Hud/Speedometer/components/Siren.tsx";
import React from "react";

interface SpeedometerProps {
  data: {
    visible: boolean;
    fuelState: number;
    speedState: number;
    motorState: number;
    TursignalLeft: boolean;
    TursignalRight: boolean;
    HeadlightTop: boolean;
    HeadlightBottom: boolean;
    isSiren: boolean;
    isSirenSound: boolean;
    is911: boolean;
  };
}

const Speedometer: React.FC<SpeedometerProps> = ({ data }) => {
  return data.visible ? (
    <div className="Speedometer-container" > 
        <Turnsignal data={{
            TursignalLeft: data.TursignalLeft,
            TursignalRight: data.TursignalRight,
        }}/>
        <FuelComponent data={{
            fuelState: data.fuelState
        }}/>
        <SpeedComponent data={{
            speedState: data.speedState
        }} />
        <MotorComponent data={{
            motorState: data.motorState
        }}/>
        <HeadlightComponent data={{
            HeadlightTop: data.HeadlightTop,
            HeadlightBottom: data.HeadlightBottom
        }} />
        {data.is911 ?
            <SirenComponent data={{
            isSiren: data.isSiren,
            isSirenSound: data.isSirenSound
        }} />
            :
            null
        }
    </div>
  ): null; 
};

export default Speedometer;
