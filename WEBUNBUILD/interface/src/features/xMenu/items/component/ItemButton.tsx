import { FunctionComponent, useState, useEffect } from 'react';
import {fetchNui, useNuiEvent} from '@/hook'
import { ItemDescription } from '../utils/ItemDescription';
import { ItemPanel } from '../utils/ItemPanel';
import textToStyled from '../../../../utils/textToStyled.tsx';
import {getCdnUrl2} from "@/utils";

interface Style {
  rightLabel?: string;
  rightIcon?: string;
  description?: string;
  panel?: {
    title?: string;
    image?: string;
    value?: string[][];
    statistics?: string[][];
  };
}

interface ButtonProps {
  item: {
    id: string;
    type: string;
    label: string;
    style?: Style;
  };
  isSelected: boolean;
  theme: string;
}

export const FactoryButton: FunctionComponent<ButtonProps> = ({ item, theme, isSelected }) => {
  const [hovered, setHovered] = useState(false);

  useNuiEvent('nui:xmenu:enter', () => {
    if (!isSelected) return;
    fetchNui('onSelected:' + item.id, {});
  });

  useEffect(() => {
    if (isSelected) {
      if (hovered) {
        fetchNui('onHovered:' + item.id, {});
        setHovered(false);
      }
      fetchNui('onActive:' + item.id, {});
    } else if (!isSelected) {
      setHovered(true);
    }
  }, [isSelected, item.id]);

  return (
    <div
      className={`${theme}__content__item ${isSelected ? 'selected' : ''}`}
      tabIndex={0}
    >
      <div className={theme + '__content__item__label'}>{textToStyled(item.label)}</div>
      {item.style?.rightLabel && (
          <div className={theme + '__content__item__rightlabel'}>{textToStyled(item.style.rightLabel)}</div>
      )}
      {item.style?.rightIcon && (
          <img className={theme + '__content__item__righticon'} src={getCdnUrl2(`assets/xmenu/icon/${item.style.rightIcon}.svg`)} />
      )}
      {isSelected && item.style?.description && (
        <ItemDescription description={item.style.description} theme={theme} />
      )}
      {isSelected && item.style?.panel && (
        <ItemPanel
          title={item.style.panel.title}
          image={item.style.panel.image}
          value={item.style.panel.value}
          statistics={item.style.panel.statistics}
          theme={theme}
        />
      )}
    </div>
  );
};
