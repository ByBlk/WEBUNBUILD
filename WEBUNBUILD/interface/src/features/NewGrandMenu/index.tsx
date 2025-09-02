import "./index.scss";

import React, {useState} from "react";
import {fetchNui, useNuiEvent} from "@/hook";
import {useBackspaceKey, useEnterKey, useEscapeKey} from "@hooks/useKeys.tsx";
import {playBoutiqueEnter, playBoutiqueLeave, playOnClickSound, playOnHoverSound} from "@utils/playSound";
import {getCdnUrl2} from "@/utils";
import textToStyled from "@utils/textToStyled.tsx";
import {FULL_COLORS} from "@/staticData";
import {Slider} from "@mui/material";

interface CatalogueData {
    style: {
        menuStyle: string;
        backgroundType: number;
        bannerType: number;
        gridType: number;
        lineColor?: string;
        title?: string;
        bannerImg?: string;
        buyType: number;
        buyTextType: string;
        buyText: string;
    }
    eventName: string;
    showStats: {
        show: boolean;
        default: boolean;
        showButton?: boolean;
    };
    showFavorites: boolean;
    mouseEvents: boolean;
    items: {
        type: number;
        number: boolean;
        style: string;
        id?: string;
        label: string;
        model: string;
        image: string;
        image2?: string;
        price: number;
        premium: boolean;
        stats?: {
            firstLabel: string;
            secondLabel: string;
            info: {
                label: string;
                value: number;
            }[];
        }
    }[];
    nameContainer: {
        show: boolean;
        top: boolean;
        firstLabel: string;
        secondLabel: string;
    };
    headCategory: {
        show: boolean;
        defaultIndex: number;
        items?: {
            id: string;
            label: string;
        }[];
    };
    category: {
        show: boolean;
        defaultIndex?: number;
        items?: {
            id: string;
            label: string;
            image: string;
        }[];
    };
    cameras: {
        show: boolean;
        label: string;
        items?: {
            id: string;
            image: string;
        }[];
    };
    color: {
        show: boolean;
        primary: boolean;
        primary_color: number;
        secondary: boolean;
        secondary_color: number;
        opacity: boolean;
        opacity_percent: number;
    };
    interim: {
        primaryTitle: string,
        secondaryTitle: string,
        backgroundImg: string,
        missions: [{ title: "" }, { title: "" }, { title: "" }]
        salary: number;
        duration: number;
        members: string;
    };
    mugshot: {
        img : string;
        name: string;
        date : string;
    };
    securoserv: {
        primaryTitle: string,
        secondaryTitle: string,
        backgroundImg: string,
        missions: [{ title: "" }, { title: "" }, { title: "" }]
        butin: number;
        influ: string;
        crew: string;
    };
    autoecole: {
        primaryTitle: string,
        secondaryTitle: string,
        carte: {
            name: string;
            dob: string;
            pob: string;
        };
        missions: [{ title: "" }, { title: "" }, { title: "" }]
        price: number;
        requis: string;
    }
}

// interface Props {
//   date: string; // Format attendu : "22/01/2021"
// }

// const MugshotDate: React.FC<Props> = ({ date }) => {
//   const formatDate = (dateStr: string): string => {
//     const months = [
//       "janvier", "février", "mars", "avril", "mai", "juin",
//       "juillet", "août", "septembre", "octobre", "novembre", "décembre"
//     ];

//     const [day, month, year] = dateStr.split("/");
//     const monthIndex = parseInt(month, 10) - 1;

//     if (!day || isNaN(monthIndex) || !year) return dateStr; // sécurité

//     return `${day} ${months[monthIndex]} ${year}`;
//   };

//   return <h1>{formatDate(date)}</h1>;
// };


const NewGrandMenu: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const [activeIndex, setActiveIndex] = useState<any>(null);
    const [activeIndex2, setActiveIndex2] = useState<any>(null);
    const [activeIndexes, setActiveIndexes] = useState<number[]>([]);
    const [activeIndexCategory, setActiveIndexCategory] = useState<number | any>(0);
    const [activeIndexHeadCategory, setActiveIndexHeadCategory] = useState<number | null>(0);
    const [activeIndexCamera, setActiveIndexCamera] = useState<number | null>(0);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [hoveredIndexCategory, setHoveredIndexCategory] = useState<number | null>(null);
    const [forceShowStats, setForceShowStats] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState("");
    const [isClicking, setIsClicking] = useState(false);
    const [oldX, setOldX] = useState<number | null>(null);
    const [offset1, setOffset1] = useState(0);
    const [offset2, setOffset2] = useState(0);
    const [opacity, setOpacity] = useState(0);
    const [oldY, setOldY] = useState<number | null>(null);
    const [notifications, setNotifications] = useState<{ type: string, message: string, secondText: string }[]>([]);
    const [colors, setColors] = useState({color1: 1, color2: 1, opacity: 0});
    const [data, setData] = useState<CatalogueData>({
        style: {
            menuStyle: "custom",
            backgroundType: 1,
            bannerType: 1,
            gridType: 1,
            lineColor: '',
            title: '',
            bannerImg: '',
            buyType: 1,
            buyTextType: "price",
            buyText: ""
        },
        eventName: '',
        showStats: {
            show: false,
            default: false
        },
        showFavorites: false,
        mouseEvents: false,
        items: [],
        headCategory: {show: false, defaultIndex: 0, items: []},
        category: {show: false, defaultIndex: 0, items: []},
        cameras: {show: false, label: '', items: []},
        nameContainer: {show: false, top: false, firstLabel: '', secondLabel: ''},
        color: {
            show: true,
            primary: false,
            primary_color: 1,
            secondary: false,
            secondary_color: 2,
            opacity: false,
            opacity_percent: 0
        },
        interim: {
            primaryTitle: '',
            secondaryTitle: '',
            backgroundImg: '',
            missions: [{title: ""}, {title: ""}, {title: ""}],
            salary: 0,
            duration: 0,
            members: ''
        },
        mugshot: {
            img: '',
            name: '',
            date: '',
        },
        securoserv: {
            primaryTitle: '',
            secondaryTitle: '',
            backgroundImg: '',
            missions: [{title: ""}, {title: ""}, {title: ""}],
            butin: 0,
            influ: '',
            crew: ''
        },
        autoecole: {
            primaryTitle: '',
            secondaryTitle: '',
            carte: {name: '', dob: '', pob: ''},
            missions: [{title: ""}, {title: ""}, {title: ""}],
            price: 0,
            requis: ''
        }
    });

    const changeColor1 = (color: number) => {
        setColors(prevColors => ({...prevColors, color1: color}));
        fetchNui(`nui:newgrandcatalogue:${data.eventName}:changeColor1`, color);
    };

    const changeColor2 = (color: number) => {
        setColors(prevColors => ({...prevColors, color2: color}));
        fetchNui(`nui:newgrandcatalogue:${data.eventName}:changeColor2`, color);
    };

    const changeOpacity = (opacity: number) => {
        setColors(prevColors => ({...prevColors, opacity}));
        fetchNui(`nui:newgrandcatalogue:${data.eventName}:changeOpacity`, opacity);
    };

    useNuiEvent('nui:newgrandmenu:notify', (data: { type: string, message: string, secondText: string }) => {
        setNotifications(prev => [...prev, data]);
    });

    // useEffect(() => {
    //   const testNotification = { type: "vert", message: "Achat terminé", secondText: "~g~100$" };
    //   setNotifications(prev => [...prev, testNotification]);
    // }, []);
//   const today = new Date();

//   const issuedDate = today.toLocaleDateString("en-GB"); // Format: DD/MM/YYYY

//   const expiresDateObj = new Date(today);
//   expiresDateObj.setFullYear(expiresDateObj.getFullYear() + 3);
//   const expiresDate = expiresDateObj.toLocaleDateString("en-GB");
//     useEffect(() => {
//         if (notifications.length > 0) {
//             const notificationTimeout = setTimeout(() => {
//                 setNotifications(prev => prev.slice(1));
//             }, 3000);
//             return () => clearTimeout(notificationTimeout);
//         }
//         if (notifications.length > 5) {
//             setNotifications(prev => prev.slice(1));
//         }
//     }, [notifications]);

    useEscapeKey(() => {
        playBoutiqueLeave();
        fetchNui(`nui:newgrandcatalogue:${data.eventName}:close`);
    }, visible, 'keydown');

    useEnterKey(() => {
        playOnClickSound();
        fetchNui(`nui:newgrandcatalogue:${data.eventName}:enter`, data.items[activeIndex].model);
    });

    useBackspaceKey(() => {
        playOnClickSound();
        fetchNui(`nui:newgrandcatalogue:${data.eventName}:backspace`);
    }, visible, 'keyup');

    useNuiEvent('nui:newgrandmenu:visible', (status: boolean) => {
        playBoutiqueEnter();
        setVisible(status)
        setActiveIndex(null);
        setActiveIndexCategory(0);
        setActiveIndexHeadCategory(0);
        setActiveIndexCamera(0);
        setHoveredIndex(null);
        setHoveredIndexCategory(null);
        setNotifications([]);
    });

    useNuiEvent('nui:newgrandmenu:setData', (data: CatalogueData) => {
        setData(data)
        if (data.headCategory.defaultIndex !== null) {
            setActiveIndexHeadCategory(data.headCategory.defaultIndex);
        }
        if (data.category.defaultIndex !== null) {
            setActiveIndexCategory(data.category.defaultIndex);
        }
        if (data.showStats.default) {
            setForceShowStats(data.showStats.default);
        }
    });

    return visible ? (
        <div className="newgrandcatalogue">
            {data.style.menuStyle === "custom" ? (
                <div className={`newgrandcatalogue__navbar backgroundType${data.style.backgroundType}`}>
                    {data.style.bannerType == 1 ? (
                        <>
                            <div className="newgrandcatalogue__navbar__linecolor"
                                 style={{background: data.style.lineColor}}></div>
                            <h1>{data.style.title}</h1>
                        </>
                    ) : data.style.bannerType == 2 ? (
                        <>
                            <img className="newgrandcatalogue__navbar__banner" src={getCdnUrl2(data.style.bannerImg)}
                                 alt=''/>
                            {data.headCategory.show ? (
                                <div className="newgrandcatalogue__navbar__headCategory">
                                    {data.headCategory.items?.length === 1 ? (
                                        <div
                                            className="newgrandcatalogue__navbar__headCategory__container__itemNo disabled"
                                        >
                                            {data.headCategory.items[0].label}
                                        </div>
                                    ) : (
                                        data.headCategory.items?.map((cat: {
                                            id: string;
                                            label: string
                                        }, index: number) => (
                                            <div
                                                key={`${cat.id}-${index}`}
                                                className={`newgrandcatalogue__navbar__headCategory__container__item ${activeIndexHeadCategory === index ? 'active' : ''}`}
                                                onClick={() => {
                                                    if (activeIndexHeadCategory === index) return;
                                                    setActiveIndexHeadCategory(index);
                                                    setActiveIndex(null);
                                                    playOnHoverSound();
                                                    fetchNui(`nui:newgrandcatalogue:${data.eventName}:selectHeadCategory`, cat.id);
                                                }}
                                            >
                                                {cat.label}
                                            </div>
                                        ))
                                    )}
                                </div>
                            ) : null}
                        </>
                    ) : null}
                    {data.style.gridType == 1 ? (
                        <div
                            className={`newgrandcatalogue__navbar__container ${activeIndex !== null && forceShowStats && data.showStats && data.items[activeIndex].stats ? 'with-stats' : 'without-stats'} ${data.style.bannerType === 2 ? 'bannerType2' : ''} ${data.style.buyType === 0 ? 'bigCatalogues' : ''}`}>                    {data.items.map((item, index) => (
                            <div
                                className={`newgrandcatalogue__navbar__container__item ${activeIndex === index ? 'active' : ''}`}
                                key={`${item.label}-${index}`}
                                onClick={() => {
                                    setActiveIndex(index);
                                    playOnHoverSound();
                                    fetchNui(`nui:newgrandcatalogue:${data.eventName}:selectGridType`, item.model);
                                }}
                                onMouseEnter={() => {
                                    setHoveredIndex(index)
                                }}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                {item.number ? (
                                    <span className="index">{item.model}</span>
                                ) : (
                                    <img src={getCdnUrl2(`${item.image}`)} alt={item.model}></img>
                                )}
                                {item.label != null && <span className="label">{item.label}</span>}
                                {item.price && <span className="price">{item.price}$</span>}
                            </div>
                        ))}
                        </div>
                    ) : data.style.gridType == 2 ? (
                        <div
                            className='newgrandcatalogue__navbar__containerType2'
                        >
                            {data.items.map((item, index) => (
                                <div
                                    className={`newgrandcatalogue__navbar__containerType2__item ${hoveredIndex === index ? 'hovered' : ''} ${item.style}`}
                                    key={`${item.label}-${index}`}
                                    onClick={() => {
                                        playOnHoverSound();
                                        fetchNui(`nui:newgrandcatalogue:${data.eventName}:selectGridType2`, item.model);
                                    }}
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                >
                                    <img src={getCdnUrl2(`${item.image}`)} alt={item.model}/>
                                    <span className="item-label">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    ) : data.style.gridType == 3 ? (
                        <div
                            className={`newgrandcatalogue__navbar__containerType3 ${activeIndex !== null && forceShowStats && data.showStats && data.items[activeIndex].stats ? 'with-stats' : 'without-stats'} ${data.style.bannerType === 2 ? 'bannerType2' : ''}`}>
                            {data.items.map((item, index) => (
                                <div
                                    className={`newgrandcatalogue__navbar__containerType3__item ${activeIndex === index ? 'active' : ''}`}
                                    style={{backgroundImage: `url(${getCdnUrl2(`${item.image}`)})`}}
                                    key={`${item.label}-${index}`}
                                    onClick={() => {
                                        setActiveIndex(index);
                                        playOnHoverSound();
                                        fetchNui(`nui:newgrandcatalogue:${data.eventName}:selectGridType3`, item.model);
                                    }}
                                    onMouseEnter={() => {
                                        setHoveredIndex(index)
                                    }}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                >
                                    {item.label && <span className="label">{item.label}</span>}
                                    {item.price && <span className="price">{item.price}$</span>}
                                </div>
                            ))}
                        </div>
                    ) : data.style.gridType == 4 ? (
                        <div className={`newgrandcatalogue__navbar__containerType4 ${activeIndex !== null}`}>
                            {data.items.map((item, index) => (
                                <div
                                    className={`newgrandcatalogue__navbar__containerType4__item ${activeIndex === index ? 'active' : ''}`}
                                    key={`${item.label}-${index}`}
                                    onClick={() => {
                                        setActiveIndex(index);
                                        playOnHoverSound();
                                        fetchNui(`nui:newgrandcatalogue:${data.eventName}:selectGridType4`, item.model);
                                    }}
                                    onMouseEnter={() => {
                                        setHoveredIndex(index)
                                    }}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                >
                                    <img className="leftImg" src={getCdnUrl2(item.image)} alt=""></img>
                                    <img className="rightImg" src={getCdnUrl2(item.image2)} alt=""></img>
                                    {item.label != null && <span className="label">{item.label}</span>}
                                </div>
                            ))}
                        </div>
                    ) : data.style.gridType == 5 ? (
                        <div
                            className={`newgrandcatalogue__navbar__containerType5 ${activeIndexes.length > 0 && forceShowStats && data.showStats && data.items[activeIndexes[0]].stats ? 'with-stats' : 'without-stats'} ${data.style.bannerType === 2 ? 'bannerType2' : ''}`}>
                            {data.items.map((item, index) => (
                                <div
                                    className={`newgrandcatalogue__navbar__containerType5__item ${activeIndexes.includes(index) ? 'active' : ''}`}
                                    key={`${item.label}-${index}`}
                                    onClick={() => {
                                        setActiveIndexes(prev => prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]);
                                        playOnHoverSound();
                                    }}
                                    onMouseEnter={() => {
                                        setHoveredIndex(index)
                                    }}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                >
                                    {item.number ? (
                                        <span className="index">{item.model}</span>
                                    ) : (
                                        <img src={getCdnUrl2(`${item.image}`)} alt={item.model}></img>
                                    )}
                                    {item.label != null && <span className="label">{item.label}</span>}
                                    {item.price && <span className="price">{item.price}$</span>}
                                </div>
                            ))}
                        </div>
                    ) : data.style.gridType == 6 ? (
                        <div className={`newgrandcatalogue__navbar__containerType6 ${activeIndex !== null}`}>
                            {data.items.map((item, index) => (
                                <div
                                    className={`newgrandcatalogue__navbar__containerType6__item ${activeIndex === index ? 'active' : ''}`}
                                    key={`${item.label}-${index}`}
                                    onClick={() => {
                                        setActiveIndex(index);
                                        playOnHoverSound();
                                        fetchNui(`nui:newgrandcatalogue:${data.eventName}:selectGridType6`, item.model);
                                    }}
                                    onMouseEnter={() => {
                                        setHoveredIndex(index)
                                    }}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                >
                                    <img className="leftImg" src={getCdnUrl2(item.image)} alt=""></img>
                                    {item.label != null && <span className="label">{item.label}</span>}
                                </div>
                            ))}
                        </div>
                    ) : null}
                    {data.showStats.show && forceShowStats && activeIndex !== null && data.items[activeIndex].stats && (
                        <div className="newgrandcatalogue__navbar__stats">
                            <div className="newgrandcatalogue__navbar__stats__labels"
                                 style={{marginTop: data.style.bannerType === 1 ? '2.35vh' : '-20vh'}}>
                                <span className="newgrandcatalogue__navbar__stats__fistLabel"
                                      style={{fontWeight: 'bold'}}>{data.items[activeIndex].stats.firstLabel}</span>
                                <span
                                    className="newgrandcatalogue__navbar__stats__secondLabel">{data.items[activeIndex].stats.secondLabel}</span>
                            </div>
                            <div className="newgrandcatalogue__navbar__stats__info">
                                {data.items[activeIndex].stats.info.map((stat: {
                                    label: string;
                                    value: number
                                }, index: number) => (
                                    <div key={index} className="newgrandcatalogue__navbar__stats__info__item">
                                        <span>{stat.label}</span>
                                        <div className="newgrandcatalogue__navbar__stats__info__progress">
                                            <div className="newgrandcatalogue__navbar__stats__info__progress__bar"
                                                 style={{width: `${stat.value}%`}}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    <div className="newgrandcatalogue__navbar__button">
                        {data.showStats.showButton && data.showStats.show && data.style.gridType != 2 && (
                            <div
                                className="newgrandcatalogue__navbar__button__showstats"
                                onClick={() => {
                                    setForceShowStats(!forceShowStats);
                                    playOnClickSound();
                                }}
                            >
                                {forceShowStats ? 'Masquer' : 'Informations'}
                            </div>
                        )}
                        {data.showFavorites && (
                            <div
                                className="newgrandcatalogue__navbar__button__showFavorites"
                                onClick={() => {
                                    fetchNui(`nui:newgrandcatalogue:${data.eventName}:selectFavorite`, data.items[activeIndex].model);
                                    playOnClickSound();
                                }}
                            >
                                Favoris
                            </div>
                        )}
                        {data.style.buyType == 1 ? (
                            <div className="newgrandcatalogue__navbar__button__buy"
                                 onClick={() => {
                                     playOnClickSound();
                                     if (data.style.gridType === 5) {
                                         fetchNui(`nui:newgrandcatalogue:${data.eventName}:selectBuy`, activeIndexes.map(index => data.items[index].model));
                                     } else {
                                         fetchNui(`nui:newgrandcatalogue:${data.eventName}:selectBuy`, data.items[activeIndex].model);
                                     }
                                 }}
                            >
                                {activeIndex !== null && data.items[activeIndex] ? (
                                    data.style.buyTextType === 'price' ? `${data.items[activeIndex].price}$` : data.style.buyText
                                ) : 'Aucun'}
                            </div>
                        ) : data.style.buyType == 2 ? (
                            <>
                                <div
                                    className={`newgrandcatalogue__navbar__button__${activeIndex !== null && data.items[activeIndex]?.premium ? 'buyTypePremium' : 'buyType2'}`}
                                    onClick={() => {
                                        playOnClickSound();
                                        if (data.style.gridType === 5) {
                                            fetchNui(`nui:newgrandcatalogue:${data.eventName}:selectBuy`, activeIndexes.map(index => data.items[index].model));
                                        } else {
                                            fetchNui(`nui:newgrandcatalogue:${data.eventName}:selectBuy`, data.items[activeIndex].model);
                                        }
                                    }}
                                >
                                    {(activeIndex !== null && data.items[activeIndex] !== undefined) || (activeIndexes.length > 0 && data.items[activeIndexes[0]] !== undefined) ? (
                                        data.style.buyTextType === 'price' ? `${activeIndex !== null ? data.items[activeIndex].price : data.items[activeIndexes[0]].price}$` : data.style.buyText
                                    ) : 'Aucun'}
                                </div>
                            </>
                        ) : null}
                    </div>
                </div>
            ) : data.style.menuStyle === "tenue" ? (
                <div className={`newgrandcatalogue__navbarTenue backgroundType${data.style.backgroundType}`}>
                    <div className="newgrandcatalogue__navbarTenue__linecolor"
                         style={{background: data.style.lineColor}}></div>
                    <h1>{data.style.title}</h1>
                    <span className="vetement"><img src={getCdnUrl2("assets/catalogues/binco/tshirt.svg")} alt=""></img>Vêtements</span>
                    <div className={`newgrandcatalogue__navbarTenue__containerTop`}>
                        {data.items
                            .filter(item => item.type === 1)
                            .map((item, index) => (
                                <div
                                    className={`newgrandcatalogue__navbarTenue__containerTop__item ${activeIndex === index ? 'active' : ''}`}
                                    key={`${item.label}-${index}`}
                                    onClick={() => {
                                        setActiveIndex(index);
                                        playOnHoverSound();
                                        fetchNui(`nui:newgrandcatalogue:${data.eventName}:selectGridType`, item.model);
                                    }}
                                    onMouseEnter={() => {
                                        setHoveredIndex(index)
                                    }}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                >
                                    <img src={getCdnUrl2(`${item.image}`)} alt={item.model}></img>
                                    {item.label != null && <span className="label">{item.label}</span>}
                                </div>
                            ))}
                    </div>
                    <span className="accessoires"><img src={getCdnUrl2("assets/catalogues/binco/chapeau.svg")}
                                                       alt=""></img>Accessoires</span>
                    <div className={`newgrandcatalogue__navbarTenue__containerBottom`}>
                        {data.items
                            .filter(item => item.type === 2)
                            .map((item, index) => (
                                <div
                                    className={`newgrandcatalogue__navbarTenue__containerBottom__item ${activeIndex2 === index ? 'active' : ''}`}
                                    key={`${item.label}-${index}`}
                                    onClick={() => {
                                        setActiveIndex2(index);
                                        playOnHoverSound();
                                        fetchNui(`nui:newgrandcatalogue:${data.eventName}:selectGridType2`, item.model);
                                    }}
                                    onMouseEnter={() => {
                                        setHoveredIndex(index)
                                    }}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                >
                                    <img src={getCdnUrl2(`${item.image}`)} alt={item.model}></img>
                                    {item.label != null && <span className="label">{item.label}</span>}
                                </div>
                            ))}
                    </div>
                    <span className="inputText"><img src={getCdnUrl2("assets/catalogues/binco/text.svg")} alt=""></img>Nom de la tenue</span>
                    <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
                    <div className="newgrandcatalogue__navbarTenue__button">
                        <div className="newgrandcatalogue__navbarTenue__button__buyType2"
                             onClick={() => {
                                 playOnClickSound();
                                 fetchNui(`nui:newgrandcatalogue:${data.eventName}:selectBuy`, inputValue);
                             }}
                        >{data.style.buyText}</div>
                    </div>
                </div>
            ) : data.style.menuStyle === "interim" ? (
                <div className={`newgrandcatalogue__navbarTenue backgroundType${data.style.backgroundType}`}>
                    <img className="newgrandcatalogue__navbar__banner" src={getCdnUrl2(data.style.bannerImg)} alt=''/>
                    <div className="newgrandcatalogue__navbar__headCategory">
                        {data.headCategory.items?.length === 1 ? (
                            <div
                                className="newgrandcatalogue__navbar__headCategory__container__itemNo disabled"
                            >
                                {data.headCategory.items[0].label}
                            </div>
                        ) : (
                            data.headCategory.items?.map((cat: { id: string; label: string }, index: number) => (
                                <div
                                    key={`${cat.id}-${index}`}
                                    className={`newgrandcatalogue__navbar__headCategory__container__item ${activeIndexHeadCategory === index ? 'active' : ''}`}
                                    onClick={() => {
                                        if (activeIndexHeadCategory === index) return;
                                        setActiveIndexHeadCategory(index);
                                        setActiveIndex(null);
                                        playOnHoverSound();
                                        fetchNui(`nui:newgrandcatalogue:${data.eventName}:selectHeadCategory`, cat.id);
                                    }}
                                >
                                    {cat.label}
                                </div>
                            ))
                        )}
                    </div>

                    <div className="newgrandcatalogue__navbarInterim">
                        <span className="newgrandcatalogue__navbarInterim__jobTitle">{data.interim.primaryTitle}</span>
                        <span
                            className="newgrandcatalogue__navbarInterim__jobSecondaryTitle">{data.interim.secondaryTitle}</span>
                        <img className="newgrandcatalogue__navbarInterim__background"
                             src={getCdnUrl2(data.interim.backgroundImg)} alt=""/>
                        {/* <img style={{ padding: "1.2vh 0vh 1.1vh 0",}} className="newgrandcatalogue__navbarInterim__background"src={getCdnUrl2("assets/identity/permi.svg")} alt=""/>
                            <div className="newgrandcatalogue__navbarInterim__data">
                                <h1>{data.mugshot?.name || 'N/A'}</h1>
                                <h1>Los Santos , San Andreas</h1>
                                <MugshotDate date={data.mugshot?.date || ''} />
                                <h1>Etas-Unis</h1>
                                <h1 style={
                                    {
                                        marginLeft: "5.8vh",
                                        marginTop: "-0.1vh",
                                    }
                                }>{Math.floor(100000000 + Math.random() * 900000000)}</h1>
                            </div>
                            <p className="signature">{data.mugshot?.name || 'N/A'}</p>
                            <div className="expired">
                          <h1>ISSUED: {issuedDate}</h1>
                            <h1 style={{ color: "#FF3737" }}>EXPIRES: {expiresDate}</h1>
                            </div> */}
                        <img className="newgrandcatalogue__navbarInterim__mugshot" src={data.mugshot?.img || ''} alt="" />
                        <div className="newgrandcatalogue__navbarInterim__missions">
                            <div className="newgrandcatalogue__navbarInterim__missions__bar">
                                <img src={getCdnUrl2("assets/catalogues/interim/missions.svg")} alt=""/>
                                <span>Missions</span>
                            </div>
                            {data.interim.missions?.map((mission: { title: string }, index: number) => (
                                <li key={index}>{mission.title}</li>
                            ))}
                        </div>

                        <div className="newgrandcatalogue__navbarInterim__salary">
                            <div className="newgrandcatalogue__navbarInterim__salary__bar">
                                <img src={getCdnUrl2("assets/catalogues/interim/salary.svg")} alt=""/>
                                <span>{data.interim.primaryTitle.toLowerCase().startsWith("permis") ? 'Coût de l\'éxamen' : 'Salaire'}</span>
                                <h2>{data.interim.salary} $</h2>
                            </div>
                        </div>

                        <div className="newgrandcatalogue__navbarInterim__duration">
                            <div className="newgrandcatalogue__navbarInterim__duration__bar">
                                <img src={getCdnUrl2("assets/catalogues/interim/duration.svg")} alt=""/>
                                <span>Durée approximative</span>
                                <h2>{data.interim.duration} minutes</h2>
                            </div>
                        </div>

                        {
                            data.interim.members && (
                                <div className="newgrandcatalogue__navbarInterim__members">
                                    <div className="newgrandcatalogue__navbarInterim__members__bar">
                                        <img src={getCdnUrl2("assets/catalogues/interim/members.svg")} alt=""/>
                                        <span>Nombre de participants</span>
                                        <h2>{data.interim.members}</h2>
                                    </div>
                                </div>
                            )
                        }

                    </div>
                    <div className="newgrandcatalogue__navbarTenue__button">
                        <div
                            className={`newgrandcatalogue__navbar__button__${activeIndex !== null && data.items[activeIndex]?.premium ? 'buyTypePremium' : 'buyType2'}`}
                            onClick={() => {
                                playOnClickSound();
                                fetchNui(`nui:newgrandcatalogue:${data.eventName}:selectBuy`, data.interim.primaryTitle);
                            }}
                        >{
                            data.interim.primaryTitle.toLowerCase().startsWith("permi") ? ("Démarrer l'examen") : "Accepter le métier"
                        }
                        </div>
                    </div>
                </div>
            ) : data.style.menuStyle === "securoserv" ? (
                <div className={`newgrandcatalogue__navbarTenue backgroundType${data.style.backgroundType}`}>
                    <img className="newgrandcatalogue__navbar__banner" src={getCdnUrl2(data.style.bannerImg)} alt=''/>
                    <div className="newgrandcatalogue__navbar__headCategory">
                        {data.headCategory.items?.length === 1 ? (
                            <div
                                className="newgrandcatalogue__navbar__headCategory__container__itemNo disabled"
                            >
                                {data.headCategory.items[0].label}
                            </div>
                        ) : (
                            data.headCategory.items?.map((cat: { id: string; label: string }, index: number) => (
                                <div
                                    key={`${cat.id}-${index}`}
                                    className={`newgrandcatalogue__navbar__headCategory__container__item ${activeIndexHeadCategory === index ? 'active' : ''}`}
                                    onClick={() => {
                                        if (activeIndexHeadCategory === index) return;
                                        setActiveIndexHeadCategory(index);
                                        setActiveIndex(null);
                                        playOnHoverSound();
                                        fetchNui(`nui:newgrandcatalogue:${data.eventName}:selectHeadCategory`, cat.id);
                                    }}
                                >
                                    {cat.label}
                                </div>
                            ))
                        )}
                    </div>

                    <div className="newgrandcatalogue__navbarInterim">
                        <span
                            className="newgrandcatalogue__navbarInterim__jobTitle">{data.securoserv.primaryTitle}</span>
                        <span
                            className="newgrandcatalogue__navbarInterim__jobSecondaryTitle">{data.securoserv.secondaryTitle}</span>
                        <img className="newgrandcatalogue__navbarInterim__background"
                             src={getCdnUrl2(data.securoserv.backgroundImg)} alt=""/>
                        <div className="newgrandcatalogue__navbarInterim__missions">
                            <div className="newgrandcatalogue__navbarInterim__missions__bar">
                                <img src={getCdnUrl2("assets/catalogues/interim/missions.svg")} alt=""/>
                                <span>Missions</span>
                            </div>
                            {data.securoserv.missions?.map((mission: { title: string }, index: number) => (
                                <li key={index}>{mission.title}</li>
                            ))}
                        </div>

                        <div className="newgrandcatalogue__navbarInterim__salary">
                            <div className="newgrandcatalogue__navbarInterim__salary__bar">
                                <img src={getCdnUrl2("assets/catalogues/interim/salary.svg")} alt=""/>
                                <span>Butin</span>
                                <h2>{data.securoserv.butin} $</h2>
                            </div>
                        </div>

                        <div className="newgrandcatalogue__navbarInterim__duration">
                            <div className="newgrandcatalogue__navbarInterim__duration__bar">
                                <img src={getCdnUrl2("assets/catalogues/securoserv/influ.svg")} alt=""/>
                                <span>Influence</span>
                                <h2 style={{color: "#FBB804"}}>{data.securoserv.influ}</h2>
                            </div>
                        </div>

                        <div className="newgrandcatalogue__navbarInterim__members">
                            <div className="newgrandcatalogue__navbarInterim__members__bar">
                                <img src={getCdnUrl2("assets/catalogues/securoserv/crew.svg")} alt=""/>
                                <span>XP de crew</span>
                                <h2 style={{color: "#FBB804"}}>{data.securoserv.crew}</h2>
                            </div>
                        </div>

                    </div>
                </div>
            ) : data.style.menuStyle === "autoecole" ? (
                <div className={`newgrandcatalogue__navbarTenue backgroundType${data.style.backgroundType}`}>
                    <img className="newgrandcatalogue__navbar__banner" src={getCdnUrl2(data.style.bannerImg)} alt=''/>
                    <div className="newgrandcatalogue__navbar__headCategory">
                        {data.headCategory.items?.length === 1 ? (
                            <div
                                className="newgrandcatalogue__navbar__headCategory__container__itemNo disabled"
                            >
                                {data.headCategory.items[0].label}
                            </div>
                        ) : (
                            data.headCategory.items?.map((cat: { id: string; label: string }, index: number) => (
                                <div
                                    key={`${cat.id}-${index}`}
                                    className={`newgrandcatalogue__navbar__headCategory__container__item ${activeIndexHeadCategory === index ? 'active' : ''}`}
                                    onClick={() => {
                                        if (activeIndexHeadCategory === index) return;
                                        setActiveIndexHeadCategory(index);
                                        setActiveIndex(null);
                                        playOnHoverSound();
                                        fetchNui(`nui:newgrandcatalogue:${data.eventName}:selectHeadCategory`, cat.id);
                                    }}
                                >
                                    {cat.label}
                                </div>
                            ))
                        )}
                    </div>

                    <div className="newgrandcatalogue__navbarAutoecole">
                        <span
                            className="newgrandcatalogue__navbarAutoecole__jobTitle">{data.autoecole.primaryTitle}</span>
                        <span
                            className="newgrandcatalogue__navbarAutoecole__jobSecondaryTitle">{data.autoecole.secondaryTitle}</span>
                        <img className="newgrandcatalogue__navbarAutoecole__background"
                             src={getCdnUrl2("assets/catalogues/autoecole/carte.png")} alt=""/>
                        <div className="newgrandcatalogue__navbarAutoecole__missions">
                            <div className="newgrandcatalogue__navbarAutoecole__missions__bar">
                                <img src={getCdnUrl2("assets/catalogues/interim/missions.svg")} alt=""/>
                                <span>Règles</span>
                            </div>
                            {data.autoecole.missions?.map((mission: { title: string }, index: number) => (
                                <li key={index}>{mission.title}</li>
                            ))}
                        </div>

                        <div className="newgrandcatalogue__navbarAutoecole__salary">
                            <div className="newgrandcatalogue__navbarAutoecole__salary__bar">
                                <img src={getCdnUrl2("assets/catalogues/interim/salary.svg")} alt=""/>
                                <span>Prix</span>
                                <h2>{data.autoecole.price} $</h2>
                            </div>
                        </div>

                        <div className="newgrandcatalogue__navbarAutoecole__members">
                            <div className="newgrandcatalogue__navbarAutoecole__members__bar">
                                <img src={getCdnUrl2("assets/catalogues/interim/members.svg")} alt=""/>
                                <span>Requis</span>
                                <h2>{data.autoecole.requis}</h2>
                            </div>
                        </div>

                    </div>
                    <div className="newgrandcatalogue__navbarTenue__button">
                        <div
                            className={`newgrandcatalogue__navbar__button__${activeIndex !== null && data.items[activeIndex]?.premium ? 'buyTypePremium' : 'buyType2'}`}
                            onClick={() => {
                                playOnClickSound();
                                if (data.style.gridType === 5) {
                                    fetchNui(`nui:newgrandcatalogue:${data.eventName}:selectBuy`, activeIndexes.map(index => data.items[index].model));
                                } else {
                                    fetchNui(`nui:newgrandcatalogue:${data.eventName}:selectBuy`, data.items[activeIndex].model);
                                }
                            }}
                        >Accepter la mission
                        </div>
                    </div>
                </div>
            ) : null}

            {data.category.show && (
                <div className="newgrandcatalogue__newCategory">
                    <div className="newgrandcatalogue__newCategory__label">
                        {activeIndexCategory !== null &&
                            <span>{data.category.items?.[hoveredIndexCategory ?? activeIndexCategory]?.label}</span>}
                    </div>
                    <div className="newgrandcatalogue__newCategory__container"
                         style={{gridTemplateColumns: `repeat(${(data.category.items?.length ?? 0) <= 7 ? 7 : 4}, 1fr)`}}>
                        {data.category.items?.map((cat: {
                            id: string;
                            label: string;
                            image: string
                        }, index: number) => (
                            <div
                                key={`${cat.id}-${index}`}
                                className={`newgrandcatalogue__newCategory__container__item ${activeIndexCategory === index ? 'active' : ''}`}
                                onClick={() => {
                                    if (activeIndexCategory === index) return
                                    setActiveIndexCategory(index);
                                    setActiveIndex(null);
                                    playOnHoverSound();
                                    fetchNui(`nui:newgrandcatalogue:${data.eventName}:selectCategory`, cat.id);
                                }}
                                onMouseEnter={() => setHoveredIndexCategory(index)}
                                onMouseLeave={() => setHoveredIndexCategory(null)}
                            >
                                <img src={getCdnUrl2(`${cat.image}`)} alt={cat.id}></img>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {data.cameras.show && (
                <div className="newgrandcatalogue__cameras">
                    <div className="newgrandcatalogue__cameras__label">
                        <span>Caméras</span>
                    </div>
                    <div className="newgrandcatalogue__cameras__container">
                        {data.cameras.items?.map((camera: { id: string; image: string }, index: number) => (
                            <div
                                key={`${camera.id}-${index}`}
                                className={`newgrandcatalogue__cameras__container__item ${activeIndexCamera === index ? 'active' : ''}`}
                                onClick={() => {
                                    setActiveIndexCamera(index);
                                    playOnHoverSound();
                                    fetchNui(`nui:newgrandcatalogue:${data.eventName}:selectCamera`, camera.id);
                                }}
                            >
                                <img src={getCdnUrl2(`${camera.image}`)} alt={camera.id}></img>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {data.mouseEvents && (
                <div
                    className={"newgrandcatalogue__mouseEvents" + (isClicking ? " selected" : "")}
                    onMouseDown={(e) => {
                        setOldX(e.pageX);
                        setOldY(e.pageY);
                        setIsClicking(true);
                    }}
                    onMouseUp={() => {
                        setIsClicking(false);
                    }}
                    onMouseLeave={() => {
                        setIsClicking(false);
                    }}
                    onMouseMove={e => {
                        if (isClicking) {
                            if (oldX !== null && oldY !== null && e.pageX !== oldX && e.pageY !== oldY) {
                                fetchNui(`nui:newgrandcatalogue:${data.eventName}:mouseEvents`, {
                                    x: e.pageX - oldX,
                                    y: e.pageY - oldY
                                });
                            }

                            setOldY(e.pageY);
                            setOldX(e.pageX);
                        }
                    }}
                ></div>
            )}
            {data.nameContainer.show && (
                <div className='newgrandcatalogue__nameContainer' style={{top: data.nameContainer.top ? '0' : 'auto'}}>
                    <h1>{textToStyled(data.nameContainer.firstLabel)}
                        <span>{textToStyled(data.nameContainer.secondLabel)}</span></h1>
                </div>
            )}
            {notifications.slice().reverse().map((notification, index) => (
                <div key={index} className='newgrandcatalogue__notification' style={{bottom: `${index * 4.8}vh`}}>
                    <img src={getCdnUrl2(`assets/catalogues/${notification.type}.svg`)} alt=""/>
                    <span className="message">{textToStyled(notification.message.toString())}</span>
                    <span className="secondText">{textToStyled(notification.secondText.toString())}</span>
                </div>
            ))}
            {data.color.show && (
                <div className="newgrandcatalogue__colorContainer">
                    {data.color.primary && (
                        <div className="Container">
                            <div className="span">Couleurs</div>
                            <div className="colorPick" onWheel={(ev) => {
                                if (ev?.deltaY < 0) {
                                    if (offset1 < 0) setOffset1(offset1 + 25);
                                }
                                if (ev?.deltaY > 0) {
                                    if (offset1 > 25 * FULL_COLORS.length * -1 + 25 * 11) setOffset1(offset1 - 25);
                                }
                            }}>
                                {FULL_COLORS.map((c, i) => (
                                    <div
                                        key={i}
                                        className={["color", colors?.color1 === i + 1 ? 'selected' : '', ((colors?.color1 === undefined && i + 1) === 1 ? 'selected' : '')].join(' ')}
                                        onClick={() => changeColor1(i + 1)}
                                        style={{
                                            background: `linear-gradient(180deg, ${c}FF 0%, ${c}FF 100%)`,
                                            transform: `translateX(${offset1}px)`,
                                        }}>
                                        <div style={{
                                            background: `linear-gradient(180deg, ${c}FF  0%, ${c}66 100%)`,
                                        }}></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {data.color.secondary && (
                        <div className="Container">
                            <div className="span">Couleurs secondaires</div>
                            <div className="colorPick" onWheel={(ev) => {
                                if (ev?.deltaY < 0) {
                                    if (offset2 < 0) setOffset2(offset2 + 25);
                                }
                                if (ev?.deltaY > 0) {
                                    if (offset2 > 25 * FULL_COLORS.length * -1 + 25 * 11) setOffset2(offset2 - 25);
                                }
                            }}>
                                {FULL_COLORS.map((c, i) => (
                                    <div
                                        key={i}
                                        className={["color", colors?.color2 === i + 1 ? 'selected' : '', ((colors?.color1 === undefined && i + 1) === 1 ? 'selected' : '')].join(' ')}
                                        onClick={() => changeColor2(i + 1)}
                                        style={{
                                            background: `linear-gradient(180deg, ${c}FF  0%, ${c}66 100%)`,
                                            transform: `translateX(${offset2}px)`,
                                        }}>
                                        <div style={{
                                            background: `linear-gradient(180deg, ${c}FF  0%, ${c}66 100%)`,
                                        }}></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {data.color.opacity && (
                        <>
                            <div className="span">Opacité</div>
                            <div className="opacityContainer">
                                <div className="opacity">
                                    <Slider value={colors?.opacity ?? 100} onChange={(_e, newValue) => {
                                        setOpacity(newValue as number);
                                        changeOpacity(newValue as number);
                                    }}/>
                                </div>
                                <div className="opacityValue">{opacity}%</div>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    ) : null;
};

export default NewGrandMenu;