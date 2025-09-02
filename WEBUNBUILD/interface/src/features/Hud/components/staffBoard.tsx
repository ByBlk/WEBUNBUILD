import { useState, useEffect } from 'react';
import MediaCdn from "@/components/mediaCdn/mediaCdn.tsx";

interface StaffBoardProps {
    data: {
        visible: boolean;
        players: number;
        staff: number;
        reports: number;
    };
}

const StaffBoardComponent: React.FC<StaffBoardProps> = ({ data }) => {
    const [isVisible, setIsVisible] = useState(data.visible);

    useEffect(() => {
        setIsVisible(data.visible);
    }, [data.visible]);

    const reportCount = data.reports

    return isVisible ? (
        <div className="staffboard">
            <div className="staffboard__container">
                <div className="items">
                    <div className="items_text">
                        <p><span>{data.players}</span> En ligne</p>
                    </div>
                    <div className="items_icon">
                        <MediaCdn path="assets/icons" name="globe.svg" />
                    </div>
                </div>
                <div className="items">
                    <div className="items_text">
                        <p><span>{data.staff}</span> Staffs</p>
                    </div>
                    <div className="items_icon">
                        <MediaCdn path="assets/hud" name="logoV.png" />
                    </div>
                </div>
                <div className="items">
                    <div className="items_text">
                        <p><span className={reportCount >= 5 ? 'red' : ''}>{data.reports}</span> Reports</p>
                    </div>
                    <div className={`items_icon ${reportCount >= 5 ? 'red' : ''}`}>
                        <MediaCdn path="assets/icons" name="warning.svg" />
                    </div>
                </div>
            </div>
        </div>
    ) : null;
};

export default StaffBoardComponent;