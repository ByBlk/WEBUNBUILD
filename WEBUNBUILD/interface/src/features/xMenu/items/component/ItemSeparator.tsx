import { FunctionComponent } from "react";
import textToStyled from '../../../../utils/textToStyled.tsx';

interface SeparatorProps {
  item: {
    id: string;
    type: string;
    label: string;
  };
  theme: string;
}

export const FactorySeparator: FunctionComponent<SeparatorProps> = ({ item, theme }) => {
    return (
        <div
          className={theme +'__content__itemsf'}
          tabIndex={0}
        >
          <div className={theme +'__content__itemsf__separator'}>{textToStyled(item.label)}</div>
        </div>
    );
};
