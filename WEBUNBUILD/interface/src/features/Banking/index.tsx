import "./style/index.scss";

import React, { useState } from "react";
import { fetchNui, useNuiEvent } from "@/hook";
import { NavBarComponent, StatistiquesComponent, TransactionsComponent, MyAccountComponent, TransferComponent } from "./components/";
import { useEscapeKey } from "@hooks/useKeys";

const Banking: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [navBar, setNavBar] = useState({ visible: false, name: "", jobLabel: "", isBoss: false, mugshot: "" });
  const [myAccount, setMyAccount] = useState({ visible: false, type: 'account' as 'account' | 'deposit' | 'withdraw', society: false, bank: 0, card: { number: "", date: "", name: "" } });
  const [transactions, setTransactions] = useState({visible: false, history: []});
  const [transfer, setTransfer] = useState({ visible: false });
  const [statistiques, setStatistiques] = useState({ visible: false, history: [] });

  useNuiEvent('nui:banking:visible', (status: any) => {
    setVisible(status.visible)
    setNavBar({ visible: status.navBar.visible, name: status.navBar.name, jobLabel: status.navBar.jobLabel, isBoss: status.navBar.isBoss, mugshot: status.navBar.mugshot });
    setMyAccount({ visible: status.myAccount.visible, type: status.myAccount.type, society: status.myAccount.society, bank: status.myAccount.bank, card: status.myAccount.card });
    setTransactions({ visible: status.transactions.visible, history: status.transactions.history });
    setTransfer({ visible: status.transfer.visible });
    setStatistiques({ visible: status.statistiques.visible, history: status.statistiques.history });
  });
  
  useEscapeKey(() => {
    fetchNui("nui:banking:close");
  }, visible);

  return visible ? (
    <div className="banking">
        <NavBarComponent data={{ visible: navBar.visible, name: navBar.name, jobLabel: navBar.jobLabel, isBoss: navBar.isBoss, mugshot: navBar.mugshot }}/>
        <StatistiquesComponent data={{ visible: statistiques.visible, history: statistiques.history }}/>
        <TransactionsComponent data={{ visible: transactions.visible, history: transactions.history }}/>
        <MyAccountComponent data={{ visible: myAccount.visible, type: myAccount.type, society: myAccount.society, bank: myAccount.bank, card: myAccount.card}}/>
        <TransferComponent data={{ visible: transfer.visible }}/>
    </div>
  ) : null;
};

export default Banking;