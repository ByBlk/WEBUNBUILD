import React from 'react'; 
export const GlobalContext = React.createContext<{
	data: any;
	setData: React.Dispatch<React.SetStateAction<any>>;
}>({
  data: null,
  setData: () => {},
});