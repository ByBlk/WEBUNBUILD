import { FunctionComponent, useState, useEffect } from "react";
import {fetchNui, useNuiEvent} from '@/hook'
import { ItemDescription } from "../utils/ItemDescription";
import { ItemPanel } from "../utils/ItemPanel";
import textToStyled from '../../../../utils/textToStyled.tsx';

export const FactoryList: FunctionComponent<any> = ({ item, theme, isSelected }) => {
  const [hovered, setHovered] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(item.index - 1 || 0);

  useNuiEvent('nui:xmenu:enter', () => {
    if (!isSelected) return;
    fetchNui("onSelected:" + item.id, currentIndex);
  });

  useNuiEvent('nui:xmenu:left', () => {
    if (!isSelected) return;
    setCurrentIndex((prevIndex: number) => {
      const newIndex = (prevIndex - 1 + item.value.length) % item.value.length;
      fetchNui("onChange:" + item.id, newIndex);
      setCurrentIndex(newIndex);
      return newIndex;
    });
  });

  useNuiEvent('nui:xmenu:right', () => {
    if (!isSelected) return;
    setCurrentIndex((prevIndex: number) => {
      const newIndex = (prevIndex + 1) % item.value.length;
      fetchNui("onChange:" + item.id, newIndex);
      return newIndex;
    });
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
      <div className={theme +'__content__item__label'}>{textToStyled(item.label)}</div>
      <div className={theme + '__content__item__rightlabel'}>
        {'< '}{textToStyled(item.value[currentIndex])}{' >'}
      </div>
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
