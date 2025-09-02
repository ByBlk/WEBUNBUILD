import "../style/WeatherTime.scss"
import React from 'react';
import MediaCdn from "@/components/mediaCdn/mediaCdn.tsx";

export interface WeatherTimeProps {
    data: {
        visible: boolean;
        hour: number;
        minute: number;
        weather: string;
    };
}

const WeatherTime: React.FC<WeatherTimeProps> = ({data:{weather, hour, minute, visible}}) => {
    return visible ? (
        <div id="weather-time">
            <MediaCdn path="assets/hud/lore" name={`${weather}.png`} />
            <p>{hour}:{minute < 10 ? `0${minute}` : minute}</p>
        </div>
    ) : null
}

export default WeatherTime;