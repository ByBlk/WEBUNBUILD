interface SpeedoSpeedProps {
    data: {
        speedState: number;
    };
}

const SpeedComponent: React.FC<SpeedoSpeedProps> = ({ data }) => {
    const speed_arc = 92;
    const radius = 180;
    const circumference = radius * 2 * Math.PI * ((360 - speed_arc) / 360);
    const maxSpeed = 220;

    return (
        <div className='SpeedComponent'>
            <div className='speedometer-inside'>

                <svg className="arc-circle" viewBox="-190 -380 570 492" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="130" cy="-122" r="171" fill="url(#grad2)" stroke-width="12"
                        style={{
                            strokeLinecap: "butt",
                            strokeOpacity: "1",
                            }} />
                        <text x="130" y="-105" textAnchor="middle" font-size="48" fill="white">
                            <tspan className="speed" style={{
                                color: "white",
                                fontSize: "7rem",
                                fontWeight: 600,
                                lineHeight: 1.2,
                            }}>{(data.speedState).toFixed(0)}</tspan>
                            <tspan className="kmh" x="130" dy="1.4em" style={{
                                fontSize: "2rem",
                                fontWeight: "lighter",
                                color: "white",
                            }}>KM/H</tspan>
                        </text>
                    <defs>
                        <linearGradient id="grad2" x1="0%" y1="0%" x2="0%" y2="180%">
                            <stop offset="0%" style={{ stopColor: "rgb(0, 0, 0, .3)", stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: "rgb(70, 70, 70, .3)", stopOpacity: 1 }} />
                        </linearGradient>
                    </defs>
                    <path className='anim' d="M 0 0 a 180 180 0 1 1 260 0"
                        strokeWidth="25" style={{
                            stroke: `url(#grad1)`,
                            strokeMiterlimit: 10,
                            strokeLinecap: "square",
                            strokeOpacity: 1,
                            strokeDasharray: circumference + ", " + circumference,
                            strokeDashoffset: circumference - ((data.speedState+1) / maxSpeed) * circumference,
                            strokeWidth: "5%",
                        }} fill="none" fill-opacity="0.1" stroke='white' stroke-width='20' />
                    <defs>
                        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" style={{ stopColor: "#64FFF6", stopOpacity: 1 }} />
                            <stop offset="50%" style={{ stopColor: "#FFFFFF", stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: "#FF3737", stopOpacity: 1 }} />
                        </linearGradient>
                    </defs>
                </svg>

            </div>
        </div>
    );
};

export default SpeedComponent;