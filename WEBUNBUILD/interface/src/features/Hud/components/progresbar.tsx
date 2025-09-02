import React, { useState } from 'react';
import { useNuiEvent, fetchNui } from "@/hook";

const ProgressComponent: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const [title, setTitle] = useState('Title');
    const [progress, setProgress] = useState(0);

    const startProgress = (event: { milliseconds: number; title: string }) => {
        setTitle(event.title);
        setProgress(0);
        setVisible(true);

        const duration = event.milliseconds;
        const startTime = Date.now();

        const interval = setInterval(() => {
            const elapsedTime = Date.now() - startTime;
            const percentage = Math.min((elapsedTime / duration) * 100, 100);
            setProgress(percentage);

            if (percentage === 100) {
                clearInterval(interval);
                fetchNui("nui:progress:finish", true);
                setVisible(false);
            }
        }, 100);

        return () => clearInterval(interval);
    };

    useNuiEvent('nui:progress:start', (event: { milliseconds: number; title: string }) => {
        startProgress(event);
    });

    return visible ? (
        <div className="progress">
            <span>{title}</span>
            <div className="progress__progress">
                <div className="progress__progress__bar" style={{ width: `${progress}%` }}></div>
            </div>
        </div>
    ) : null;
};

export default ProgressComponent;