import { debugData } from "@/hook";

export const JobPanel = (visible: boolean) => {
  debugData([
    {
      action: 'nui:JobPanel:visible',
      data: {
        visible: visible,
        data : {
          society: "UWU COFFEE",
          society_banner: "assets/catalogues/headers/header_uwucoffee.webp",
          employee: "Giovanni Caruso",
          colaborators:[
            {name: "Giovanni Caruso", online: true},
            {name: "Giovanni Caruso", online: true},
            {name: "Giovanni Caruso", online: true},
            {name: "Giovanni Caruso", online: true},
            {name: "Giovanni Caruso", online: true},
          ],
          item : [
            {label: "Caisse", img : "jobpanel/caisse.svg", key: "caisse", locked: true},
            {label: "Comptabilité", img : "jobpanel/GestionMoney.svg", key: "comptabilite", locked: false},
            {label: "Gestion", img : "jobpanel/gestion.svg", key: "gestion", locked: true},
            {label: "Facture", img : "jobpanel/factures.svg", key: "facture", locked: true},
            {label: "Paies", img : "jobpanel/paies.svg", key: "paies", locked: false},
            {label: "Banque", img : "jobpanel/banque.svg", key: "banque", locked: true},
          ],
          catalogue: [
            {label: "BarbaMilk", price: 5},
            {label: "BarbaMilk", price: 5},
            {label: "BarbaMilk", price: 5},
            {label: "BarbaMilk", price: 5},
            {label: "BarbaMilk", price: 5},
            {label: "BarbaMilk", price: 5},
            {label: "BarbaMilk", price: 5},
            {label: "BarbaMilk", price: 5},
            {label: "BarbaMilk", price: 5},
            {label: "BarbaMilk", price: 5},
          ]
        }
      }
    },
  ])
}