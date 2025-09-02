import { FunctionComponent } from 'react';
import textToStyled from '../../../../utils/textToStyled.tsx';
import {getCdnUrl2} from "@/utils";

interface ItemDescriptionProps {
  description: string;
  theme: string;
}

export const ItemDescription: FunctionComponent<ItemDescriptionProps> = ({ description, theme }) => {
  return (
    <div className={theme + '__content__item__description'}>
      <div className={theme + '__content__item__description__value'}>
        <div className={theme + '__content__item__description__value__left'}>
          <h1>Report #2</h1>
        </div>
        <div className={theme + '__content__item__description__value__right'}>
          <p>13h36</p>
          <img className={theme + '__content__item__description__value__icon'} src={getCdnUrl2(`assets/xmenu/icon/clock.svg`)} />
        </div>
      </div>
      <div className={theme + '__content__item__description__textearea'}>
        <div className={theme + '__content__item__description__textearea__texte'}>
          <p>{textToStyled(description)}</p>
        </div>
      </div>
    </div>
  );
};
