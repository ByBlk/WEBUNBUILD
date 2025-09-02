import "./style/index.scss";
import React, { useState } from "react";
import { useNuiEvent } from "@/hook";
import { MultiComponent } from "./components";


const Multichar: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [dataMulti, setDataMulti] = useState({ visible: false, items: [], isPremium: false, isPremiumPlus: false });

  useNuiEvent('nui:multichar:visible', (status: boolean) => {
    setVisible(status)
  });

  useNuiEvent('nui:multichar:data', (data: any) => {
    setDataMulti(data);
  });


  return visible ? (
      <div className="Multichar-container">
        <MultiComponent data={{
          visible: dataMulti.visible,
          items: dataMulti.items,
          isPremium: dataMulti.isPremium,
          isPremiumPlus: dataMulti.isPremiumPlus,
        }}/>
      </div>
  ) : null;
};

export default Multichar;