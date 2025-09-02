import React, { useEffect, useState } from 'react'
import DevTool from '@/dev/devtool'
import { fetchNui, useNuiEvent } from '@/hook'
import { isEnvBrowser, setClipboard } from '@/utils'
import { uploadImage } from '@utils/mugshot.ts'
import "./index.css"

import {
    ActivityCreationMenu,
    AlternatePropertyMenu,
    Animation,
    Autoecole,
    Banking,
    Blips,
    CharacterCreation,
    ContextMenu,
    DeathScreen,
    EscapeMenu,
    GarageMenu,
    GaragePublic,
    HabitationMenu,
    Hud,
    IllegalTablet,
    Inventory,
    JobMenu,
    KeyboardInput,
    LaboratoriesMenu,
    Multicharacter,
    NewGrandMenu,
    PropertyManagement,
    PropertyMenu,
    RadialMenu,
    Recu,
    ServerGestion,
    TerritoriesMenu,
    MenuPlaque,
    Pound,
    PPA,
    VehicleMenu,
    CreateWeazelNews,
    CardNewsSocietyCreate,
    CardNewsSocietyShow,
    Xmenu,
    MediaPlayer,
    PoliceID,
    ItemTrade,
    MenuLTD,
    Elevator,
    Identity,
    Radio,
    Invoice,
    Craft,
    JobPanel,
    InfoKey,
} from '@/features'
import OrgaManagement from "@/features/orgaManagement/orgaManagement.tsx";

const BROWSER = isEnvBrowser()

const App: React.FC = () => {
  const [visible, setVisible] = useState(BROWSER)


  useNuiEvent<boolean>('nui:visible', (status) => {
    setVisible(status)
  })

  useNuiEvent<string>('nui:clipboard', (value) => {
    setClipboard(value)
  })

  useEffect(() => {
    const updateScale = () => {
      const baseWidth = 1920;
      const baseHeight = 1080;

      const scaleX = window.innerWidth / baseWidth;
      const scaleY = window.innerHeight / baseHeight;
      const newScale = Math.min(scaleX, scaleY);

      document.documentElement.style.setProperty("--scale", String(newScale));
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    fetchNui('nui:webLoaded', true);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  useNuiEvent<string>('nui:uploadMugshot', async (base64Image) => {
    console.log("Image reçue en base64 : ", base64Image);

    try {
      const imageUrl = await uploadImage(base64Image);

      if (imageUrl) {
        console.log(imageUrl);
        fetchNui('nui:mugshotUploaded', { url: imageUrl });
      } else {
        console.error("Erreur lors du traitement de l'image.");
        fetchNui('nui:mugshotUploaded', { url: '' });
      }
    } catch (error) {
      console.error("Erreur lors du traitement de l'image : ", error);
      fetchNui('nui:mugshotUploaded', { url: '' });
    }
  });

  if (!visible && BROWSER) return (
    <div>
      <button onClick={() => setVisible(true)}>Show NUI</button>
    </div>
  );

  if (!visible && !BROWSER) return null;

  return (
    <>
      {BROWSER && <DevTool />}
        <ActivityCreationMenu />
        <AlternatePropertyMenu />
        <Animation />
        <Autoecole />
        <Banking />
        <Blips />
        <CharacterCreation />
        <ContextMenu />
        <DeathScreen />
        <EscapeMenu />
        <GarageMenu />
        <GaragePublic />
        <HabitationMenu />
        <Hud />
        <IllegalTablet />
        <Inventory />
        <JobMenu />
        <KeyboardInput />
        <LaboratoriesMenu />
        <Multicharacter />
        <NewGrandMenu />
        <PropertyManagement />
        <PropertyMenu />
        <RadialMenu />
        <Recu />
        <ServerGestion />
        <TerritoriesMenu />
        <MenuPlaque />
        <PPA />
        <Pound />
        <VehicleMenu />
        <CreateWeazelNews />
        <CardNewsSocietyCreate />
        <CardNewsSocietyShow />
        <Xmenu />
        <MediaPlayer />
        <PoliceID />
        <ItemTrade />
        <MenuLTD />
        <Elevator />
        <Identity />
        <Radio />
        <Craft />
        <Invoice />
        <JobPanel />
        <OrgaManagement />
        <InfoKey />
    </>
  )
}

export default App