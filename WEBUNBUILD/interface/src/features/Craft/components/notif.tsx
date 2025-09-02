import React, { useEffect, useState } from "react";
import { NotificationProps } from "../types";

const Notification: React.FC<NotificationProps> = ({ id, quantity, name, label, duration, onClose }) => {
    const [progress, setProgress] = useState(0);
    const mounted = React.useRef(false);

    useEffect(() => {
        if (!mounted.current) {
            mounted.current = true;
            return;
        }

        const interval = setInterval(() => {
            setProgress((prev) => {
                const next = prev + 100 / (duration / 100);
                if (next >= 100) {
                    clearInterval(interval);
                    onClose(id);
                }
                return next;
            });
        }, 100);

        return () => {
            clearInterval(interval);
        };
    }, [duration, onClose]);

    return (
        <div className="progress-item">
            <div className="bar">
                <div className="progress-craft" style={{ width: `${progress}%` }} />
            </div>
            <img src={`https://cdn.eltrane.cloud/3838384859/items/${name}.webp`} alt="" />
            <div className="infos"><span>{quantity}</span> {label}</div>
            <div className="time">
                {Math.floor(((duration / 1000) - (progress / 100) * (duration / 1000)) / 60).toString().padStart(2, "0")}
                :
                {Math.floor(((duration / 1000) - (progress / 100) * (duration / 1000)) % 60).toString().padStart(2, "0")}
            </div>
        </div>
    );
};

export default Notification;