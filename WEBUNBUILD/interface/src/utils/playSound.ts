import sound from "@assets/sounds/onHover.mp3";
import sound2 from "@assets/sounds/onClick.mp3";
import sound3 from "@assets/sounds/boutiqueEnter.mp3";
import sound4 from "@assets/sounds/boutiqueLeave.mp3";
import sound5 from "@assets/sounds/onDoubleClick.wav";
import sound6 from "@assets/sounds/onSelect.wav";
import sound7 from "@assets/sounds/onClick2.wav";

export const playOnHoverSound = () => {
	const audio = new Audio(sound);
	audio.volume = .5;
	audio.play();
};

export const playOnClickSound = () => {
	const audio = new Audio(sound2);
	audio.volume = .5;
	audio.play();
};

export const playOnClick2Sound = () => {
	const audio = new Audio(sound7);
	audio.volume = .5;
	audio.play();
};

export const playOnDoubleClickSound = () => {
	const audio = new Audio(sound5);
	audio.volume = .5;
	audio.play();
};

export const playOnSelectSound = () => {
	const audio = new Audio(sound6);
	audio.volume = .5;
	audio.play();
};

export const playBoutiqueEnter = () => {
	const audio = new Audio(sound3);
	audio.volume = 0.15;
	audio.play();
};

export const playBoutiqueLeave = () => {
	const audio = new Audio(sound4);
	audio.volume = 0.15;
	audio.play();
};
