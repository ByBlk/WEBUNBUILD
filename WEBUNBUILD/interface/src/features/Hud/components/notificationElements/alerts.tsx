import React, { useRef, useEffect } from "react";
import { CSSTransition } from "react-transition-group";

import NotifSoundAlert from "@assets/sounds/notification.mp3";
import { IAlertData } from "../../types";

interface Props {
  alert: IAlertData;
}

export const alert: React.FC<Props> = ({ alert }) => {
  const ref = useRef(null);

  useEffect(() => {
    const audio = new Audio(NotifSoundAlert);
    audio.play();
  }, []);
  console.log("alert", alert);

  return (
    <CSSTransition
      nodeRef={ref}
      in={true}
      appear={true}
      exit={true}
      timeout={300}
      unmountOnExit
    >
      <div className={`alert`} ref={ref}>
        <img src={alert.image} alt="" />
        <div className="content">{alert.content}</div>
        <div className="loading-bar"></div>
      </div>
    </CSSTransition>
  );
};
