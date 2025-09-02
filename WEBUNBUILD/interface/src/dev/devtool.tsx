import React, { useEffect } from 'react';
import { useState } from 'react';
import { Drawer, Tooltip } from './components';
import {
  Craft,
  Invoice,
  Identity,
  Elevator,
  MenuLTD,
  ItemTrade,
  PoliceID,
  Xmenu,
  activityCreationMenu,
  sound,
  CharacterCreator,
  ContextMenu,
  Banking,
  Hud,
  ServerGestion,
  Inventory,
  radialMenu,
  alternatePropertyMenu,
  propertyManagement,
  propertyMenu,
  habitationMenu,
  Recu,
  Multichar,
  illegalTablet,
  territoriesMenu,
  laboratoriesMenu,
  jobMenu,
  jobCenter,
  securoservMenu,
  CreateWeazelNews,
  Blips,
  Animation,
  Autoecole,
  garageMenu,
  GaragePublic,
  KeyboardInput,
  MenuPlaque,
  PPA,
  Pound,
  NewGrandMenu,
  DeathScreen,
  VehicleMenu,
  CardNewsSocietyCreate,
  CardNewsSocietyShow,
  MediaPlayer,
  JobPanel,
  InfoKey,
} from './features';
import './devtool.css';
import { crewManagement } from './features/crewManagementMenu';
import { escapeMenu } from './features/escapeMenu';

const FEATURES = {
  'soundPlayer': sound,
  'CharacterCreator': CharacterCreator,
  'Banking': Banking,
  'Hud': Hud,
  'ContextMenu': ContextMenu,
  'ServerGestion': ServerGestion,
  'Inventory': Inventory,
  'RadialMenu': radialMenu,
  'alternatePropertyMenu': alternatePropertyMenu,
  'propertyManagement': propertyManagement,
  'propertyMenu': propertyMenu,
  'habitationMenu': habitationMenu,
  'Recu': Recu,
  'Multichar': Multichar,
  'Laboratories': laboratoriesMenu,
  'IllegalTablet': illegalTablet,
  'Territories': territoriesMenu,
  'JobMenu': jobMenu,
  'JobCenter': jobCenter,
  'Securoserv': securoservMenu,
  'CrewManagement': crewManagement,
  'CreateWeazelNews': CreateWeazelNews,
  'Blips': Blips,
  'EscapeMenu': escapeMenu,
  'Animation': Animation,
  'ActivityCreationMenu': activityCreationMenu,
  'Autoecole': Autoecole,
  'GarageMenu': garageMenu,
  'GaragePublic': GaragePublic,
  'KeyboardInput': KeyboardInput,
  'MenuPlaque': MenuPlaque,
  'PPA': PPA,
  "Fouriere":Pound,
  'DeathScreen': DeathScreen,
  'NewGrandMenu': NewGrandMenu,
  'VehicleMenu': VehicleMenu ,
  'CardNewsSocietyCreate': CardNewsSocietyCreate,
  'CardNewsSocietyShow': CardNewsSocietyShow,
  'Xmenu': Xmenu,
  'MediaPlayer': MediaPlayer,
  'PoliceID': PoliceID,
  'ItemTrade': ItemTrade,
  'MenuLTD': MenuLTD,
  'Elevator': Elevator,
  'Identity': Identity, 
  'Invoice': Invoice, 
  'JobPanel': JobPanel,
  'Craft': Craft,
  'InfoKey': InfoKey,
};


const DevTool: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerPosition, setDrawerPosition] = useState<'left' | 'right'>('left');
  const [currentVisible, setCurrentVisible] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');  // Ajout de l'état de recherche

  const handleVisible = (name: string, wantClose: boolean = true) => {
    if (!FEATURES[name as keyof typeof FEATURES]) return;
    if (FEATURES[currentVisible as keyof typeof FEATURES]) {
      FEATURES[currentVisible as keyof typeof FEATURES](false);
      setCurrentVisible('');
    }
    if (FEATURES[name as keyof typeof FEATURES] && currentVisible !== name) {
      FEATURES[name as keyof typeof FEATURES](true);
      setCurrentVisible(name);
    }

    setIsDrawerOpen(!wantClose);
  };

  useEffect(() => {
    handleVisible('NewGrandMenu', true);
  }, []);

  const filteredFeatures = Object.keys(FEATURES).filter((featureKey) =>
    featureKey.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="devtool">
      <Drawer
        isOpen={isDrawerOpen}
        position={drawerPosition}
        onClose={() => setIsDrawerOpen(false)}
      >
        <div className="drawer-header">
          <h2>Dev Tools</h2>
        </div>
        <div className="drawer-content">
          <div className="drawer-controls">
            <button
              className="position-toggle"
              onClick={() => setDrawerPosition(drawerPosition === 'left' ? 'right' : 'left')}
            >
              <span className="position-icon">
                {drawerPosition === 'left' ? '→→→→→→→→' : '←←←←←←←←'}
              </span>
            </button>
          </div>
          
          <div className='drawer-search'>
          <input
                  type="text"
                  placeholder="Search features..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)} 
                  className="search-bar"
                />
          </div>
     

          {filteredFeatures.map((featureKey) => (
            <button key={featureKey} onClick={() => handleVisible(featureKey)}>
              <span className="feature-icon"></span>
              <span>{featureKey}</span>
            </button>
          ))}
        </div>
      </Drawer>
      <Tooltip onClick={() => setIsDrawerOpen(!isDrawerOpen)} status={isDrawerOpen ? 'Close' : 'Open'} />
    </div>
  );
};

export default DevTool;

