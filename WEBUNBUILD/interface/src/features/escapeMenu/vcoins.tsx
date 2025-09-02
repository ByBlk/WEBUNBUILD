import React, { useState } from "react"; 
import "./style/style.scss";
import { getCdnUrl } from "@utils/misc";
import { EscapeMenuData } from "./type";


const VCoins: React.FC<EscapeMenuData> = ({cfx}) => {
    const [hoveredItem, setHoveredItem] = useState<number | null>(null);

    const setLink = (amount: string) => {
        window.open(`https://visionboutique.tebex.io/package/${amount}`, '_blank');
    }

    return (
        <div className="vcoins-container">
            <div className="vcoins-container__header">
                <div className="right">
                    <h1>CRÉDITS <img src={getCdnUrl('assets/escapemenu', 'vCoins.svg')} draggable={false}/></h1>
                    <h2>CREDITER VOTRE COMPTE EN VCOINS POUR UTILISER LA BOUTIQUE</h2>
                </div>
                <div className="left">
                    <div className="buttonCFX">
                        <div className="vCfx">
                            <h1>ID</h1>
                        </div>
                        <div className="cfx">
                            <h1>
                                {cfx}
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className="vcoins-container__content">
                <div className="vcoins-container__containercolumn">
                    <div className={`vcoins-container__container__Items ${hoveredItem === 1 ? 'active' : ''}`} onMouseEnter={() => { setHoveredItem(1)}}  onClick={() => { setLink('5961280')}}>
                        <h1>1000</h1>
                        {hoveredItem === 1 ? <span style={{
                            position: 'absolute',
                            display: 'flex',
                            color: '#FFFFFF',
                            marginTop: '27%',
                            marginLeft: '31%',
                            fontSize: '1.5vh',
                            fontWeight: '400',
                        }}>
                            <img src={getCdnUrl('assets/escapemenu', 'v.svg')} style={{
                                position: 'absolute', 
                                width: '3vh',
                                height: '3vh',
                                marginRight: '0vh',
                                marginLeft: '-2.5vh',
                                marginTop: '-0.6vh',
                    
                            }}/>
                            COINS
                        </span>: ''}
                        {hoveredItem === 1 ? <span style={{
                            position: 'absolute',
                            display: 'flex',
                            color: '#FFFFFF',
                            marginTop: '60%',
                            fontSize: '3vh',
                            fontWeight: 'bold',
                            background: 'linear-gradient(180deg, #FBE9B7 9.15%, #F4D782 30.52%, #FFCF43 70.68%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}>10€</span> : ''}
                    </div>
                    <div className="vcoins-container__container__Items" onMouseEnter={() => { setHoveredItem(2)}}  onClick={() => { setLink('5961281')}}>
                        <h1>3000</h1>
                        {hoveredItem === 2 ? <span style={{
                            position: 'absolute',
                            display: 'flex',
                            color: '#FFFFFF',
                            marginTop: '27%',
                            marginLeft: '35%',
                            fontSize: '1.5vh',
                            fontWeight: '400',
                        }}>
                            <img src={getCdnUrl('assets/escapemenu', 'v.svg')} style={{
                                position: 'absolute', 
                                width: '3vh',
                                height: '3vh',
                                marginRight: '0vh',
                                marginLeft: '-2.5vh',
                                marginTop: '-0.6vh',
                    
                            }}/>
                            COINS
                        </span>: ''}
                        {hoveredItem === 2 ? <span style={{
                            position: 'absolute',
                            display: 'flex',
                            color: '#FFFFFF',
                            marginTop: '60%',
                            fontSize: '3vh',
                            fontWeight: 'bold',
                            background: 'linear-gradient(180deg, #FBE9B7 9.15%, #F4D782 30.52%, #FFCF43 70.68%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}>25€</span> : ''}
                    </div>
                </div>
                <div className="vcoins-container__containerrow">
                    <div className="vcoins-container__container__Items" onMouseEnter={() => { setHoveredItem(3)}}  onClick={() => { setLink('5961282')}} >
                        {hoveredItem === 3 ? <span style={{
                            position: 'absolute',
                            display: 'flex',
                            color: '#FFFFFF',
                            marginBottom: '125%',
                            fontSize: '2vh',
                            fontWeight: 'bold',
                            background: 'linear-gradient(180deg, #FBE9B7 9.15%, #F4D782 30.52%, #FFCF43 70.68%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}>MEILLEUR VENTE</span> : ''}
                        <h1>5000</h1>
                        {hoveredItem === 3 ? <span style={{
                            position: 'absolute',
                            display: 'flex',
                            color: '#FFFFFF',
                            marginTop: '27%',
                            marginLeft: '35%',
                            fontSize: '1.5vh',
                            fontWeight: '400',
                        }}>
                            <img src={getCdnUrl('assets/escapemenu', 'v.svg')} style={{
                                position: 'absolute', 
                                width: '3vh',
                                height: '3vh',
                                marginRight: '0vh',
                                marginLeft: '-2.5vh',
                                marginTop: '-0.6vh',
                            }}/>
                            COINS
                        </span>: ''}
                        {hoveredItem === 3 ? <span style={{
                            position: 'absolute',
                            display: 'flex',
                            color: '#FFFFFF',
                            marginTop: '150%',
                            fontSize: '3vh',
                            fontWeight: 'bold',
                            background: 'linear-gradient(180deg, #FBE9B7 9.15%, #F4D782 30.52%, #FFCF43 70.68%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}>35€</span> : ''}
                    </div>
                    <div className="vcoins-container__container__Items" onMouseEnter={() => { setHoveredItem(4)}}  onClick={() => { setLink('5961283')}}>
                        {hoveredItem === 4 ? <span style={{
                            position: 'absolute',
                            display: 'flex',
                            color: '#FFFFFF',
                            marginBottom: '125%',
                            fontSize: '2vh',
                            fontWeight: 'bold',
                            background: 'linear-gradient(180deg, #FBE9B7 9.15%, #F4D782 30.52%, #FFCF43 70.68%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}>MEILLEURE RAPPORT</span> : ''}
                        <h1>10000</h1>
                        {hoveredItem === 4 ? <span style={{
                            position: 'absolute',
                            display: 'flex',
                            color: '#FFFFFF',
                            marginTop: '27%',
                            marginLeft: '45%',
                            fontSize: '1.5vh',
                            fontWeight: '400',
                        }}>
                            <img src={getCdnUrl('assets/escapemenu', 'v.svg')} style={{
                                position: 'absolute', 
                                width: '3vh',
                                height: '3vh',
                                marginRight: '0vh',
                                marginLeft: '-2.5vh',
                                marginTop: '-0.6vh',
                    
                            }}/>
                            COINS
                        </span>: ''}
                        {hoveredItem === 4 ? <span style={{
                            position: 'absolute',
                            display: 'flex',
                            color: '#FFFFFF',
                            marginTop: '150%',
                            fontSize: '3vh',
                            fontWeight: 'bold',
                            background: 'linear-gradient(180deg, #FBE9B7 9.15%, #F4D782 30.52%, #FFCF43 70.68%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}>50€</span> : ''}
                    </div>
                </div>
                <div className="vcoins-container__containercolumns">
                    <div className="vcoins-container__container__Items" onMouseEnter={() => { setHoveredItem(5)}}  onClick={() => { setLink('6067238')}}>
                        <h1>25000</h1>
                        {hoveredItem === 5 ? <span style={{
                            position: 'absolute',
                            display: 'flex',
                            color: '#FFFFFF',
                            marginTop: '27%',
                            marginLeft: '58%',
                            fontSize: '1.5vh',
                            fontWeight: '400',
                        }}>
                            <img src={getCdnUrl('assets/escapemenu', 'v.svg')} style={{
                                position: 'absolute', 
                                width: '3vh',
                                height: '3vh',
                                marginRight: '0vh',
                                marginLeft: '-2.5vh',
                                marginTop: '-0.6vh',
                    
                            }}/>
                            COINS
                        </span>: ''}
                        {hoveredItem === 5 ? <span style={{
                            position: 'absolute',
                            display: 'flex',
                            color: '#FFFFFF',
                            marginTop: '60%',
                            fontSize: '3vh',
                            fontWeight: 'bold',
                            background: 'linear-gradient(180deg, #FBE9B7 9.15%, #F4D782 30.52%, #FFCF43 70.68%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}>100€</span> : ''}
                    </div>
                    <div className="vcoins-container__container__Items" onMouseEnter={() => { setHoveredItem(6)}}  onClick={() => { setLink('6226825')}}>
                        {hoveredItem === 6 ? <span style={{ position: 'absolute', display: 'flex', color: '#FFFFFF', marginBottom: '40%', fontSize: '2vh', fontWeight: 'bold'}}>PREMIUM
                            <span style={{ background: 'linear-gradient(180deg, #FBE9B7 9.15%, #F4D782 30.52%, #FFCF43 70.68%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '2vh'}}>+</span>
                            <span style={{fontSize: '2vh',fontWeight: '300',}}> PERMANENT</span>
                        </span> : ''}
                        <h1>100000</h1>
                        {hoveredItem === 6 ? <span style={{
                            position: 'absolute',
                            display: 'flex',
                            color: '#FFFFFF',
                            marginTop: '27%',
                            marginLeft: '58%',
                            fontSize: '1.5vh',
                            fontWeight: '400',
                        }}>
                            <img src={getCdnUrl('assets/escapemenu', 'v.svg')} style={{
                                position: 'absolute', 
                                width: '3vh',
                                height: '3vh',
                                marginRight: '0vh',
                                marginLeft: '-2.5vh',
                                marginTop: '-0.6vh',
                    
                            }}/>
                            COINS
                        </span>: ''}

                        {hoveredItem === 6 ? <span style={{
                            position: 'absolute',
                            display: 'flex',
                            color: '#FFFFFF',
                            marginTop: '60%',
                            fontSize: '3vh',
                            fontWeight: 'bold',
                            background: 'linear-gradient(180deg, #FBE9B7 9.15%, #F4D782 30.52%, #FFCF43 70.68%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}>300€</span> : ''}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VCoins;