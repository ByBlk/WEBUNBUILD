import './index.scss'
import { useMediaStore } from '../../store/store';
import React from "react";

interface RangeSliderProps {
    rangeType: string;
}

const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
};

const RangeSlider: React.FC<RangeSliderProps> = ({ rangeType }) => {

    const { volume, time, setVolume, setTime } = useMediaStore();
    const maxTime = 270

    const handleChangeTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(e.target.value);
        setTime(newValue);

        const percent = (newValue / maxTime) * 100;
        e.target.style.setProperty("--progress", `${percent}%`);
    };


    const handleChangeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = Number(e.target.value);
        setVolume(newVolume);

        const percent = ((newVolume - Number(e.target.min)) / (Number(e.target.max) - Number(e.target.min))) * 100;
        e.target.style.setProperty("--progress", `${percent}%`);
    }

    switch(rangeType) {
        case 'volume':
            return (
                <div className="control-volume-container">
                    <div className="control-volume-value">
                        <p className="title-section">Volume</p>
                        <span id="range-value">{volume}&#37;</span>
                    </div>
                    <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={volume}
                        onChange={handleChangeVolume} 
                        id="custom-range"
                    />
                </div>
            )
        case 'time':
            return (
                <div>
                    <input 
                        type="range" 
                        min="0" 
                        max={maxTime} 
                        value={time} 
                        onChange={handleChangeTime} 
                        id="custom-range" 
                        className="range-time-video"
                    />
                    <span className="video-time">{formatTime(time)} / {formatTime(maxTime)}</span>
                </div>
            )
    }  
}

export default RangeSlider;