import { debugData } from "@/hook";

export const KeyboardInput = (visible: boolean) => {
  debugData([
    {
      action: 'nui:keyboardinput:visible',
      data: visible
    }
  ]);
  debugData([
    {
      action: 'nui:keyboardinput:setData',
      data: { title: "test", defaultValue: "" }
    }
  ])
};