import { useEffect } from "react";

export const useEnterKey = (callback: Function) => {
  useEffect(() => {
    const onKeyPressed = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        callback();
      }
    };
    document.addEventListener("keyup", onKeyPressed);
    return () => document.removeEventListener("keyup", onKeyPressed);
  });
};

export const useEscapeKey = (callback: Function, condition: boolean = true, forceEvent: 'keyup' | 'keypress' | 'keydown' = 'keyup') => {
  useEffect(() => {
    const onKeyPressed = (event: KeyboardEvent) => {
      if (event.key === "Escape" && condition) {
        callback();
      }
    };
    document.addEventListener(forceEvent, onKeyPressed);
    return () => document.removeEventListener(forceEvent, onKeyPressed);
  }, [callback, condition, forceEvent]);
};

export const useBackspaceKey = (callback: () => void, condition: boolean = true, forceEvent: 'keyup' | 'keypress' | 'keydown' = 'keyup') => {
  useEffect(() => {
    const onKeyPressed = (event: KeyboardEvent) => {
      if (event.key === "Backspace" && condition) {
        callback();
      }
    };
    document.addEventListener(forceEvent, onKeyPressed);
    return () => document.removeEventListener(forceEvent, onKeyPressed);
  }, [callback, condition, forceEvent]);
};

export const useKey = (keyName: string, callback: Function, forceEvent: 'keyup' | 'keypress' | 'keydown' = 'keyup') => {
	useEffect(() => {
		const onKeyPressed = (event: KeyboardEvent) => {
			if (event.key.toLowerCase() === keyName.toLowerCase()) {
				callback();
			}
		};
		document.addEventListener(forceEvent, onKeyPressed);
		return () => document.removeEventListener(forceEvent, onKeyPressed);
	});
};

export const useUpKey = (callback: Function) => {
  useEffect(() => {
    const onKeyPressed = (event: KeyboardEvent) => {
      if (event.key === "ArrowUp") {
        callback();
      }
    };
    document.addEventListener("keyup", onKeyPressed);
    return () => document.removeEventListener("keyup", onKeyPressed);
  });
};

export const useDownKey = (callback: Function) => {
  useEffect(() => {
    const onKeyPressed = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown") {
        callback();
      }
    };
    document.addEventListener("keyup", onKeyPressed);
    return () => document.removeEventListener("keyup", onKeyPressed);
  });
};

