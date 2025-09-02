import { useReducer, useMemo, useCallback, useState } from "react";
import { getCdnUrl } from "@utils/misc";
import { fetchNui } from "@/hook/fetchNui";
import { Vehicle, PoundData, State, Category } from "../types/types";

const categories = ["Personnel", "Entreprise", "Crews"];

type Action =| { type: "SET_CATEGORY"; payload: Category }| { type: "SELECT_CAR"; payload: number | null };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_CATEGORY":
      return { ...state, selectedCategory: action.payload, selectedCar: null };
    case "SELECT_CAR":
      return { ...state, selectedCar: action.payload };
    default:
      return state;
  }
};

const PoundComponent: React.FC<{ data: PoundData }> = ({ data }) => {
  const [state, dispatch] = useReducer(reducer, {
    selectedCategory: Category.Personnel,
    selectedCar: null,
  });

  const [lastSelectedCar, setLastSelectedCar] = useState<number | null>(null);

  const filteredCars = useMemo(() => {
    switch (state.selectedCategory) {
      case Category.Personnel:
        return data.Personnel;
      case Category.Entreprise:
        return data.Business;
      case Category.Crews:
        return data.Crew;
      default:
        return [];
    }
  }, [state.selectedCategory, data]);

  const handleCarClick = useCallback((index: number) => {
    if (lastSelectedCar !== index) {
      dispatch({ type: "SELECT_CAR", payload: index });
      setLastSelectedCar(index);
      fetchNui("nui:pound:selectedItem", filteredCars[index]);
    }
  }, [filteredCars, lastSelectedCar]);

  const handleBuyClick = () => {
    if (state.selectedCar !== null) {
      fetchNui("nui:pound:use", filteredCars[state.selectedCar]);
    }
  };

  return (
    <div className="Pound">
      <div className="Pound-Container">
        <div className="Pound-Header">
          <img src={getCdnUrl("assets/catalogues/headers", "pound.png")} alt="Pound Header" />
        </div>

        <div className="Pound-Categories">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`Category ${state.selectedCategory === index ? "active" : ""}`}
              onClick={() => dispatch({ type: "SET_CATEGORY", payload: index })}
            >
              <h1>{category}</h1>
            </button>
          ))}
        </div>

        <div className="Pound-Content">
          <CategorySection title="Véhicules">
            <div className="Cars-Container">
              {filteredCars.map((car, index) => (
                <CarItem
                  key={index}
                  car={car}
                  isSelected={state.selectedCar === index}
                  onClick={() => handleCarClick(index)}
                />
              ))}
            </div>
          </CategorySection>
        </div>

        {state.selectedCar !== null && (
          <button className="BuyButton" onClick={handleBuyClick}>
            <h1>200$</h1>
          </button>
        )}
      </div>
    </div>
  );
};

const CategorySection: React.FC<{ title: string; children?: React.ReactNode }> = ({ title, children }) => (
  <div className={`Content-${title}`}>
    <div className="Content-Title">
      <h1>{title}</h1>
    </div>
    {children}
  </div>
);

const CarItem: React.FC<{ car: Vehicle; isSelected: boolean; onClick: () => void }> = ({ car, isSelected, onClick }) => (
  <div className={`Item ${isSelected ? "selected" : ""}`} onClick={onClick}>
    <div className="Image">
      <img src={`${getCdnUrl("vehicules", car.model)}.webp`} alt={car.model} />
    </div>
    <h1>{car.name.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())}</h1>
  </div>
);

export default PoundComponent;
