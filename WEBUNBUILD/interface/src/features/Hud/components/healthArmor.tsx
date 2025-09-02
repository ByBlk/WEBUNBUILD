import React, { useState, useEffect } from 'react';

interface HealthArmorProps {
    data: {
        visible: boolean;
        health: number;
        armor: number;
    };
}

const HealthArmorComponent: React.FC<HealthArmorProps> = ({ data }) => {
    const [isVisible, setIsVisible] = useState(data.visible);

    useEffect(() => {
        setIsVisible(data.visible);
    }, [data.visible]);

    const healthBarStyle = {
        width: `${data.health}%`,
        borderRadius: data.health >= 0 ? `0 0 ${data.health < 99 ? '0' : '0.4vh'} 0.4vh` : '0 0 0 0',
        background: data.health <= 33  ? 'linear-gradient(180deg, #FF2F2F 0%, #FF0000 100%)' : data.health <= 66 ? 'linear-gradient(180deg, #DC9838 0%, #FBBC04 100%)' : 'linear-gradient(180deg, #36C95A 0%, #34A746 100%)', 
    };

    const armorBarStyle = {
        width: `${data.armor}%`,
        background: 'linear-gradient(180deg, rgba(19, 81, 117, 0.8) 0%, rgba(10, 121, 186, 0.7) 100%)',
    };

    const healthBackgroundStyle: React.CSSProperties = {
        position: 'absolute',
        width: '100%',
        height: '100%',
        background: 'linear-gradient(180deg, #292929 0%, rgba(0, 0, 0, 0.75) 100%)',
        opacity: '30%',
        borderRadius: '0 0 0.4vh 0.4vh',
        zIndex: -1,
    };

    const armorBackgroundStyle: React.CSSProperties = {
        position: 'absolute',
        width: '100%',
        height: '100%',
        background: 'linear-gradient(180deg, #292929 0%, rgba(0, 0, 0, 0.75) 100%)',
        opacity: '30%',
        borderRadius: '0 0 0.4vh 0.4vh',
        zIndex: -1,
    };

    return isVisible ? (
        <div className="healthArmor">
            <div className="healthArmor__health" style={{ position: 'relative' }}>
                <div style={healthBackgroundStyle}></div>
                <div className="healthArmor__healthBar" style={healthBarStyle}></div>
            </div>
            <div className="healthArmor__armor" style={{ position: 'relative' }}>
                {data.armor > 0 && <div style={armorBackgroundStyle}></div>}
                <div className="healthArmor__armorBar" style={armorBarStyle}></div>
            </div>
        </div>
    ) : null;
};

export default HealthArmorComponent;