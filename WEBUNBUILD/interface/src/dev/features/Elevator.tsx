import {debugData} from "@/hook";
import {IElevatorData} from "@/features/Elevator/types.ts";



export const Elevator = (visible: boolean) => {
    debugData([
        {
            action: 'nui:elevator:visible',
            data: visible
        }
    ]);
    debugData([
        {
            action: 'nui:elevator:data',
            data: mockData
        }
    ]);
}

const mockData: IElevatorData = {
    floor: [
        "-2",
        "-1",
        "0",
        "1",
        "2",
        "3",
    ],
    currentFloor: "0"
}