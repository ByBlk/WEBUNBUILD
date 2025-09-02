import "./style/index.scss";
import { useState } from "react";
import { fetchNui, useNuiEvent } from "@/hook";
import EmplacementComponents from "./components/Emplacement";
import FouriereComponents from "./components/Fouriere";
import { useEscapeKey } from "@hooks/useKeys";


const GaragePublic: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [GarageEmplacement, setGarageEmplacement] = useState({
    items: [],
    premium: false,
    premiumplus: false,
    event: ""
  });
  const [GarageFourrière, setGarageFourrière] = useState([]);

  useNuiEvent("nui:garagePublic:visible", (status: boolean) => {
    setVisible(status);
  });
  
  useNuiEvent("nui:garagePublic:Emplacement", (data: any) => {
    setGarageEmplacement(data);
  });
  
  useNuiEvent("nui:garagePublic:Fourrière", (data: any) => {
    setGarageFourrière(data);
  });
  
  useEscapeKey(() => {
    fetchNui('nui:garagePublic:close');
    setVisible(false);
  }, visible);

  return visible ? (
    <div className="GaragePublicContainer">
        <div className="GaragePublicContainer__title">
            <h1>Garage</h1>
            <h2 className="GaragePublicContainer__subtitle">Public</h2>
        </div>
        <div className="GaragePublicContainer__content">
            <EmplacementComponents 
                data={{
                    items: GarageEmplacement.items,
                    premium: GarageEmplacement.premium,
                    premiumplus: GarageEmplacement.premiumplus,
                }} 
            />
            <FouriereComponents data={GarageFourrière} />
        </div>
    </div>
  ) : null;
};

export default GaragePublic;

    