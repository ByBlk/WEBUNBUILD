import "./style/index.scss";
import React, { useState } from "react";
import { useNuiEvent } from "@/hook";
import PoundComponent from "./components/Pound";
import { fetchNui } from "@hooks/fetchNui";
import { useEscapeKey } from "@hooks/useKeys";
import { PoundData } from "./types/types";

const Pound: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [poundData, setPoundData] = useState<PoundData | null>(null);

  useNuiEvent("nui:pound:visible", (status: boolean) => {
    setVisible(status);
  });

  useNuiEvent("nui:pound:data", (data: PoundData) => {
    setPoundData(data);
  });

  useEscapeKey(() => {
    fetchNui('nui:pound:close');
    setVisible(false);
  }, visible, 'keydown');

  return visible ? (
    <div className="Main">
      <PoundComponent data={poundData || { Crew: [], Personnel: [], Business: [] }} />
    </div>
  ) : null;
};

export default Pound;