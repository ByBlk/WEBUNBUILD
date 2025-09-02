import "./style.scss";
import React, {useEffect, useState} from "react";
import dayjs from "dayjs";
import {useKey} from "@hooks/useKeys";
import {IIllegalTabletData} from "./types";
import {fetchNui} from "@hooks/fetchNui";
import {formatNumberForDollar} from "@/components/menuBuilder/utils";

const TabletteShop: React.FC<any> = ({changeType, data, err, setErr}: {
    changeType: (type: string) => void,
    data: IIllegalTabletData,
    err: string,
    setErr: Function
}) => {
    const [type, setType] = useState<keyof typeof data.shop>("drogues");

    const [stockage, setStockage] = useState<{ [key: string]: any }>({});
    const [choseTime, setChoseTime] = useState(false);
    const [ordered, setOrdered] = useState(false);

    const convertMilliseconds = (milliseconds: number) => {
        const days = Math.floor(milliseconds / 86400000);
        milliseconds -= days * 86400000;
        const hours = Math.floor(milliseconds / 3600000);
        milliseconds -= hours * 3600000;
        const minutes = Math.floor(milliseconds / 60000);
        return `${days}j ${hours}h ${minutes}min`;
    };

    const [livraison, setLivraison] = useState(dayjs());

    const [hRotate, setHRotate] = useState(0);
    const [mRotate, setMRotate] = useState(0);

    useEffect(() => {
        setHRotate(360 * (livraison.hour() / 24));
        setMRotate(360 * (livraison.minute() / 60));
    }, [livraison]);

    useKey("e", () => {
        console.log("Ordered", ordered);
        if (ordered) {
            fetchNui("nui:illegal-tablet", {
                order: data?.shop[type]
                    .filter(e => stockage[e.id] > 0)
                    .map(e => {
                        e.quantity = stockage[e.id];
                        e.type = type;
                        return e;
                    }),
                time: livraison.format("HH:mm"),
                total: data?.shop[type].reduce((a: any, v: any) => {
                    return Number(a) + Number(v.price * stockage[v.id]);
                }, 0),
            });
            setTimeout(() => {
                fetchNui('nui:illegal-tablet:close');
            }, 3000);
            changeType("Logout");

        }
    });

    useEffect(() => {
        const _stockage: { [key: string]: any } = {};
        data?.shop[type].map(e => {
            e.quantity = 0;
            _stockage[e.id] = 0;
            return e;
        });
        setStockage(_stockage);
    }, [data?.shop, type]);

    const maximum = type === "armes" ? 10 : 400;

    const selected =
        Number(
            Object.values(stockage).reduce((a: any, v: any) => {
                return Number(a) + Number(v);
            }, 0),
        ) ?? 0;

    const update = (value: any, type: dayjs.ManipulateType) => {
        if (type === "hour") {
            setHRotate(hRotate + ((360 * 1) / 24) * value);
        }
        if (type === "minute") {
            setMRotate(mRotate + ((360 * 1) / 60) * value);
        }
        setLivraison(livraison.add(value, type));
    };

    const now = dayjs();
    const hourTest =
        livraison.isBefore(now) ||
        (livraison.hour() < data?.hourStart && livraison.hour() > data?.hourStop) ||
        (livraison.hour() === data?.hourStart && livraison.minute() < data?.minStart) ||
        (livraison.hour() === data?.hourStop && livraison.minute() > data?.minStop);


    return (
        <>
            <div className="Content">
                {err && (
                    <div className="Error">
                        <div className="Message">{data?.errorMessage}</div>
                        <div
                            className="Submit"
                            onClick={() => {
                                setErr(false);
                            }}>
                            OK
                        </div>
                    </div>
                )}
                <div
                    className="Title A-SlideInBottom"
                    style={{
                        animationDelay: "0.2s",
                    }}>
                    <div className="Yellow">sélectionnez</div>
                    les produits que vous souhaitez commander
                </div>

                <div
                    className="Tabs A-ScaleUp"
                    style={{
                        animationDelay: "0.5s",
                    }}>
                    <div
                        className={"Tab" + (type === "drogues" ? " Selected" : "")}
                        onClick={() => {
                            setType("drogues");
                        }}>
                        MATIÈRES PREMIÈRES
                    </div>
                    <div
                        className={"Tab" + (type === "armes" ? " Selected" : "")}
                        onClick={() => {
                            setType("armes");
                        }}>
                        ARMES
                    </div>
                </div>

                <div
                    className="ShopContainer A-ScaleUp"
                    style={{
                        animationDelay: "0.7s",
                    }}>
                    <div className="Title">
                        QUANTITÉ{" "}
                        <div className="Yellow">
                            {Object.values(stockage)
                                .reduce((a: any, v: any) => {
                                    return Number(a) + Number(v);
                                }, 0)
                                .toString()}
                            /{maximum}
                        </div>
                    </div>
                    <div className="ItemList">
                        {type !== "armes" &&

                            data?.shop[type].map(e => (
                                <div className="Item" key={"ShopItem" + e.id}>
                                    <div className="Visual" style={{}}>
                                        {e.crewLevel && (
                                            <div className="CrewLevel">
                                                <div className="Level">{e.crewLevel}</div>
                                            </div>
                                        )}
                                        <img src={e.image}/>
                                        <div className="Name">{e.name}</div>
                                    </div>
                                    <div className="Input">
                                        <div className="Price">{formatNumberForDollar(e.price)}</div>
                                        <div
                                            className="Button"
                                            onClick={() => {
                                                if (stockage[e.id] > 0) {
                                                    const _stockage = {...stockage};
                                                    _stockage[e.id] -= 1;
                                                    setStockage(_stockage);
                                                }
                                            }}>
                                            -
                                        </div>
                                        <input
                                            type="number"
                                            pattern="[0-9]*"
                                            value={stockage[e.id]}
                                            onChange={ev => {
                                                const _stockage = {...stockage};
                                                _stockage[e.id] = Number(ev.currentTarget.value);
                                                const a: any =
                                                    Object.values(_stockage).reduce((a: any, v: any) => {
                                                        return Number(a) + Number(v);
                                                    }, 0) ?? 0;
                                                if (a > maximum) {
                                                    return;
                                                }
                                                setStockage(_stockage);
                                            }}
                                        />
                                        <div
                                            className="Button"
                                            style={{
                                                fontSize: 18,
                                            }}
                                            onClick={() => {
                                                if (selected === maximum) return;
                                                const _stockage = {...stockage};
                                                _stockage[e.id] += 1;
                                                setStockage(_stockage);
                                            }}>
                                            +
                                        </div>
                                    </div>
                                </div>
                            ))}
                        {type === "armes" &&
                            data?.shop[type].map(e => {
                                if ((e?.stock ?? 0) > 0) {
                                    return (
                                        <div className="Item Arme" key={"ShopItem" + e.id}>
                                            <div className="Visual">
                                                <img src={e.image} style={{width: "150px", marginTop: "0px"}}/>
                                            </div>
                                            <div className="Input">
                                                <div className="Name">{e.name}</div>

                                                <div className="Price">{formatNumberForDollar(e.price)}</div>
                                                <div className="Stock">
                                                    Stock : <div className="Yellow">{e.stock}</div>
                                                </div>
                                                <div className="InputContainer">
                                                    <div
                                                        className="Button"
                                                        onClick={() => {
                                                            if (stockage[e.id] > 0) {
                                                                const _stockage = {...stockage};
                                                                _stockage[e.id] -= 1;
                                                                setStockage(_stockage);
                                                            }
                                                        }}>
                                                        –
                                                    </div>
                                                    <input
                                                        type="number"
                                                        pattern="[0-9]*"
                                                        value={stockage[e.id]}
                                                        onChange={ev => {
                                                            const _stockage = {...stockage};
                                                            _stockage[e.id] = Number(ev.currentTarget.value);
                                                            const a: any =
                                                                Object.values(_stockage).reduce((a: any, v: any) => {
                                                                    return Number(a) + Number(v);
                                                                }, 0) ?? 0;
                                                            if (a > maximum) {
                                                                return;
                                                            }
                                                            if (stockage[e.id] > (e?.stock ?? 0)) return;
                                                            setStockage(_stockage);
                                                        }}
                                                    />
                                                    <div
                                                        className="Button"
                                                        style={{
                                                            fontSize: 18,
                                                        }}
                                                        onClick={() => {
                                                            if (selected === maximum) return;
                                                            if (stockage[e.id] === e.stock) return;
                                                            const _stockage = {...stockage};
                                                            _stockage[e.id] += 1;
                                                            setStockage(_stockage);
                                                        }}>
                                                        +
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div className="Item Arme" key={"ShopItem" + e.id}>
                                            <div className="Visual">
                                                <img src={e.image} style={{width: "400px", marginTop: "0px"}}/>
                                            </div>
                                            <div className="OOS">
                                                <div className="Main">HORS STOCK</div>
                                                <div className="Duration">{convertMilliseconds(e?.cooldown ?? 0)}</div>
                                            </div>
                                        </div>
                                    );
                                }
                            })}
                    </div>
                </div>

                <div
                    className="CheckOut A-ScaleUp"
                    style={{
                        animationDelay: "0.9s",
                    }}>
                    <div className="CheckOutList">
                        {data?.shop[type]
                            .filter(e => stockage[e.id] > 0)
                            .map(e => (
                                <div className="CheckOutElement" key={e.id}>
                                    x{stockage[e.id]} {e.name}
                                </div>
                            ))}
                    </div>

                    <div className="TotalPrice">
                        {formatNumberForDollar(
                            data?.shop[type].reduce((a: any, v: any) => {
                                return Number(a) + Number(v.price * stockage[v.id]);
                            }, 0),
                        )}
                    </div>
                </div>

                <div
                    className={"Submit A-ScaleUp " + (selected === 0 || selected > maximum ? " Disabled" : "")}
                    onClick={() => {
                        setChoseTime(true);
                    }}
                    style={{
                        animationDelay: "1s",
                    }}>
                    VALIDER LE PANIER
                </div>

                {choseTime && (
                    <div className="ChoseTime">
                        <div
                            className="Title A-SlideInBottom inser"
                            style={{
                                animationDelay: ".1s",
                            }}>
                            heure de livraison
                        </div>
                        <div
                            className="CurrDate A-FadeIn"
                            style={{
                                animationDelay: ".3s",
                            }}>
                            {livraison.format("DD MMM")}
                        </div>
                        <div
                            className="Horloge A-FadeIn"
                            style={{
                                animationDelay: ".5s",
                            }}>
                            <img src="https://cdn.eltrane.cloud/3838384859/assets/tabletteIllegale/horloge.webp"/>
                            <div className="Centre"></div>
                            <div
                                className="Heures"
                                style={{
                                    transform: `rotate(${hRotate}deg)`,
                                }}>
                                <div
                                    className="Aiguille"
                                    style={{
                                        background: "#FEC92D",
                                        width: 3,
                                    }}></div>
                            </div>
                            <div
                                className="Minutes"
                                style={{
                                    transform: `rotate(${mRotate}deg)`,
                                }}>
                                <div
                                    className="Aiguille"
                                    style={{
                                        height: 70,
                                    }}></div>
                            </div>
                            <div className="Secondes">
                                <div
                                    className="Aiguille"
                                    style={{
                                        height: 40,
                                    }}></div>
                            </div>
                        </div>
                        <div
                            className="HourPicker A-ScaleUp"
                            style={{
                                animationDelay: ".6s",
                            }}>
                            {livraison.format("HH:mm")}
                            <div
                                className="CH"
                                style={{
                                    top: -10,
                                    left: 32,
                                }}
                                onClick={() => update(1, "hour")}>
                                +
                            </div>
                            <div
                                className="CH"
                                style={{
                                    top: -10,
                                    right: 32,
                                }}
                                onClick={() => update(1, "minute")}>
                                +
                            </div>
                            <div
                                className="CH"
                                style={{
                                    bottom: -10,
                                    left: 32,
                                }}
                                onClick={() => update(-1, "hour")}>
                                –
                            </div>
                            <div
                                className="CH"
                                style={{
                                    bottom: -10,
                                    right: 32,
                                }}
                                onClick={() => update(-1, "minute")}>
                                –
                            </div>
                        </div>
                        <div
                            className="Message A-SlideInBottom"
                            style={{
                                animationDelay: ".8s",
                            }}>
                            APPUYER SUR <div className="key">+</div> ET <div className="key">-</div> POUR{" "}
                            <div className="yellow">MODIFIER</div>
                            L'HEURE DE LIVRAISON
                        </div>
                        <div
                            className={"Submit A-ScaleUp " + (hourTest ? " Disabled" : "")}
                            onClick={() => {
                                setOrdered(true);
                            }}
                            style={{
                                animationDelay: ".9s",
                            }}>
                            VALIDER LA COMMANDE
                        </div>
                    </div>
                )}

                {ordered && (
                    <div className="Ordered">
                        <div
                            className="Title A-SlideInBottom inser"
                            style={{
                                animationDelay: ".3s",
                            }}>
                            commande effectuée avec succès
                        </div>
                        <div
                            className="Map A.FadeIn"
                            style={{
                                animationDelay: ".3s",
                            }}>
                            <img
                                className="BG A.FadeIn"
                                src="https://cdn.eltrane.cloud/3838384859/assets/tabletteIllegale/map.webp"
                                style={{
                                    animationDelay: ".3s",
                                }}
                            />
                            <img
                                className="Jalon A-ScaleUp"
                                src="https://cdn.eltrane.cloud/3838384859/assets/tabletteIllegale/jalon.webp"
                                style={{
                                    animationDelay: "1.5s",
                                }}
                            />
                            <div
                                className="Origin A-ScaleUp"
                                style={{
                                    animationDelay: ".3s",
                                }}></div>
                            <svg
                                style={{
                                    animationDelay: ".6s",
                                }}
                                xmlns="http://www.w3.org/2000/svg"
                                width="106"
                                height="373"
                                viewBox="0 0 106 373"
                                fill="none">
                                <path
                                    d="M1.39844 1.85156C1.39844 1.85156 82.6498 53.9241 80.7152 65.4958C78.7807 77.0674 45.8932 130.683 45.8932 144.569C45.8932 161.926 32.3513 200.499 32.3513 217.856C32.3513 231.742 34.2859 304.644 36.2205 341.287C45.8932 343.216 52.4707 346.302 55.566 350.93C58.6613 355.559 63.3042 356.073 65.2388 356.716C65.2388 356.716 103.93 352.859 103.93 356.716C103.93 360.573 103.93 374.074 103.93 372.145"
                                    stroke="white"
                                    strokeWidth="2.41682"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </div>
                        <div
                            className="Message A-SlideInBottom"
                            style={{
                                animationDelay: ".8s",
                            }}>
                            APPUYER SUR <div className="key">E</div> POUR <div className="yellow">VALIDER</div> VOTRE
                            COMMANDE
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default TabletteShop;
