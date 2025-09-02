type TElement = {
	name: string;
	endlabel?: {
		value: string | number;
		input: boolean;
		max?: number;
	};
	circle?: {
		backgroundColor: string;
		padding: boolean;
	};
	icon?: string;
	selected: boolean;
	delete?: {
		icon: string;
		onClick: () => void;
	};
	input?: {
		type: string;
		onEnter?: (event: React.KeyboardEvent) => void;
	}
	onClick?: () => void;
	onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void; // Update this line
}
export default TElement;