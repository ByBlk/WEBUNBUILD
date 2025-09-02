import { INotificationPresetProps } from "@/features/Hud/types";
import React from "react";

export const Illegal: React.FC<INotificationPresetProps> = ({ distance = 0, distancepnj = 0, ...props }) => {
    return <div className={"_notification showAnnonce illegal " + props?.mainColor}
    style={{
      '--bgStart': props?.backgroundStart,
      '--bgEnd': props?.backgroundEnd,
      '--tagStart': props?.tagStart,
      '--tagEnd': props?.tagEnd
    } as React.CSSProperties}>
    <div className="img">
      <img src={props.logo} />
    </div>
    <div className="infos">
      <div
        className="name"
      >
        {props.name}
      </div>

      <div
        style={{
          background: `linear-gradient(180deg, ${props.labelColor}95 0%, ${props.labelColor}FF 100%)`,
        }}
        className="notifTag"
      >
        {props.label}
      </div>

      <div
        className="message"
      >
        {props.mainMessage}
      </div>
    </div>
    {/*{props.duration && (*/}
    {/*  <div className="timer A-FadeIn" style={{ animationDelay: "2s" }}>*/}
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