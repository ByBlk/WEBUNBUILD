import { useState } from 'react';
import { fetchNui } from '@hooks/fetchNui';
import '../style/index.scss';
import { NameComponent, IdComponent } from './index';
import { getCdnUrl } from '@utils/misc';
import Button from "@/components/button/button";

export interface MulticharProps {
    data: {
        visible: boolean;
        items: Array<{
            id: number;
            info: number;
            firstName: string;
            lastName: string;
            img: string;
        }>;
        isPremium: boolean;
        isPremiumPlus: boolean;
    };
}

const style = {
    fontSize: "2vh",
    width: "90.5%",
    height: "100%",
};

const MultiComponent: React.FC<MulticharProps> = ({ data }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedPersonnage, setSelectedPersonnage] = useState<{ id: number; firstName: string; lastName: string; img: string; premium?: boolean; premiumplus?: boolean }>(data.items[0]);
    const [isCreatingCharacter, setIsCreatingCharacter] = useState(false);

    const maxSlots =  data.isPremiumPlus ? 3 : data.isPremium ? 3 : 2;
    const isCreating = activeIndex === data.items.length && data.items.length < maxSlots; 

    const handleCreateNewPersonnage = () => {
        if (isCreatingCharacter) return;
        setIsCreatingCharacter(true);
    
        fetchNui('multicharacter:createNewPersonnage')
    };

    const handlePlayerSelected = (playerId: number | undefined) => {
        fetchNui('multicharacter:PlayerSelected', playerId)
    };

    const handlePlayerHovered = (playerId: number | undefined, item: { id: number; firstName: string; lastName: string; img: string; premium?: boolean; premiumplus?: boolean }, index: number) => {
        if (playerId) {
            fetchNui('multicharacter:PlayerHovered', playerId)
        }
        setSelectedPersonnage({
            ...item,
            premium: index === 1 ? !data.isPremium : item.premium,
            premiumplus: index === 2 ? !data.isPremiumPlus : item.premiumplus
        });
    };
    

    return (
        <div className='Multi-container'>
            <div className='Multi-contain'>
                {Array.from({ length: maxSlots }).map((_, index) => {
                    const item = data.items[index] || { id: `${index + 1}`, firstName: 'Nouveau', lastName: 'personnage', img: `${getCdnUrl('assets/creator', 'create.svg')}` };
                    return (
                        <div
                            className={`multi-case ${index === activeIndex ? 'active' : ''}`}
                            key={item.id}
                            onClick={() => {
                                if (activeIndex === index) return
                                setActiveIndex(index);
                                handlePlayerHovered(item.id, item, index); 
                            }}
                        >
                            <div className={`case_img`}> 
                                <img src={item.img} style={item.firstName === 'Nouveau' ? { width: '40%' } : {}} />
                            </div>
                            <h1>{item.firstName} {item.lastName}</h1>
                        </div>
                    );
                })}
            </div>

            <div className='Multi-container__Button'>
                {selectedPersonnage?.premium ? (
                    <Button
                        color="yellow"
                        fontWeight={300}
                        fontSize={style.fontSize}
                        label="Premium"
                        width={style.width}
                        height={style.height}
                        callback={() => fetchNui("", {})}
                        margin="5%"
                    />
                ) : selectedPersonnage?.premiumplus ? (
                    <Button
                        color="premiumPlus"
                        fontWeight={300}
                        fontSize={style.fontSize}
                        label="Premium"
                        children={<span style={{
                            fontSize: "2vh",
                            fontWeight: 800,
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
                        callback={() => fetchNui("", {})}
                        margin="5%"
                    />
                ) : ( 
                    <Button
                        color="green"
                        fontWeight={300}
                        fontSize={style.fontSize}
                        label={
                            data.items[activeIndex] 
                                ? "Jouer"
                                : "Créer"
                        }
                        width={style.width}
                        height={style.height}
                        callback={() => {
                            if (isCreating) {
                                handleCreateNewPersonnage(); 
                            } else {
                                handlePlayerSelected(data.items[activeIndex]?.id);
                            }
                        }} 
                        margin="5%"
                    />
                )} 
            </div>

            {!isCreating && data.items[activeIndex] && (
                <div>
                    <NameComponent data={{
                        firstName: data.items[activeIndex].firstName,
                        lastName: data.items[activeIndex].lastName,
                    }} />
                    <IdComponent data={{ info: data.items[activeIndex].info }} />
                </div>
            )}
        </div>
    );
};

export default MultiComponent;