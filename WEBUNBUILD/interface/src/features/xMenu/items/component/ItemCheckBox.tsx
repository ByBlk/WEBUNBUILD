import {FunctionComponent, useState} from "react";
import {fetchNui, useNuiEvent} from '@/hook'
import {ItemDescription} from "../utils/ItemDescription";
import {ItemPanel} from "../utils/ItemPanel";
import textToStyled from '../../../../utils/textToStyled.tsx';

interface CheckboxProps {
    item: {
        id: string;
        type: string;
        label: string;
        default: boolean;
        style?: Style;
    },
    isSelected: boolean,
    theme: string,
    isChecked?: boolean
}

interface Style {
    description?: string;
    panel?: {
        title: string;
        image: string;
        value: string;
        statistics: string;
    };
}

export const FactoryCheckbox: FunctionComponent<CheckboxProps> = ({item, theme, isSelected}) => {
    const [isChecked, setIsChecked] = useState(item.default);

    useNuiEvent('nui:xmenu:enter', () => {
        if (!isSelected) return;
        setIsChecked(prevState => !prevState);
        fetchNui("onChange:" + item.id, !isChecked);
    });

    return (
        <div className={`${theme}__content__item ${isSelected ? 'selected' : ''}`}>
            <div className={theme + '__content__item__label'}>{textToStyled(item.label)}</div>
            <div className={theme + '__content__item__checkbox'}>
                <input
                    type="checkbox"
                    id={`cb-${item.id}`}
                    className={theme + '__content__item__checkbox'}
                    checked={isChecked}
                />
                <label htmlFor={`cb-${item.id}`} className="tgl-btn" data-tg-on="Actif" data-tg-off="Inactif"></label>
            </div>
            {isSelected && item.style?.description && (
                <ItemDescription description={item.style.description} theme={theme}/>
            )}
            {isSelected && item.style?.panel && (
                <ItemPanel
                    title={item.style.panel.title}
                    image={item.style.panel.image}
                    value={item.style.panel.value ? [[item.style.panel.value]] : undefined}
                    statistics={item.style.panel.statistics ? [[item.style.panel.statistics]] : undefined}
                    theme={theme}
                />
            )}
        </div>
    );
};
