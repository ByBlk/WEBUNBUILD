import { useEffect, useState } from 'react';
import { WeaponProps } from '../types';

const WeaponComponent: React.FC<WeaponProps> = ({ visible, weapon, bullets, maxBullets }) => {
    const [isVisible, setIsVisible] = useState(visible);

    useEffect(() => {
        setIsVisible(visible);
    }, [visible]);

    return isVisible ? (
        <div className='weapon-hud'>
            <div className='durability'>
                <div style={(bullets/maxBullets*100) > 25 ? {background: 'white', height: `${bullets/maxBullets*100}%`} : {background: '#FF2F2F', height: `${bullets/maxBullets*100}%`}} />
            </div>
            <div className='bullets'>
                <span>{bullets}</span> {maxBullets}
            </div>
            <img src={`https://cdn.eltrane.cloud/3838384859/items/${weapon}.webp`} alt="" />
        </div>
    ) : null;
};

export default WeaponComponent;