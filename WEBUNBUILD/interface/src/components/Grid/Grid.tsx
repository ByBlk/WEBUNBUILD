import React, { useState } from "react";
import {  playOnHoverSound } from "@utils/playSound";
import './style.scss';

interface GridItemProps {
  Image: string;
  Label: string;
  Price?: string;
  onSelect: () => void; 
  isSelected: boolean;
}

export const Grid: React.FC<{ items: GridItemProps[] }> = ({ items }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleSelect = (index: number) => {
    setSelectedIndex(prevIndex => (prevIndex === index ? null : index));
    playOnHoverSound();
  };

  return (
    <div className="grid__container">
      {items.map((item, index) => (
        <GridItem
          key={index}
          Image={item.Image}
          Label={item.Label}
          Price={item.Price}
          onSelect={() => { 
            item.onSelect(); 
            handleSelect(index); 
          }}
          isSelected={selectedIndex === index} 
        />
      ))}
    </div>
  );
};

const GridItem: React.FC<GridItemProps> = ({ Image, Label, Price, onSelect, isSelected }) => {
  const [hovered, setHovered] = useState<boolean>(false);

  return (  
    <div
      className={`grid__container__item ${isSelected ? "selected" : ""} ${hovered ? "hovered" : ""}`}
      onClick={onSelect}  
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="grid__container__image">
        <img src={Image} alt={Label} draggable={false} />
      </div>
      <div className="grid__container__name">
        <span>{Label}</span>
      </div>
      <div className={`grid__container__price ${hovered || isSelected ? "visible" : ""}`}>
        <span>{Price}</span>
      </div>
    </div>
  );
};
