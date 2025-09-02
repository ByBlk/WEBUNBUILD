import React, { FunctionComponent } from "react";
import {fetchNui, useNuiEvent} from '@/hook'
import { ItemDescription } from "../utils/ItemDescription";
import { ItemPanel } from "../utils/ItemPanel";
import textToStyled from '../../../../utils/textToStyled.tsx';

export const FactorySlider: FunctionComponent<any> = ({ item, theme, isSelected }) => {
    const [sliderValue, setSliderValue] = React.useState(item.value);

    useNuiEvent('nui:xmenu:left', () => {
        if (!isSelected) return;
        const newValue = Math.max(item.min, sliderValue - 1);
        setSliderValue(newValue);
        fetchNui("onChange:" + item.id, { value: sliderValue });
    });

    useNuiEvent('nui:xmenu:right', () => {
        if (!isSelected) return;
        const newValue = Math.min(item.max, sliderValue + 1);
        setSliderValue(newValue);
        fetchNui("onChange:" + item.id, { value: sliderValue });
    });

  return (
    <div className={`${theme}__content__item ${isSelected ? 'selected' : ''}`}>
      <div className={theme +'__content__item__label'}>{textToStyled(item.label)}</div>
      <input
        className={theme +'__content__item__sliderpanel'}
        type="range"
        min={item.min}
        value={sliderValue}
        max={item.max}
      />
      {isSelected && item.style?.description && (
        <ItemDescription description={item.style.description} theme={theme} />
      )}
      {isSelected && item.style?.panel && (
        <ItemPanel
          title={item.style.panel.title}
          image={item.style.panel.image}
          value={[[item.style.panel.value]]}
          statistics={[[item.style.panel.statistics]]}
          theme={theme}
        />
      )}
    </div>
  );
};
