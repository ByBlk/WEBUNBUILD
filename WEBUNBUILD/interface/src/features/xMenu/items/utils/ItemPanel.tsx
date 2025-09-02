import { FunctionComponent } from 'react';
import textToStyled from '../../../../utils/textToStyled.tsx';

interface PanelProps {
  title?: string;
  image?: string;
  theme: string;
  value?: any;
  statistics?: any;
}

export const ItemPanel: FunctionComponent<PanelProps> = ({ title, image, value, statistics, theme }) => {
  return (
    <div className={`${theme}__content__item__panel`}>
      {title && <div className={`${theme}__content__item__panel__title`}>{textToStyled(title)}</div>}
      {image && <img src={image} alt="" className={theme + '__content__item__panel__banner'} />}
      {value && (
        <table>
          <tbody>
            {value.map((pair: string[], index: number) => (
              <tr key={index}>
                <td className={`${theme}__content__item__panel__left`}>{textToStyled(pair[0])}</td>
                <td className={`${theme}__content__item__panel__right`}>{textToStyled(pair[1])}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {statistics && (
        <table>
          <tbody>
            {statistics.map((pair: string[], index: number) => (
              <tr key={index}>
                <td className={`${theme}__content__item__panel__left`}>{textToStyled(pair[0])}</td>
                <input
                  className={theme + '__content__item__panel__sliderpanel'}
                  type="range"
                  min="0"
                  value={pair[1]}
                  max="100"
                />
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
