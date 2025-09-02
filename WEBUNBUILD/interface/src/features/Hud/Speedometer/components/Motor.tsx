import { getCdnUrl } from "@utils/misc";

interface SpeedoMotorProps {
	data: {
		motorState: number;
	};
}

const MotorComponent: React.FC<SpeedoMotorProps> = ({ data }) => {
	const motor_arc = 90;
	const radius = 180;
	const circumferenceMotor = radius * 2 * Math.PI * ((360 - motor_arc) / 360);
	const maxMotor = 100;

	return (
		<div className="motor">

			<svg className="arc-circle" viewBox="-190 -380 570 492" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M 0 0 a 190 190 0 1 1 310 0" fill="none" strokeWidth="35" stroke='#FFFFFF33'
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
						strokeDasharray: circumferenceMotor + ', ' + circumferenceMotor,
						strokeDashoffset: circumferenceMotor - (data.motorState / maxMotor) * circumferenceMotor
					}} fill="none" fill-opacity="0.1" stroke='white' stroke-width='37' />

			</svg>

			<img src={getCdnUrl("assets/hud", "Motor.svg")} />

		</div>
	);
};

export default MotorComponent;