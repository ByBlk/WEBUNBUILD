import MediaCdn from "@/components/mediaCdn/mediaCdn";
import { INotificationPresetProps } from "@/features/Hud/types";
import React from "react";

export const AdminReport: React.FC<INotificationPresetProps> = ({ distance = 0, distancepnj = 0, ...props }) => {
  return <div className="_notification showAnnonce admin_new_report">
    <div className="top">
      <div className="name">
        <MediaCdn path={"assets/hud/notifications"} name={"user_icon.webp"} />
        {props.name}
      </div>
      <div className="id">{props.id}</div>
    </div>
    <div className="main">
      <div className="line">
        {(props.subject ?? '').length > 180 ? (
          <div
            className="value A-FadeInLeft"
            style={{ animationDelay: "1s", fontSize: 12 }}
          >
            {props.subject?.substring(0, 180) + "..."}
          </div>
        ) : (
          <div
            className="value A-FadeInLeft"
            style={{ animationDelay: "1s" }}
          >
            {props.subject}
          </div>
        )}
      </div>
      <div
        className="actions A-FadeInLeft"
        style={{ animationDelay: "1.3s" }}
      >
        <div className="action">
          <MediaCdn path={"assets/hud/notifications"} name={"no_icon.webp"} />
          <p>Masquer</p>
        </div>
        <div className="action">
          <p>Ouvrir</p>
          <MediaCdn path={"assets/hud/notifications"} name={"yes_icon.webp"} />
        </div>
      </div>
    </div>
    {/*{props.duration && (*/}
    {/*  <div className="timer">*/}
    {/*    <div*/}
    {/*      className="track"*/}
    {/*      style={*/}
    {/*        {*/}
    {/*          animationDuration: props.duration + "s",*/}
    {/*        } as React.CSSProperties*/}
    {/*      }*/}
    {/*    ></div>*/}
    {/*  </div>*/}
    {/*)}*/}
  </div>
}