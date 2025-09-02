import { useState, useEffect } from 'react';
import MediaCdn from '@/components/mediaCdn/mediaCdn';

interface InteractNotifProps {
    data: {
        visible: boolean;
    };
}

const InteractNotifComponent: React.FC<InteractNotifProps> = ({ data }) => {
    const [isVisible, setIsVisible] = useState(data.visible);

    useEffect(() => {
        setIsVisible(data.visible);
    }, [data.visible]);

    return isVisible ? (
        <div className="interactNotif">
            <MediaCdn path="assets/hud" name="notifE.svg" props={{}} />
            <MediaCdn path="assets/hud" name="notifY.svg" props={{}} />
            <MediaCdn path="assets/hud" name="notifN.svg" props={{}} />
        </div>
    ) : null;
};

export default InteractNotifComponent;