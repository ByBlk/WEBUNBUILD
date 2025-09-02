import "./style.scss";

import React, { useEffect, useMemo, useState } from "react";
import Apparence from "./steps/apparence";
import Button from "./utils/button";
import Character from "./steps/character";
import CreationContexte from "./creationContexte";
import Identity from "./steps/identity";
import Outfit from "./steps/outfit";
import Ped from "./steps/ped";
import SpawnPoint from "./steps/spawnPoint";
import Visage from "./steps/visage";
import { fetchNui, useNuiEvent } from "@/hook";
import { ICharacterCreatorData, ICharacterCreatorStore, ICharacterCreatorUserData, PageNameStringType } from "./types";
import MediaCdn from "@/components/mediaCdn/mediaCdn";
import { PAGES_LABEL, PARENT_LIST, SPAWN_POINTS } from "./staticData";
import { getCdnUrl } from "@utils/misc";
import { useEscapeKey } from "@hooks/useKeys";

const CreationPersonnage: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(0);
  const [maxCurrent, setMaxCurrent] = useState(0);
  const [defaultData, setDefaultData] = useState<ICharacterCreatorData | undefined>(undefined);
  const [data, setData] = useState<ICharacterCreatorUserData>({});
  const [canContinue, setCanContinue] = useState(false);
  const [hideNavigation, setHideNavigation] = useState(false);
  const [hidden2, setHidden2] = useState(false);
  const [camera, setCamera] = useState(1);
  const [isClicking, setIsClicking] = useState(false);
  const [oldX, setOldX] = useState<number | null>(null);

  useNuiEvent<boolean>('nui:char-creator:visible', (status) => {
    setVisible(status)
  });

  useNuiEvent<ICharacterCreatorData>('nui:char-creator:data', (data) => {
    setDefaultData(data)
  });

  useEscapeKey(() => {
    fetchNui('nui:char-creator:close');
  }, visible, 'keypress');

  useEffect(() => {
    [
      ...PARENT_LIST.map(e => getCdnUrl('assets/character-creator/parents', e.name + '.png')),
      ...SPAWN_POINTS.map(e => e.elements).flat().map(e => getCdnUrl('assets/character-creator', e.image + '.png'))
    ].forEach((picture) => {
      const img = new Image();
      img.src = picture;
    });
  }, [])

  const currentPageName: PageNameStringType = useMemo(() => {
    if (current === 1 && data?.identity?.characterChoice === "custom") return 'ped';
    return PAGES_LABEL[current];
  }, [current, data])

  useEffect(() => {
    if (visible) {
      fetchNui(`nui:char-creator:${currentPageName}`, {
        newData: data[currentPageName],
      });
    }
  }, [data]);

  const store: ICharacterCreatorStore = {
    current,
    data,
    setData,
    canContinue,
    setCanContinue,
    hideNavigation,
    hidden2,
    setHideNavigation,
    setHidden2,
    catalogue: defaultData?.catalogue ?? [],
    dataButtons: defaultData?.buttons ?? [],
    peds: defaultData?.peds ?? [],
    pedsVariantes: defaultData?.pedsVariantes ?? [],
    hideItemList: defaultData?.hideItemList ?? [],
    setCurrent,
    premium: defaultData?.premium ?? false,
    recoverableCharacters: defaultData?.recoverableCharacters ?? [],
  };

  return visible ? (
    <CreationContexte.Provider value={store}>
      <div className={"creationPersonnage " + (isClicking ? " selected" : "")} onMouseUp={() => setIsClicking(false)}>
        <div
          className={"cameraMove" + (isClicking ? " selected" : "")}
          onMouseDown={() => {
            setIsClicking(true);
          }}
          onMouseMove={e => {
            if (isClicking) {
              if (e.pageX < (oldX ?? 0)) {
                fetchNui("CreationPersonnageMouseMove", {
                  moveCamera: -1,
                });
              } else if (e.pageX > (oldX ?? 0)) {
                fetchNui("CreationPersonnageMouseMove", {
                  moveCamera: 1,
                });
              }

              setOldX(e?.pageX ?? 0);
            }
          }}></div>
        <div className="camerasWrapper">
          <div className="cameraTitle" style={{ marginLeft: -20, marginTop: -1 }}>
            <MediaCdn path="assets/icons" name="eye.svg" props={{ width: 20, style: { marginTop: 2, marginRight: 7 } }} />
            Caméra
          </div>
          <div
            onClick={() => {
              setCamera(0);
              fetchNui("CreationPersonnageSetCamera", {
                newCamera: "full",
              });
            }}
            className={"camera" + (camera === 0 ? " active" : "")}>
            <MediaCdn
              props={{ style: { marginLeft: 1, marginTop: -2 } }}
              path={"assets/character-creator"} name={`camera${camera === 0 ? "Active" : ""}Background.png`} />
            <div style={{ marginLeft: 1, marginTop: -2 }}>2</div>
          </div>
          <div
            onClick={() => {
              setCamera(1);
              fetchNui("CreationPersonnageSetCamera", {
                newCamera: "face",
              });
            }}
            style={{ marginLeft: 5, marginTop: -1 }}
            className={"camera" + (camera === 1 ? " active" : "")}>
            <MediaCdn
              props={{ style: { marginLeft: -9, marginTop: -5 } }} path={"assets/character-creator"} name={`camera${camera === 1 ? "Active" : ""}Background.png`} />
            <div style={{ marginLeft: -9, marginTop: -5 }}>1</div>
          </div>
          <div
            onClick={() => {
              setCamera(2);
              fetchNui("CreationPersonnageSetCamera", {
                newCamera: "chest",
              });
            }}
            className={"camera" + (camera === 2 ? " active" : "")}>
            <MediaCdn
              props={{ style: { marginLeft: -10, marginTop: -6 } }} path={"assets/character-creator"} name={`camera${camera === 2 ? "Active" : ""}Background.png`} />
            <div style={{ marginLeft: -10, marginTop: -6 }}>3</div>
          </div>
        </div>
        <div className="menu">
          <header className="menuHeader">
            <img src="https://cdn.eltrane.cloud/3838384859/assets/character-creator/banner.png" />
          </header>
          <nav className={"menuNavigation"}>
            <div
              className={`navigationItem ${current === 0 ? "currentStep" : ""}`}
              onClick={() => {
                maxCurrent >= 0 && setCurrent(0);
              }}>
              <MediaCdn path="assets/icons" name="fingerprint.svg" props={{ width: 22 }} />
            </div>
            <div
              className={`navigationItem ${current === 1 ? "currentStep" : ""}`}
              onClick={() => {
                maxCurrent >= 1 && setCurrent(1);
              }}>
              <MediaCdn path="assets/icons" name="userTorso.svg" props={{ width: 19 }} />
            </div>
            <div
              className={`navigationItem ${current === 2 ? "currentStep" : ""}`}
              onClick={() => {
                maxCurrent >= 2 && data?.identity?.characterChoice !== 'custom' && setCurrent(2);
              }}>
              <MediaCdn path="assets/icons" name="eye.svg" props={{ width: 21 }} />
            </div>
            <div
              className={`navigationItem ${current === 3 ? "currentStep" : ""}`}
              onClick={() => {
                maxCurrent >= 3 && data?.identity?.characterChoice !== 'custom' && setCurrent(3);
              }}>
              <MediaCdn path="assets/icons" name="dna.svg" props={{ width: 16 }} />
            </div>
            <div
              className={`navigationItem ${current === 4 ? "currentStep" : ""}`}
              onClick={() => {
                maxCurrent >= 4 && data?.identity?.characterChoice !== 'custom' && setCurrent(4);
              }}>
              <MediaCdn path="assets/icons" name="tShirt.svg" props={{ width: 21 }} />
            </div>
            <div
              className={`navigationItem ${current === 5 ? "currentStep" : ""}`}
              onClick={() => {
                maxCurrent >= 5 && setCurrent(5);
              }}>
              <MediaCdn path="assets/icons" name="mapPin.svg" props={{ width: 17 }} />
            </div>
          </nav>

          <div className={"menuContent"}>
            {current === 0 && <Identity isPremium={defaultData?.premium ?? false} />}
            {current === 1 && data?.identity?.characterChoice === "custom" && <Ped />}
            {current === 1 && data?.identity?.characterChoice !== "custom" && <Character />}
            {current === 2 && <Visage />}
            {current === 3 && <Apparence />}
            {current === 4 && <Outfit />}
            {current === 5 && <SpawnPoint onBack={() => setCurrent(4)} />}
          </div>

          <div className={"menuNavigationButtons " + (hideNavigation ? "hidden" : "")}>
            {current > 0 && (
              <Button
                onClick={() => setCurrent(current - 1)}
                type="warn"
                style={{
                  width: 139,
                  height: 32,
                  fontSize: 13,
                  background: 'linear-gradient(to bottom, rgba(0, 0, 0, .2), rgba(15, 15, 15, .2)',
                  marginRight: 'calc(100% - 375px)'
                }}
              >
                Précédent
              </Button>
            )}
            <Button
              onClick={() => {
                setCurrent(current + 1);
                setMaxCurrent(current + 1);
              }}
              style={{
                width: 139,
                height: 32,
                fontSize: 13,
                background: 'linear-gradient(to bottom, rgba(42, 189, 83, .35), rgba(15, 131, 47, .35)'
              }}
              disabled={!canContinue}
              type="success">
              Suivant
            </Button>
          </div>
        </div>
      </div>
    </CreationContexte.Provider>
  ) : null;
};

export default CreationPersonnage;
