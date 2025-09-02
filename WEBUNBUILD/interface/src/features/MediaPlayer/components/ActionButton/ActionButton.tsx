import './index.scss';
import iconePlus from '../../../../assets/MediaPlayer/plus_icone.svg';
import iconePlayPause from '../../../../assets/MediaPlayer/play_pause_icone.svg';
import iconePlay from '../../../../assets/MediaPlayer/play_icone.svg';
import iconeCross from '../../../../assets/MediaPlayer/cross.svg';
import iconeLike from '../../../../assets/MediaPlayer/like.svg';
import React from "react";


interface ActionButtonProps {
    buttonType?: string;
    text: string;
    numerate?: number;
}

const ActionButton: React.FC<ActionButtonProps> = ({ buttonType, text, numerate }) => {

    switch(buttonType) {
        case 'addButton':
            return (
                <button className="queue-btn queue-btn-primary">
                    <img src={iconePlus} className="icon" />
                    <span className="text">{text}</span>
                </button>
            )

        case 'deleteButton':
            return (
                <button className="queue-btn queue-btn-danger btn-footer">
                    <img src={iconePlayPause} className="icon" />
                    <span className="text">{text}</span>
                </button>
            )
        case 'readButton':
            return (
                <button className="queue-btn queue-btn-success btn-footer">
                    <img src={iconePlay} className="icon" />
                    <span className="text">{text}</span>
                </button>
            )
        case 'queueButtonList':
            return (
                <button className="queue-btn-list">
                    <div>
                        <span className="queue-number">{numerate}</span>
                        <span className="text">{text}</span>
                    </div>
                    <img src={iconeCross} />
                </button>
            )
        case 'favoriteButtonList':
        return (
            <button className="queue-btn-list">
                <div>
                <img src={iconeLike} className="favorite-like" />
                    <span className="text">{text}</span>
                </div>
                <img src={iconeCross} />
            </button>
        )
        default:
            return (
                <button className="queue-btn">
                    <img src={iconePlus} className="icon" />
                    <span className="text">{text}</span>
                </button>
            )
    }

}

export default ActionButton;