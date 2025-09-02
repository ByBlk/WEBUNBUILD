import "./style/index.scss";
import type React from "react";
import banner from '../../assets/MediaPlayer/Rectangle 146.png';
import { StreamingView, QueueView, FavoriteView } from "./views";
import { useState } from "react";
import { useNuiEvent } from "@/hook";

const MediaPlayer: React.FC = () => {
    const [viewDisplay, setViewDisplay] = useState<React.ReactNode>(<StreamingView />);
    const [activeTab, setActiveTab] = useState<string>("streaming");
    const [visible, setVisible] = useState(false);

    const changeView = (view: React.ReactNode, tabName: string) => {
        setViewDisplay(view);
        setActiveTab(tabName);
    };

    useNuiEvent('nui:media-player:visible', (status: boolean) => {
        setVisible(status)
    });

    return visible ? (
        <div className="media-container">
            <div className="banner-container">
                <p>Player</p>
                <img src={banner} alt="Media banner" />
            </div>

            <div className="media-tabs">
                <button 
                    className={`media-tab ${activeTab === "streaming" ? "tab-active" : ""}`} 
                    onClick={() => changeView(<StreamingView />, "streaming")}
                >
                    <p>Lecture</p>
                    <span></span>
                </button>

                <button 
                    className={`media-tab ${activeTab === "queue" ? "tab-active" : ""}`} 
                    onClick={() => changeView(<QueueView />, "queue")}
                >
                    <p>File d'attente</p>
                    <span></span>
                </button>

                <button 
                    className={`media-tab ${activeTab === "favorites" ? "tab-active" : ""}`} 
                    onClick={() => changeView(<FavoriteView />, "favorites")}
                >
                    <p>Favoris</p>
                    <span></span>
                </button>
            </div>

            <div className="main-container">
                {viewDisplay}
            </div>
        </div>
    ) : null;
};

export default MediaPlayer;
