import { INotificationPresetProps } from "@/features/Hud/types";
import React from "react";

export const Default: React.FC<INotificationPresetProps> = ({ distance = 0, distancepnj = 0, ...props }) => {
    return   <div
    style={
      { "--color": props.color, padding: "3px" } as React.CSSProperties
    }
    className={`notification ${props?.hasSpecialColor ? "--special-color" : ""
      }`}
    id={props.id as string}
  >
    <div className="left A-BounceIn" style={{ animationDelay: "0.8s" }}>
      <div
        className="icon__wrapper"
        dangerouslySetInnerHTML={{ __html: props.icon ?? '' }}
      ></div>
    </div>

    <div
      className="right A-FadeInLeft"
      dangerouslySetInnerHTML={{ __html: props.parsedContent ?? '' }}
      style={{ fontSize: 12, animationDelay: "1s" }}
    ></div>
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