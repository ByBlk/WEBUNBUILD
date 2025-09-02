import "./style/index.scss";
import { useState } from "react";
import { useNuiEvent } from "@/hook";
import { DeathScreenComponents } from "./components";


const DeathScreen: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [deathscreenData, setDeathscreenData] = useState({
    visible: false,
    timer: 100,
    id: 0,
  });

  useNuiEvent("nui:deathscreen:visible", (status: any) => {
    setVisible(status.visible);
      setDeathscreenData({
          visible: status.visible,
          timer: status.secToWait,
          id: 0,
      });
  });

  useNuiEvent("nui:deathscreen:data", (data: any) => {
    setDeathscreenData(data);
  });

  return visible ? (
    <div className="DeathscreenContainer">
        <DeathScreenComponents data={{
            visible: deathscreenData.visible,
            timer: deathscreenData.timer,
            id: deathscreenData.id,
        }} />
    </div> 
  ) : null;
};

export default DeathScreen;
