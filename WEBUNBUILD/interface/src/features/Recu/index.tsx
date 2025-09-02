import "./style/index.scss";
import React, { useState } from "react";
import { fetchNui, useNuiEvent } from "@/hook";
import { RecuComponent } from "./components";
import { useEscapeKey } from "@hooks/useKeys";


const Recu: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [RecuData, setRecuData] = useState({ visible: false, title: "", employee: "", customer: "", date: '', items: [], reduce: 0, total: 0 });

  useNuiEvent('nui:recu:visible', (status: boolean) => {
    setVisible(status)
  });

  useNuiEvent('nui:recu:data', (data: any) => {
    setRecuData(data)
  });

  useEscapeKey(() => fetchNui('nui:recu:close'), visible);
  
  return visible ? (
    <div className="Recu-container">
      <RecuComponent data={{
        visible: visible,
        title: RecuData.title,
        employee: RecuData.employee,
        customer: RecuData.customer,
        date: RecuData.date,
        items: RecuData.items,
        reduce: RecuData.reduce,
        total: RecuData.total,
      }} />
    </div>
  ) : null;
};

export default Recu;