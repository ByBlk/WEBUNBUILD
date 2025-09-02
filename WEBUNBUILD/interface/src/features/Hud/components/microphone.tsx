import { useState, useEffect } from 'react';

interface MicrophoneProps {
    data: {
        visible: boolean;
        type: number;
    };
}

const MicrophoneComponent: React.FC<MicrophoneProps> = ({ data }) => {
    const [isVisible, setIsVisible] = useState(data.visible);

    useEffect(() => {
        setIsVisible(data.visible);
    }, [data.visible]);

    const imageUrl = `https://cdn.eltrane.cloud/3838384859/assets/hud/microphone_${data.type}.png`;

    return isVisible ? (
        <img className="microphone" src={imageUrl} alt="" />
    ) : null;
};

export default MicrophoneComponent;