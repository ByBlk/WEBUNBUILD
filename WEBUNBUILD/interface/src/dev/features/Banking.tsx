import { debugData } from "@/hook";
export const Banking = (visible: boolean) => {
  debugData([
    {
      action: 'nui:banking:visible',
      data: {
        visible: visible,
        navBar: {
          visible: visible,
          name: "Jhon Wick",
          jobLabel: "UwU Coffee",
          isBoss: true,
          mugshot: "https://cdn.eltrane.cloud/3838384859/assets/banking/logo.png"
        },
        myAccount: {
          visible: visible,
          type: 'account',
          bank: 0,
          card: {
            number: "0000 0000 0000 0000",
            date: "12/25",
            name: "Jhon Wick"
          }
        },
        myEntreprise: {
          visible: false,
          type: 'account',
          bank: 1200000,
          card: {
            number: "0000 0000 0000 0000",
            date: "12/25",
            name: "UwU Coffee"
          }
        },
        transactions: {
          visible: visible,
          history: [
            {
              id: 1,
              date: "2023-10-01",
              amount: 100,
              type: "deposit"
            },
            {
              id: 2,
              date: "2023-10-02",
              amount: -50,
              type: "withdrawal"
            }
          ]
        }
      }
    }
  ]);
  debugData([
    {
      action: 'nui:banking:navBar',
      data: {
        visible: visible,
        name: "Jhon Wick",
    }
  }]);
}