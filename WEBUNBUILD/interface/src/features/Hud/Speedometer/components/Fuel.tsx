import { getCdnUrl } from "@utils/misc";

interface SpeedoFuelProps {
    data: {
        fuelState: number;
    };
}


const FuelComponent: React.FC<SpeedoFuelProps> = ( { data } ) => {
    const fuel_arc = 90;
    const radius = 180;
    const circumferenceFuel = radius * 2 * Math.PI * ((360 - fuel_arc) / 360);
    const maxFuel = 100; 
    
    return (
        <div className='fuel'>
            <svg className="arc-circle" viewBox="-190 -380 570 492" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M 0 0 a 190 190 0 1 1 310 0" fill="none" stroke-width="37" stroke='#FFFFFF33'
                    style={{
                        strokeLinecap: "square",
                        strokeOpacity: "1",
                    }}
                />
                <path className='anim' d="M 0 0 a 190 190 0 1 1 310 0"
                    strokeWidth="34" style={{
                        stroke: "white",
                        strokeMiterlimit: 10,
                        strokeLinecap: "square",
                        strokeOpacity: 1,
                        strokeDasharray: circumferenceFuel + ', ' + circumferenceFuel,
                        strokeDashoffset: circumferenceFuel + (data.fuelState / maxFuel) * circumferenceFuel
                    }} fill="none" fillOpacity="0.1" stroke='white' stroke-width='37' />
                    
            </svg>
            <img src={getCdnUrl("assets/hud", "Fuel.svg")} alt="" />
        </div>
    );
};

export default FuelComponent;