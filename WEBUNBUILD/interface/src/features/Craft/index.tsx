import "./style.scss";
import { CraftData } from "./types";
import React, { useEffect, useMemo, useState } from "react";
import { fetchNui, useNuiEvent } from "@/hook";
import { useEscapeKey } from "@hooks/useKeys.tsx";

import MediaCdn from "@/components/mediaCdn/mediaCdn";
import Header from "./components/header";
import Notification from "./components/notif";

const Craft: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState<CraftData | null>(null);
    const [selected, setSelected] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(2);
    const [using, setUsing] = useState<boolean[]>([]);
    const [recipeState, setRecipeState] = useState<number[]>([]);
    const [step, setStep] = useState<number>(0);
    const [crafting, setCrafting] = useState<{ id: number, name: string, label: string, quantity: number, duration: number }[]>([]);
    const [notifId, setNotifId] = useState<number>(0);
    const [recup, setRecup] = useState<{ id: number, name: string, label: string, quantity: number }[]>([]);

    const increase = () => setQuantity(q => q + 1);
    const decrease = () => setQuantity(q => (q > 1 ? q - 1 : 1));

    useEffect(() => {
        setQuantity(1);
        setUsing([]);
        setRecipeState([]);
        setStep(0);
    }, [selected]);

    useEffect(() => {
        setUsing([]);
        setRecipeState([]);
        setStep(0);
    }, [quantity]);

    useNuiEvent("nui:craft:visible", (status: boolean) => {
        setVisible(status);
    });

    useNuiEvent("nui:craft:data", (data: CraftData) => {
        setData(data);
        setSelected(0);
        setQuantity(1);
        setUsing([]);
        setRecipeState([]);
        setStep(0);
    });

    useNuiEvent("nui:craft:updateInventory", (inventory: { name: string, label: string, amount: number }[]) => {
        setData(prev => {
            if (prev) {
                return {
                    ...prev,
                    inventory: inventory,
                }
            }
            return prev;
        })
        setUsing([]);
        setRecipeState([]);
        setStep(0);
    });

    useEscapeKey(() => {
        fetchNui("nui:craft:close");
    }, visible);

    const handleClick = (index: number) => {
        const recipeItemIndex = data?.craft[selected].recipe.findIndex(recipeItem => recipeItem.name === data?.inventory[index].name);
        if ((recipeItemIndex == null || recipeItemIndex == -1) ||
            (data?.craft[selected].recipe[recipeItemIndex] && data?.inventory[index]?.amount !== undefined && data.inventory[index].amount < (data?.craft[selected].recipe[recipeItemIndex].amount * quantity))) {
            const itemElement = document.querySelector(`.inventory .item:nth-child(${index + 1})`);
            itemElement?.classList.add("error");
            setTimeout(() => {
                itemElement?.classList.remove("error");
            }, 500);
            return;
        };

        const newState = !using[index];

        setRecipeState(prev => {
            const newRecipeState = [...prev];
            if (newState)
                newRecipeState[recipeItemIndex] = index;
            else
                newRecipeState[recipeItemIndex] = -1;
            return newRecipeState;
        })
        setUsing(prev => {
            const newUsing = [...prev];
            newUsing[index] = newState;
            return newUsing;
        });
        setStep(prev => {
            if (newState) {
                return prev + 1;
            } else {
                return prev - 1;
            }
        });
    }

    const inventory = useMemo(() => {
		const items = [];
		const rowAmount = (data?.inventory.length ?? 0) <= 20 ? 6 : Math.ceil((data?.inventory.length ?? 0) / 4);
		for (let y = 0; y <= rowAmount - 1; y++) {
			for (let x = 0; x <= 3; x++) {
                const item = data?.inventory[y * 4 + x]
                if (item) {
                    items.push(
                        <div key={y * 4 + x} className={`item ${using[y * 4 + x] ? "using" : ""}`} onClick={() => handleClick(y * 4 + x)}>
                            <div className="amount">{item.amount}</div>
                            <img src={`https://cdn.eltrane.cloud/3838384859/items/${item.name}.webp`} alt="" />
                            <div className="label">{item.label}</div>
                        </div>
                    )
                } else {
                    items.push(<div className="item" />)
                }
			}
		}
		return items
	}, [data, using])

    const tryCraft = async () => {
        if (step != data?.craft[selected].recipe.length) return;
        const recipe = data?.craft[selected];

        const valide = await fetchNui("nui:craft:craft", {
            name: recipe.name,
            recipe: recipe.recipe,
            quantity: quantity,
        });

        if (valide) {
            setCrafting((prevCrafting) => {
                const newNotifId = notifId + 1;
                const newCrafting = [
                    ...prevCrafting,
                    {
                        id: notifId,
                        name: recipe.name,
                        label: recipe.label,
                        quantity: quantity,
                        duration: recipe.timer * quantity * 1000,
                    },
                ];
                setNotifId(newNotifId);
                return newCrafting;
            });
        }

        setUsing([]);
        setRecipeState([]);
        setStep(0);
    }

    return (
        <div className="container-craft" style={{display: visible ? "flex" : "none"}}>
            <div className="recipes">
                <Header logo="recette.svg" title={data?.title ? data.title : 'Recettes'} />
                <div className="items">
                    {Array.from({ length: (data?.craft.length ?? 0) <= 14 ? 7 : Math.ceil((data?.craft.length ?? 0) / 2) }, (_, i) => (
                        <React.Fragment key={i}>
                            {((data?.craft.length ?? 0) > i*2) ? (
                                <div className={`item ${selected == i*2 ? "selected" : ""}`} onClick={() => setSelected(i*2)}>
                                    <img src={`https://cdn.eltrane.cloud/3838384859/items/${data?.craft[i*2].name}.webp`} alt="" />
                                    <p>{data?.craft[i*2].label}</p>
                                </div>
                            ): <div className="item" />}
                            {((data?.craft.length ?? 0) > i*2+1) ? (
                                <div className={`item ${selected == i*2+1 ? "selected" : ""}`} onClick={() => setSelected(i*2+1)}>
                                    <img src={`https://cdn.eltrane.cloud/3838384859/items/${data?.craft[i*2+1].name}.webp`} alt="" />
                                    <p>{data?.craft[i*2+1].label}</p>
                                </div>
                            ): <div className="item" />}
                        </React.Fragment>
                    ))}
                </div>
            </div>
            <div className="mid">
                <div className="table">
                    <Header logo="tabledecraft.svg" title="Table de Craft" />
                    <div className="infos">
                        <div className="selected">
                            <div className="time">
                                <MediaCdn path="assets/icons" name="items.svg" />
                                <div>{(data?.craft[selected].timer ?? 0) * quantity}s</div>
                            </div>
                            <img src={`https://cdn.eltrane.cloud/3838384859/items/${data?.craft[selected].name}.webp`} alt="" />
                            <div>
                                <p>{data?.craft[selected].label}</p>
                                <div className="quantity">
                                    <div onClick={decrease}>-</div>
                                    <input
                                        className="value"
                                        type="number"
                                        value={quantity}
                                        min={1}
                                        step="1"
                                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                                    />
                                    <div onClick={increase}>+</div>
                                </div>
                            </div>
                        </div>
                        <div className="recipe">
                            {Array.from({ length: 6 }, (_, i) => (
                                ((data?.craft[selected].recipe.length ?? 0) > i) ? (
                                    <div className={`item ${(recipeState[i] != null && recipeState[i] != -1) ? "": "disabled"}`}>
                                        <p className="amount">{(data?.craft[selected].recipe[i].amount ?? 0) * quantity}</p>
                                        <p className="label">{data?.craft[selected].recipe[i].label}</p>
                                    </div>
                                ) : <div className="item" />
                            ))}
                        </div>
                    </div>
                    {step === data?.craft[selected].recipe.length && (
                        <div className="craft" onClick={() => tryCraft()}>
                            <div>Fabriquer</div>
                        </div>
                    )}
                    <div className="items">
                        {Array.from({ length: 6 }, (_, i) => (
                            ((data?.craft[selected].recipe.length ?? 0) > i) ? (
                                <div className={`item ${(recipeState[i] != null && recipeState[i] != -1) ? "": "disabled"}`} onClick={() => {
                                    if (recipeState[i] == null || recipeState[i] == -1) return;
                                    handleClick(recipeState[i])
                                }}>
                                    <img src={`https://cdn.eltrane.cloud/3838384859/items/${data?.craft[selected].recipe[i].name}.webp`} alt="" />
                                </div>
                            ) : <div className="item" />
                        ))}
                    </div>
                </div>
                <div className="waiting-list">
                    <Header logo="filedattente.svg" title="File d’attente" />
                    <div className="container">
                        <div>
                            {recup.map((item, _) => (
                                <div className="finished-item" key={item.id} onClick={() => {
                                    setRecup(prev => {
                                        const newRecup = [...prev];
                                        newRecup.splice(newRecup.findIndex(c => c.id === item.id), 1);
                                        return newRecup;
                                    });
                                    fetchNui("nui:craft:recup", {
                                        name: item.name,
                                        quantity: item.quantity,
                                    });
                                }}>
                                    <div className="bar" />
                                    <img src={`https://cdn.eltrane.cloud/3838384859/items/${item.name}.webp`} alt="" />
                                    <div className="infos"><span>{item.quantity}</span> {item.label}</div>
                                    <div className="recup">Récupérer</div>
                               </div>
                            ))}
                        </div>
                        <div>
                            {crafting.map((item, _) => (
                                <Notification
                                    key={item.id}
                                    id={item.id}
                                    label={item.label}
                                    quantity={item.quantity}
                                    name={item.name}
                                    duration={item.duration}
                                    onClose={(id) => {
                                        setCrafting((prev) => {
                                            const newCrafting = prev.filter((c) => c.id !== id);
                                            return newCrafting;
                                        });
                                        setRecup((prev) => {
                                            const exists = prev.some((c) => c.id === id);
                                            if (!exists) {
                                                const item = crafting.find((c) => c.id === id);
                                                if (item) {
                                                    return [
                                                        ...prev,
                                                        {
                                                            id: item.id,
                                                            name: item.name,
                                                            label: item.label,
                                                            quantity: item.quantity,
                                                        },
                                                    ];
                                                }
                                            }
                                            return prev;
                                        });
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="inventory">
                <Header logo="items.svg" title="Objets" />
                <div className="items">
                    {inventory}
                </div>
            </div>
        </div>
    )
}

export default Craft