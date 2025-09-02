import "./index.scss";

import React, { useState } from "react";
import { useNuiEvent } from "@/hook";
// import {useBackspaceKey, useEnterKey, useEscapeKey} from "@hooks/useKeys.tsx";
// import {playBoutiqueEnter, playBoutiqueLeave, playOnClickSound, playOnHoverSound} from "@utils/playSound";
import { getCdnUrl2 } from "@/utils";

interface JobPanelProps {
  visible: boolean;
  data: {
    society: string;
    employee: string;
    society_banner: string;
    colaborators: {
      name: string;
      online: boolean;
    }[];
    item: {
      label: string;
      img: string;
      key: string;
      locked: boolean;
    }[];
    catalogue: {
      label: string;
      price: number;
    }[];
  };
}

type SubPageType = 'caisse' | 'comptabilite' | 'gestion' | 'facture' | 'paies' | 'banque' | null;

const JobPanel: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [currentSubPage, setCurrentSubPage] = useState<SubPageType>(null);
  const [data, setData] = useState<JobPanelProps['data']>({
    society: '',
    employee: '',
    society_banner: '',
    colaborators: [],
    item: [],
    catalogue: [],
  });

  useNuiEvent('nui:JobPanel:visible', (data: JobPanelProps) => {
    setVisible(data.visible)
    setData(data.data)
    setCurrentSubPage(null) // Reset to main page when opening
  });

  const handleActionClick = (actionKey: string) => {
    // Trouver l'item correspondant
    const item = data.item.find(i => i.key === actionKey);
    // Vérifier si l'item existe et n'est pas verrouillé
    if (item && !item.locked) {
      setCurrentSubPage(actionKey as SubPageType);
    }
    // Si l'item est verrouillé, ne rien faire
  };

  const handleBackToMain = () => {
    setCurrentSubPage(null);
  };

  // Composant pour le contenu principal
  const MainContent = () => (
    <>
      <img className="JobPanel__img" src={getCdnUrl2(data.society_banner)} alt="" />
      <h1>{data.society}</h1>
      <h2>{data.employee}</h2>
      <div className="JobPanel__collaborator">
        <h1>Collaborateurs en service <span className="JobPanel__collaborator__circle"></span></h1>
      </div>

      <div className="JobPanel__collaborator__ContainerList">
        {data.colaborators.map((c, i) => (
          <div key={i} className="JobPanel__collaborator__list">
            <div className="JobPanel__collaborator__list__name">{c.name}</div>
          </div>
        ))}
      </div>

      <div className="JobPanel__action">
        {data.item.map((item, index) => (
          <div
            key={index}
            className={`JobPanel__action__item ${item.locked ? 'JobPanel__action__item--locked' : ''}`}
            onClick={() => handleActionClick(item.key)}
          >
            <img className="JobPanel__action__item__img" src={getCdnUrl2(item.img)} alt="" />
            <p>{item.label}</p>
            {item.locked && (
              <div className="JobPanel__action__item__lock">
                <img src={getCdnUrl2('jobpanel/locked.svg')} alt="" />
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );

  // Composant pour les sous-pages
  const SubPageContent = () => {
    const getSubPageTitle = () => {
      switch (currentSubPage) {
        case 'caisse': return 'Caisse';
        case 'comptabilite': return 'Comptabilité';
        case 'gestion': return 'Gestion';
        case 'facture': return 'Factures';
        case 'paies': return 'GESTION DES SALAIRES';
        case 'banque': return 'Banque';
        default: return '';
      }
    };

    return (
      <div className="JobPanel__subpage">
        <div className="JobPanel__subpage__header">
          <button className="JobPanel__subpage__back" onClick={handleBackToMain}>
            ← Retour
          </button>
          <h1 className="JobPanel__subpage__title">{getSubPageTitle()}</h1>
        </div>
        <div className="JobPanel__subpage__content">
          {currentSubPage === 'caisse' && (
            <div className="JobPanel__caisse">
              <p>Interface de caisse - En développement</p>
            </div>
          )}
          {currentSubPage === 'comptabilite' && (
            <div className="JobPanel__comptabilite">
              <p>Interface de comptabilité - En développement</p>
            </div>
          )}
          {currentSubPage === 'gestion' && (
            <div className="JobPanel__gestion">
              <p>Interface de gestion - En développement</p>
            </div>
          )}
          {currentSubPage === 'facture' && (
            <div className="JobPanel__facture">
              <p>Interface de factures - En développement</p>
            </div>
          )}
          {currentSubPage === 'paies' && (
            <div className="JobPanel__paies">
              <p>Interface de paies - En développement</p>
            </div>
          )}
          {currentSubPage === 'banque' && (
            <div className="JobPanel__banque">
              <p>Interface de banque - En développement</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return visible ? (
    <div className="JobPanel">
      {currentSubPage === null ? <MainContent /> : <SubPageContent />}
    </div>
  ) : null;
};

export default JobPanel;