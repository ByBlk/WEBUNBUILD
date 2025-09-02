import { useState } from 'react';
import { fetchNui } from '@/hook/fetchNui';
import '../style/index.scss';
import MediaCdn from '@/components/mediaCdn/mediaCdn';
import Button from "@/components/button/button";

interface EmplacementData {
  data: {
    items: Array<{
      id: string;
      name: string;
      img: string;
    }>;
    premium: boolean; 
    premiumplus: boolean;
  };
}

const style = {
  fontSize: "2vh",
  width: "90.5%",
  height: "100%",
};

const EmplacementComponents: React.FC<EmplacementData> = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedEmplacement, setSelectedEmplacement] = useState<{ id: string; name: string; img: string; premium?: boolean; premiumplus?: boolean }>(data.items[0]);
  const maxSlots = 3;

  const handleEmplacementSelected = (emplacement: { id: string; name: string; img: string; premium?: boolean; premiumplus?: boolean }, index: number) => {
    setActiveIndex(index);
    setSelectedEmplacement({ 
      ...emplacement, 
      premium: index === 1 ? !data.premium : emplacement.premium, 
      premiumplus: index === 2 ? !data.premiumplus : emplacement.premiumplus 
    });
    fetchNui('garagePublic:selectEmplacement', emplacement.id)
  };

  return (
    <div className='EmplacementComponents'>
      <h1>Véhicules</h1>
      <div className='EmplacementComponents__Containt'>
        {Array.from({ length: maxSlots }).map((_, index) => {
          const emplacement = data.items[index] || { id: `${index + 1}`, name: `Emplacement ${index + 1}`, img: 'nvem.webp' };
          return (
            <div 
              className={`Items ${index === activeIndex ? 'selected' : ''}`} 
              key={emplacement.id} 
              onClick={() => handleEmplacementSelected(emplacement, index)}
            >
              <div className={`Items__img ${emplacement.img === 'nvem.webp' ? 'default-img' : ''}`}>
                <MediaCdn path="vehicules" name={emplacement.img} />
              </div>
              <div className="Items__label">
                <h1>{emplacement.name}</h1>
              </div>
            </div>
          );
        })}
      </div>

      <div className='EmplacementComponents__Button'>
        {selectedEmplacement?.premium ? (
          <Button
            color="yellow"
            fontWeight={300}
            fontSize={style.fontSize}
            label="Premium"
            width={style.width}
            height={style.height}
            callback={() => fetchNui("nui:garagePublic:premium", {})}
            margin="5%"
          />
        ) : selectedEmplacement?.premiumplus ? (
          <Button
            color="premiumPlus"
            fontWeight={300}
            fontSize={style.fontSize}
            label="Premium"
            children={<span style={{
              fontSize: "2vh",
              fontWeight: 600,
              color: "white",
              position: "absolute",
              top: "8%",
              right: "-20%",
              background: 'linear-gradient(90deg, #FBC504 0%, #FBBC04 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}> +</span>}
            width={style.width}
            height={style.height}
            callback={() => fetchNui("nui:garagePublic:premiumPlus", {})}
            margin="5%"
          />
        ) : (
          <Button
            color="green"
            fontWeight={300}
            fontSize={style.fontSize}
            label="Utiliser"
            width={style.width}
            height={style.height}
            callback={() => fetchNui("nui:garagePublic:use", { selectedEmplacement })}
            margin="5%"
          />
        )}
      </div>
    </div>
  );
};

export default EmplacementComponents;