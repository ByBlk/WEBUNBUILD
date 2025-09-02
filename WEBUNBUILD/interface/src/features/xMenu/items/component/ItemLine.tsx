import {FunctionComponent} from "react";

interface LineProps {
    item: {
        id: string;
        type: string;
    },
    theme: string,
    isSelected?: boolean
}

export const FactoryLine: FunctionComponent<LineProps> = ({theme}) => {
    return (
        <div
            className={theme + '__content__itemsf'}
            tabIndex={0}
        >
            <div className={theme + '__content__itemsf__line'}></div>
        </div>
    );
};
