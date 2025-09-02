import React from "react";
import { IWeazelNewsButton, IWeazelNewsBroadcastData } from "../../types";
import MediaCdn from "@/components/mediaCdn/mediaCdn";

const ICONS: Record<string, string> = {
  info: 'info',
  pos: 'pos',
  time: 'time',
  music: 'music',
  price: 'price',
  interact: 'interact',
};

const weazelNewsBroadcast: React.FC<{ announcement: IWeazelNewsBroadcastData }> = ({
  announcement,
}) => {
  return (
    <div className={`WeazelNewsShow ${announcement.preview ? "preview" : ""}`}>
      {announcement.preview && (
        <div className="preview">
          <span>Preview</span>
        </div>
      )}
      <MediaCdn path={"assets/hud/notifications"} name={`${announcement.category}.webp`} />
      <div className="content">
        {announcement.media === "image" ? (
          <img className="mainImg" src={announcement.media_url} />
        ) : (
          <video src={announcement.media_url} autoPlay />
        )}

        <div className="footer">
          {announcement?.buttons.map(
            (button: IWeazelNewsButton, index: number) => (
              <>
                {button.type === "interact" ? (
                  <div className="inter-btn" key={index}>
                    <span className="icon">E</span>
                    <span className="text">{button.text}</span>
                  </div>
                ) : (
                  <div key={index} className="btn">
                    <MediaCdn path={"assets/hud/weazelIcons"} name={ICONS[button.type] + '.svg'} />
                    <span>{button.text}</span>
                  </div>
                )}
              </>
            )
          )}
        </div>

        <div className="countdownbar" />
      </div>
    </div>
  );
};

export default weazelNewsBroadcast;