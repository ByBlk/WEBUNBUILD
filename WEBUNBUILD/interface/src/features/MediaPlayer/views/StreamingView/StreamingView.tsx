import './index.scss';
import { RangeSlider, UrlInput } from '../../components';
import {useMediaStore} from "@/features/MediaPlayer/store/store.ts";
import YouTube, { YouTubeProps } from "react-youtube";
import React, {useState} from "react";
import {fetchVideoDetails} from "@/features/MediaPlayer/utils/utils.ts";

const StreamingView: React.FC = () => {

    const currentId = useMediaStore(state => state.currentId);
    const [idVideo, setIdVideo] = useState<string | null>(null);
    const [details, setDetails] = useState<any | null>(null);

    const playVideo = async (id: string) => {
        setIdVideo(currentId);
        setDetails(await fetchVideoDetails(id));

    }

    const onPlayerReady: YouTubeProps['onReady'] = (e) => {
        e.target.setVolume(0);
    }

    return (
        <>
            <UrlInput />
            
            <div className="control-media-container">
                <p className="title-section">Action</p>
                <div className="control-media">
                    <button className="control-media-button" onClick={() => playVideo(currentId)}>
                        <p>Play</p>
                        <span className="play"></span>
                    </button>
                    <button className="control-media-button">
                        <p>Suivant</p>
                        <span className="next"></span>
                    </button>
                    <button className="control-media-button">
                        <p>Stop</p>
                        <span className="stop"></span>
                    </button>
                </div>
            </div>

            <RangeSlider rangeType="volume" />

            <div className="video-display-container">
                <div className="video-info">
                    <p className="video-artiste">{details?.author_name}</p>
                    <p className="video-title">{details?.title}</p>
                    <YouTube
                        videoId={idVideo || ""}
                        onReady={onPlayerReady}
                        opts={{
                            height: "190",
                            width: "337",
                            playerVars: {
                                autoplay: 1,
                                controls: 0,
                                modestbranding: 1,
                                rel: 0,
                            },
                        }}
                    />
                    <RangeSlider rangeType="time" />
                </div>
            </div>
        </>
    )
}

export default StreamingView;