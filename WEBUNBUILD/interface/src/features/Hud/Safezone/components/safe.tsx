import { getCdnUrl } from '@utils/misc';
import '../style/index.scss'

export interface SafeZoneProps {
    data: {
        visible: boolean;
    };
}

const SafeZoneComponent: React.FC<SafeZoneProps> = ({data}) => {
    return data.visible ? (
        <div className="safezone">
            <img src={getCdnUrl("assets/hud", "safe.png")} />
        </div>
    ) : null;
};

export default SafeZoneComponent;