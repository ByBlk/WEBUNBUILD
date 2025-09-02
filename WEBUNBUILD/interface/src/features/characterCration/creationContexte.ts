import React from "react";
import { ICharacterCreatorStore } from "./types";

export default React.createContext<ICharacterCreatorStore>({
	current: 0,
	data: {},
	setData: () => { },
	canContinue: false,
	setCanContinue: () => { },
	hideNavigation: false,
	hidden2: false,
	setHideNavigation: () => { },
	setCurrent: () => { },
	setHidden2: () => { },
	catalogue: [],
	dataButtons: [],
	peds: [],
	pedsVariantes: [],
	hideItemList: [],
	premium: false,
	recoverableCharacters: [],
});
