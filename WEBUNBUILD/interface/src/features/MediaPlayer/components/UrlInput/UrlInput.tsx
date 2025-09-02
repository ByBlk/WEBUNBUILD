import './index.scss';
import {useMediaStore} from "@/features/MediaPlayer/store/store.ts";
import React from "react";

const UrlInput: React.FC = () => {

    const setCurrentId = useMediaStore(state => state.setCurrentId);

    const extractYouTubeVideoId = (url: string) => {
        const match = url.match(/[?&]v=([^&#]+)/) || url.match(/youtu\.be\/(.*)/);
        return match ? match[1] : null;
    };

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const idVideo = extractYouTubeVideoId(e.target.value);
        if (idVideo) {
            setCurrentId(idVideo);
        }
    }

    return (
        <div className="url-container">
            <label htmlFor="url" className="title-section">URL</label>
            <input type="text" name="url" onChange={handleUrlChange} />
        </div>
    )
}

export default UrlInput;